import { db } from "../../Firebase";
import "animate.css";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Header } from "../Header/Header";
import { Container } from "../Container/Container";
import { Footer } from "../Footer/Footer";
import { query } from "firebase/firestore";

type Itens = { id: string; nome: string; checked: boolean };

export const Card = () => {
    const [list, setList] = useState<any>([]);
    const [input, setInput] = useState<any>("");
    const [inputEdit, setInputEdit] = useState<any>("");
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [errorInput, setErrorInput] = useState(false);
    const [errorInputEdit, setErrorInputEdit] = useState(false);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const sessionToken: any = sessionStorage.getItem("@AuthFirebase:token");
    const sessionUser: any = sessionStorage.getItem("@AuthFirebase:user");

    const user = JSON.parse(sessionUser);
    const uid: string = user.uid;

    console.log(uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(
                    collection(db, "todolist"),
                    where("user_id", "==", uid)
                );
                const querySnapshot = await getDocs(q);
                const todoList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setList(todoList);
            } catch (error) {
                console.error("Erro ao buscar documentos: ", error);
            }
        };

        fetchData();
    }, []);

    const handleAdd = async () => {
        if (sessionToken) {
            if (input.trim() !== "") {
                try {
                    const docRef = await addDoc(collection(db, "todolist"), {
                        nome: input,
                        user_id: uid,
                    });
                    console.log("Documento escrito com ID: ", docRef.id);
                } catch (e) {
                    console.error("Erro adicionando documento: ", e);
                }
                try {
                    const q = query(
                        collection(db, "todolist"),
                        where("user_id", "==", uid)
                    );
                    const querySnapshot = await getDocs(q);
                    const todoList = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setList(todoList);
                } catch (error) {
                    console.error("Erro ao buscar documentos: ", error);
                }
            } else {
                setErrorInput(true);
                setTimeout(() => {
                    setErrorInput(false);
                }, 10 * 1000);
            }
        } else {
            alert("Você precisa estar logado para adicionar um novo item.");
        }
        setInput("");
    };

    const handleDelete = async (id: string) => {
        if (sessionToken) {
            const userRef = doc(db, "todolist", id);
            await deleteDoc(userRef);
            setList(list.filter((item: Itens) => item.id !== id));
        }
        if (!sessionToken) {
            alert("Por favor faça login novamente em sua conta.");
        }
    };

    const handleEdit = (item: any) => {
        if (item.id) {
            setEditItemId(item.id);
            setInputEdit(item.nome);
        }
    };

    const handleEditSave = async (id: string) => {
        if (sessionToken) {
            try {
                if (inputEdit.length >= 1) {
                    const userRef = doc(db, "todolist", id);
                    await updateDoc(userRef, {
                        nome: inputEdit,
                    });
                    setList(
                        list.map((item: Itens) => {
                            if (item.id === id) {
                                return { ...item, nome: inputEdit };
                            }
                            return item;
                        })
                    );
                    setEditItemId(null);
                }
            } catch (error) {
                console.log(
                    "A requisição falhou, por favor tente novamente mais tarde ou entre em contado com o administrador do Sistema."
                );
            }
        } else {
            alert(
                "Por favor faça login novamente em sua conta, para editar um item."
            );
        }
    };

    const handleCancel = () => {
        setEditItemId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEdit(e.target.value);
        setErrorInputEdit(e.target.value.trim() === "");
    };

    const handleCheckboxChange = async (id: string) => {
        if (completedTasks.includes(id)) {
            const userRef = doc(db, "todolist", id);
            await updateDoc(userRef, {
                checked: "",
            });
            setCompletedTasks(completedTasks.filter((taskId) => taskId !== id));
        } else {
            setCompletedTasks([...completedTasks, id]);
        }
    };
    return (
        <>
            <Header title="To Do List" />
            <Container>
                <div className="flex text-white flex-col w-11/12 lg:w-6/12 rounded-md justify-center">
                    <div className="flex w-full justify-center">
                        <div className="flex w-full lg:w-96 flex-col ">
                            <input
                                className={`flex h-9 mx-2 px-2 text-black rounded-md text-sm lg:text-base ${
                                    errorInput ? "border-2 border-red-500" : ""
                                }`}
                                type="text"
                                placeholder="Exemplo: alimentar os peixes…"
                                required
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            {errorInput ? (
                                <p className="m-2 text-center text-xs text-red-500 rounded-sm">
                                    "Campo obrigatorio..."
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <p
                            onClick={handleAdd}
                            className="flex text-xs lg:text-base h-9 justify-center items-center p-2 mb-5 bg-white text-black rounded-md hover:opacity-50 cursor-pointer"
                        >
                            Adicionar
                        </p>
                    </div>
                    <div>
                        {list.length <= 1 && (
                            <p className="text-xs mb-2">
                                {list.length} item na lista.
                            </p>
                        )}
                        {list.length > 1 && (
                            <p className="text-xs mb-2">
                                {list.length} itens na lista.
                            </p>
                        )}
                        {list.map((item: Itens) => (
                            <div key={item.id}>
                                {editItemId !== item.id && (
                                    <div className="flex h-14 justify-between items-center border border-gray-300 rounded-md mb-2 animate__animated animate__fadeIn">
                                        <div className="flex items-center ml-2">
                                            <input
                                                id={`task-${item.id}`}
                                                type="checkbox"
                                                checked={completedTasks.includes(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        item.id
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`task-${item.id}`}
                                                className={`text-sm md:text-base p-2 ${
                                                    completedTasks.includes(
                                                        item.id
                                                    )
                                                        ? "line-through"
                                                        : ""
                                                }`}
                                            >
                                                {item.nome}
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <FaEdit
                                                size={20}
                                                cursor={"pointer"}
                                                onClick={() => handleEdit(item)}
                                                className="mx-1 md:mx-2 hover:opacity-50"
                                            />
                                            <FaTrashAlt
                                                size={20}
                                                cursor={"pointer"}
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="mx-1 md:mx-2 hover:opacity-50"
                                            />
                                        </div>
                                    </div>
                                )}
                                {editItemId === item.id && (
                                    <>
                                        <div className="flex h-14 justify-between items-center border border-gray-300 rounded-md mb-2">
                                            <div
                                                className={`flex w-full h-full items-center bg-white p-0 rounded-md rounded-r-none ${
                                                    errorInputEdit
                                                        ? "border-2 border-red-500"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="text"
                                                    className={`w-full text-black p-2 outline-none rounded-md`}
                                                    placeholder="Digite aqui para editar a tarefa…"
                                                    value={inputEdit}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleEditSave(item.id)
                                                }
                                                className="text-white font-bold p-2 bg-sky-500 rounded-md h-9 mx-2"
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="text-white font-bold p-2 bg-red-500 rounded-md h-9 mr-2"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                        {errorInputEdit && (
                                            <p className="m-2 text-center text-xs text-red-500 rounded-sm">
                                                Campo obrigatório...
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
};
