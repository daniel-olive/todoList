import { ReactNode } from "react";

interface ModalGeralProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const ModalGeral = ({ isOpen, onClose, children }: ModalGeralProps) => {
    return (
        <div
            id="hs-scale-animation-modal"
            className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-95 overflow-y-auto ${isOpen ? "" : "hidden"}`}
            role="dialog"
            tabIndex={-1}
            aria-labelledby="hs-scale-animation-modal-label"
        >
            <div className="flex items-center justify-center">
                <div className={`w-full flex flex-col md:max-w-xl sm:w-full bg-white border shadow-sm rounded-xl transition-opacity duration-200 ease-in-out ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"} m-3 sm:mx-auto`}>
                    <div className="flex justify-between items-center py-3 px-4 border-b">
                        <h3
                            id="hs-scale-animation-modal-label"
                            className="font-bold text-gray-800"
                        >
                            Filtrar por datas
                        </h3>
                        <button
                            type="button"
                            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* Aqui fica vem os components filhos */}
                    <div className="p-4 overflow-y-auto">{children}</div>

                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                        <button
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-black text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-500"
                            onClick={onClose}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
