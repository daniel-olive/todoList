import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../Contexts/useAuth";

export function MenuSiderBar() {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const menu = [{ nome: "Hoje" }, { nome: "Trabalho" }, { nome: "Pessoal" }, { nome: "Compras" }, { nome: "Estudos" }];

    return (
        <>
            <Dialog
                open={open}
                onClose={setOpen}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity duration-500 ease-in-out"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
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
                                    <div className="absolute right-0 top-0 flex items-center -mr-12 pr-2 pt-4 sm:-mr-10 sm:pr-4">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                        >
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon
                                                aria-hidden="true"
                                                className="h-6 w-6"
                                            />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Panel title</DialogTitle>
                                        <div className="flex items-center rounded-md p-1 mt-2 border border-gray-400">
                                            {user && (
                                                <div className="flex rounded-full w-9 h-9 border border-gray-400 bg-gray-200">
                                                    <img
                                                        src={user.photoURL}
                                                        className="flex rounded-full bg-blue-200"
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                            {user && <span className="flex w-full p-2">{user.displayName}</span>}
                                        </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        {menu.map((item: any) => (
                                            <ul
                                                key={item}
                                                className="flex flex-col"
                                            >
                                                <li className="p-2 cursor-pointer hover:bg-gray-200 rounded-md">{item.nome}</li>
                                            </ul>
                                        ))}
                                    </div>
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
