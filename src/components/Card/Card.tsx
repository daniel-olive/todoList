import "animate.css";
import { db } from "../../Firebase";
import { query, orderBy, limit } from "firebase/firestore";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Header } from "../Header/Header";
import { Container } from "../Container/Container";
import { Footer } from "../Footer/Footer";
import Confetti from "react-confetti";
import { Modal } from "../Modal/Modal";

type Itens = { id: string; nome: string; descricao: string; checked: boolean };

export const Card = () => {
    const [list, setList] = useState<any>([]);
    const [input, setInput] = useState<any>("");
    const [inputEdit, setInputEdit] = useState<any>("");
    const [inputEditDesc, setInputEditDesc] = useState<any | undefined>("");
    const [errorInput, setErrorInput] = useState(false);
    const [errorInputEdit, setErrorInputEdit] = useState(false);
    const [errorInputEditDesc, setErrorInputEditDesc] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const sessionToken: any = sessionStorage.getItem("@AuthFirebase:token");
    const sessionUser: any = sessionStorage.getItem("@AuthFirebase:user");

    const user = JSON.parse(sessionUser);
    const uid: string = user.uid;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "todolist"), orderBy("nome", "asc"), where("user_id", "==", uid));
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
                    // console.log("Documento escrito com ID: ", docRef.id);
                } catch (e) {
                    console.error("Erro adicionando documento: ", e);
                }
                try {
                    const q = query(collection(db, "todolist"), where("user_id", "==", uid));
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
            setInputEditDesc(item.descricao);
        }
    };

    const handleEditSave = async (id: string) => {
        console.log("Teste 1: " + id);
        if (sessionToken) {
            try {
                if (inputEdit.length >= 1) {
                    const userRef = doc(db, "todolist", id);
                    const updatedData: any = {
                        nome: inputEdit,
                        descricao: inputEditDesc, // Inclui a descrição, mesmo que esteja vazia
                    };

                    await updateDoc(userRef, updatedData);

                    setList(
                        list.map((item: Itens) => {
                            if (item.id === id) {
                                return { ...item, ...updatedData };
                            }
                            return item;
                        })
                    );

                    setEditItemId(null);
                }
            } catch (error) {
                console.log("A requisição falhou, por favor tente novamente mais tarde ou entre em contato com o administrador do Sistema.");
            }
        } else {
            alert("Por favor faça login novamente em sua conta, para editar um item.");
        }
    };

    const handleCancel = () => {
        setEditItemId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEdit(e.target.value);
        setErrorInputEdit(e.target.value.trim() === "");
    };

    const handleInputChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEditDesc(e.target.value);
        setErrorInputEditDesc(e.target.value.trim() === "");
    };

    const handleToggleCompletion = async (id: string) => {
        if (sessionToken) {
            try {
                const userRef = doc(db, "todolist", id);
                const currentItem = list.find((item: Itens) => item.id === id);
                const updatedCompletion = !currentItem?.checked;
                await updateDoc(userRef, { checked: updatedCompletion });

                // Atualizar o estado local para refletir a mudança
                setList(list.map((item: Itens) => (item.id === id ? { ...item, checked: updatedCompletion } : item)));
                if (updatedCompletion) {
                    setShowConfetti(true);
                    setTimeout(() => {
                        setShowConfetti(false);
                    }, 3000);
                }
            } catch (error) {
                console.error("Erro ao atualizar conclusão da tarefa: ", error);
            }
        } else {
            alert("Por favor faça login para marcar a tarefa como concluída.");
        }
    };

    return (
        <>
            {showConfetti ? <Confetti gravity={0.1} /> : ""}
            <Header title="To Do List" />
            <Container>
                <div className="flex text-white flex-col w-11/12 lg:w-6/12 rounded-md justify-center">
                    <div className="flex w-full justify-center">
                        <div className="flex w-full lg:w-96 flex-col ">
                            <input
                                className={`flex h-9 mx-2 px-2 text-black rounded-md text-sm lg:text-base ${errorInput ? "border-2 border-red-500" : ""}`}
                                type="text"
                                placeholder="Exemplo: alimentar os peixes…"
                                required
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            {errorInput ? <p className="m-2 text-center text-xs text-red-500 rounded-sm">"Campo obrigatorio..."</p> : ""}
                        </div>
                        <p
                            onClick={handleAdd}
                            className="flex text-xs lg:text-base h-9 justify-center items-center p-2 mb-5 bg-white text-black rounded-md hover:opacity-50 cursor-pointer"
                        >
                            Adicionar
                        </p>
                    </div>
                    <div>
                        {list.length <= 1 && <p className="text-xs mb-2">{list.length} item na lista.</p>}
                        {list.length > 1 && <p className="text-xs mb-2">{list.length} itens na lista.</p>}
                        {list.map((item: Itens) => (
                            <div key={item.id}>
                                {editItemId !== item.id && (
                                    <div className={`flex h-14 hover:bg-gray-800 justify-between items-center rounded-md mb-2 cursor-pointer animate__animated animate__fadeIn ${item.checked ? "bg-green-300 border-2 border-green-800" : "border border-gray-300"}`}>
                                        <input
                                            id={`task-${item.id}`}
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => handleToggleCompletion(item.id)}
                                            className="ml-2"
                                        />

                                        <div
                                            className="flex w-full items-center ml-2"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <label
                                                htmlFor={`task-${item.id}`}
                                                className={`text-sm md:text-base p-2 ${item.checked ? "line-through text-green-900" : ""}`}
                                            >
                                                {item.nome}
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <FaTrashAlt
                                                size={20}
                                                color={`${item.checked ? "black" : ""}`}
                                                cursor={"pointer"}
                                                onClick={() => handleDelete(item.id)}
                                                className="mx-1 md:mx-2 hover:opacity-50"
                                            />
                                        </div>
                                    </div>
                                )}
                                {editItemId === item.id && (
                                    <>
                                        <Modal
                                            nome={item.nome}
                                            descricao={item.descricao}
                                            handleModalClose={handleCancel}
                                            handleEditSave={() => handleEditSave(item.id)}
                                            handleInputChange={handleInputChange}
                                            handleInputChangeDesc={handleInputChangeDesc}
                                            inputEdit={inputEdit}
                                            inputEditDesc={inputEditDesc}
                                        />
                                        {errorInputEdit && <p className="m-2 text-center text-xs text-red-500 rounded-sm">Campo obrigatório...</p>}
                                        {errorInputEditDesc && <p className="m-2 text-center text-xs text-red-500 rounded-sm">Campo obrigatório...</p>}
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
