import { PlusIcon } from "@heroicons/react/24/outline";
type Props = {
    handleAddTesk: () => void;
    bgColor: string
    textColor: string
};

export const ButtonAddTask = ({ handleAddTesk, bgColor, textColor }: Props) => {
    return (
        <>
            {/* Botão Flutuante de Cadastrar Tarefas */}
            <div className="fixed bottom-6 right-6 z-30">
                <button
                    type="button"
                    className={`flex items-center justify-center w-14 h-14 ${bgColor} ${textColor} rounded-full shadow-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                    onClick={handleAddTesk}
                >
                    <PlusIcon
                        className="w-6 h-6"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </>
    );
};
