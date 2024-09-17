import React, { useState } from "react";
import { Container } from "../Container/Container";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from "../../Firebase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TaskInputProps {
    onAddTask: (input: string) => void;
}

export const FormTask: React.FC<TaskInputProps> = () => {
    const [nome, setNome] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [errorInput, setErrorInput] = useState(false);
    const sessionToken: any = sessionStorage.getItem("@AuthFirebase:token");
    const sessionUser: any = sessionStorage.getItem("@AuthFirebase:user");
    const user = JSON.parse(sessionUser);
    const uid: string = user.uid;

    const data: Date = new Date(); //Aqui pego a data sem formatar.
    const formatadaDataAtual = format(data, "yyyy-MM-dd", { locale: ptBR }); //Agora formato a data com o metodo format dp data-fns
    const dataAtual = new Date(formatadaDataAtual);

    const handleAdd = async () => {
        if (sessionToken) {
            if (nome.trim() !== "") {
                try {
                    await addDoc(collection(db, 'todolist'), {
                        nome: nome,
                        tag: tag,
                        descricao: descricao,
                        user_id: uid,
                        createdAt: dataAtual,
                    });
                    // console.log("Documento escrito com ID: ", docRef.id);
                } catch (e) {
                    console.error("Erro adicionando documento: ", e);
                }
                try {
                    const q = query(collection(db, "tags"), where("user_id", "==", uid));
                    const querySnapshot = await getDocs(q);
                    const todoList = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    // setList(todoList);
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
        setNome("");
        setDescricao("");
        setTag("");

    };

    return (
        <>
            <Container ColorBackground="bg-white">
                <div className="flex w-full justify-center">
                    <div className="flex mx-4 w-full lg:w-96 flex-col  items-center">
                        <input
                            className={`w-full mb-2 text-gray-600 focus:outline-none focus:border focus:border-gray-500 font-normal mx-4 max-w-lg h-10 flex items-center pl-2 text-sm border-gray-300 rounded border ${errorInput ? "border-2 border-red-500" : ""}`}
                            type="text"
                            placeholder="Nome da tarefa"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        {errorInput && <p className="mb-1 text-center text-xs text-red-500 rounded-sm">"Campo obrigatório..."</p>}

                        <input
                            className="w-full mb-2 text-gray-600 focus:outline-none focus:border focus:border-gray-500 font-normal mx-4 max-w-lg h-10 flex items-center pl-2 text-sm border-gray-300 rounded border"
                            type="text"
                            placeholder="Tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        {errorInput && <p className="mb-1 text-center text-xs text-red-500 rounded-sm">"Campo obrigatório..."</p>}

                        <textarea
                            id="descricao"
                            className="flex w-full  mx-4 max-w-lg min-h-24 h-10 mb-2 items-center text-gray-600 focus:outline-none focus:border-gray-500 font-normal pl-2 text-sm border-gray-300 rounded border"
                            placeholder="Digite um descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        {errorInput && <p className="mb-1 text-center text-xs text-red-500 rounded-sm">"Campo obrigatório..."</p>}

                        <select className="w-full mb-2 text-gray-600 focus:outline-none focus:border focus:border-gray-500 font-normal mx-4 max-w-lg h-10 flex items-center pl-2 text-sm border-gray-300 rounded border">
                            <option value="Baixa">Nenhuma</option>
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                </div>
                <div className="flex mt-8 w-full justify-center">
                    <p
                        onClick={handleAdd}
                        className="flex text-xs lg:text-base h-9 justify-center items-center p-2 mx-2 mb-5 bg-black text-white rounded-md hover:opacity-50 cursor-pointer"
                    >
                        Criar tarefa
                    </p>
                </div>
            </Container>
        </>
    );
};
