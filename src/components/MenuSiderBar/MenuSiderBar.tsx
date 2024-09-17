import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../Contexts/useAuth";
import { ButtonAddTask } from "../ButtonAddTask/ButtonAddTask";
import { ModalGeral } from "../ModalGeral/ModalGeral";
import { FormTags } from "../FormTags/FormTags";
import avatar from '../../assets/avatar-padrao.png'

export function MenuSiderBar() {
    const [open, setOpen] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const { user } = useAuth();
    const menu = [{ nome: "Hoje" }, { nome: "Trabalho" }, { nome: "Pessoal" }, { nome: "Compras" }, { nome: "Estudos" }];

    const closeModal = () => {
        setShowModalAdd(false);
    };

    const closeSideBar = () => {
        setOpen(false);
        setShowModalAdd(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={closeSideBar}
                className="relative z-50"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/95 transition-opacity duration-500 ease-in-out"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-[70%]">
                            <DialogPanel
                                transition
                                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
                            >
                                <TransitionChild
                                    enter="transform transition duration-500 ease-in-out"
                                    enterFrom="-translate-x-full opacity-0"
                                    enterTo="translate-x-0 opacity-100"
                                    leave="transform transition duration-500 ease-in-out"
                                    leaveFrom="translate-x-0 opacity-100"
                                    leaveTo="-translate-x-full opacity-0"
                                >
                                    {/* Botão de Fechar SiderBar */}
                                    <div className="absolute right-0 top-0 flex items-center m-2 sm:mr-6">
                                        <button
                                            type="button"
                                            onClick={closeSideBar}
                                            className="relative rounded-md text-white hover:bg-gray-500"
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon
                                                aria-hidden="true"
                                                className="h-6 w-6"
                                            />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="px-4 sm:px-6 bg-gray-700 py-6">
                                        <DialogTitle className="text-base font-semibold leading-6 text-white">Panel title</DialogTitle>
                                        <div className="flex items-center rounded-md p-1 mt-2">
                                            {user && (
                                                <div className="flex rounded-[100%] w-[50px]">
                                                    <img
                                                        src={user.photoURL ? user?.photoURL : avatar}
                                                        className="flex rounded-full"
                                                        alt="avatar"
                                                    />
                                                </div>
                                            )}
                                            {user && <span className="flex w-full p-2 text-sm text-white">{user.displayName && "Olá, " + user.displayName }</span>}
                                        </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        {menu.map((item: any) => (
                                            <ul
                                                key={item.nome}
                                                className="flex flex-col"
                                            >
                                                <li className="p-2 cursor-pointer hover:bg-gray-200 rounded-md">{item.nome}</li>
                                            </ul>
                                        ))}
                                    </div>
                                    {/* Botão Flutuante de Cadastrar Tarefas */}
                                    <ButtonAddTask
                                        bgColor="bg-black"
                                        textColor="text-white"
                                        handleAddTesk={() => setShowModalAdd(true)}
                                    />
                                    {showModalAdd && (
                                        <ModalGeral
                                            title="Crie uma nova Tag"
                                            textButton="Fechar"
                                            onClose={closeModal}
                                            isOpen
                                        >
                                            <FormTags />
                                        </ModalGeral>
                                    )}
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>

            {/* Menu SiberBar */}
            <div className="fixed left-0 top-0 m-4 hover:bg-neutral-900">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="relative z-20 text-black p-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        width="25"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="#ffffff"
                            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
}
