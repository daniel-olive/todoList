import { useState } from "react";

type Props = {
    handleModalClose?: () => void;
    handleEditSave?: () => void;
    handleInputChange?: any;
    handleInputChangeDesc?: any;
    inputEdit?: string;
    inputEditDesc?: string;
    nome: string;
    descricao: string;
};

export const UpdateModal = ({ nome, descricao, handleModalClose, handleEditSave, handleInputChange, handleInputChangeDesc, inputEdit, inputEditDesc }: Props) => {
    const [editarTask, setEditarTask] = useState(false);

    return (
        <>
            <div
                className="min-h-screen py-12 bg-gray-900 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0"
                id="modal"
            >
                <div
                    role="alert"
                    className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
                >
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div className="w-full flex justify-between mt-4 text-gray-600 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-wallet"
                                width={52}
                                height={52}
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                            </svg>
                            <div className="flex justify-end">
                                <button
                                    className="text-white bg-black p-2 text-sm lg:text-base rounded-md mb-2 w-20 hover:bg-gray-700"
                                    onClick={() => setEditarTask(!editarTask)}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                        {!editarTask ? (
                            <>
                                <div>
                                    <div className="mb-5 mt-2 text-gray-800 text-2xl font-bold leading-tight tracking-normal">{`${nome.charAt(0).toUpperCase()}${nome.slice(1)}`}</div>
                                </div>
                                <label
                                    htmlFor="descricao"
                                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                                >
                                    Descrição
                                </label>
                                <div className="relative mb-5 mt-2">
                                    {}
                                    <p className="w-full rounded-md h-40 border-dotted border-2 border-gray-300 text-gray-500 text-xs p-2">{descricao ? descricao : "Adicione uma descrição clicando em “EDITAR”."}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label
                                        htmlFor="nome"
                                        className="m-0 text-gray-800 text-sm font-bold leading-tight tracking-normal"
                                    >
                                        Nome da tarefa
                                    </label>
                                </div>
                                <input
                                    id="nome"
                                    className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-2 text-sm border-gray-300 rounded border"
                                    value={inputEdit}
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="descricao"
                                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                                >
                                    Descrição
                                </label>
                                <div className="relative mb-5 mt-2">
                                    <textarea
                                        id="descricao"
                                        className="min-h-24 text-gray-600 focus:outline-none focus:border-gray-500 font-normal w-full h-10 flex items-center pl-2 text-sm border-gray-300 rounded border"
                                        placeholder="Digite um descrição"
                                        value={inputEditDesc}
                                        onChange={handleInputChangeDesc}
                                    />
                                </div>
                                <div className="flex items-center justify-start w-full">
                                    <button
                                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:opacity-80 bg-gray-900 rounded text-white px-8 py-2 text-sm"
                                        onClick={handleEditSave}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                        onClick={handleModalClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}

                        <button
                            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                            onClick={handleModalClose}
                            aria-label="close modal"
                            role="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-x"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                />
                                <line
                                    x1={18}
                                    y1={6}
                                    x2={6}
                                    y2={18}
                                />
                                <line
                                    x1={6}
                                    y1={6}
                                    x2={18}
                                    y2={18}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
