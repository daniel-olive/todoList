import { useState } from "react";
import { Container } from "../Container/Container";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase";

export const FormTags = () => {
    const [nomeTag, setNomeTag] = useState("");
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
            if (nomeTag.trim() !== "") {
                try {
                    await addDoc(collection(db, "tags"), {
                        nome: nomeTag,
                        user_id: uid,
                        createdAt: dataAtual,
                    });
                    // console.log("Documento escrito com ID: ", docRef.id);
                } catch (e) {
                    console.error("Erro adicionando documento: ", e);
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
        setNomeTag("");
    };

    return (
        <>
            <Container ColorBackground="bg-white">
                <div className="flex w-full justify-center">
                    <div className="flex mx-4 w-full lg:w-96 flex-col  items-center">
                        <input
                            className={`w-full mb-2 text-gray-600 focus:outline-none focus:border focus:border-gray-500 font-normal mx-4 max-w-lg h-10 flex items-center pl-2 text-sm border-gray-300 rounded border ${errorInput ? "border-2 border-red-500" : ""}`}
                            type="text"
                            placeholder="Nome da Tag..."
                            required
                            value={nomeTag}
                            onChange={(e) => setNomeTag(e.target.value)}
                        />
                        {errorInput && <p className="mb-1 text-center text-xs text-red-500 rounded-sm">"Campo obrigatório..."</p>}
                    </div>
                </div>
                <div className="flex mt-8 w-full justify-center">
                    <p
                        onClick={handleAdd}
                        className="flex text-xs lg:text-base h-9 justify-center items-center p-2 mx-2 mb-5 bg-black text-white rounded-md hover:opacity-50 cursor-pointer"
                    >
                        Criar Tag
                    </p>
                </div>
            </Container>
        </>
    );
};
