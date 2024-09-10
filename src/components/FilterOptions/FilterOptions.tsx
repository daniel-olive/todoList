type Props = {
    handleNomeShow: () => void;
    handleDateShow: () => void;
    handleTagShow: () => void;
};

export const FilterOptions = ({ handleNomeShow, handleDateShow, handleTagShow }: Props) => {
    return (
        <div className="flex items-center px-1 my-2 border border-dashed border-gray-500 rounded-md">
            <p className="text-xs px-2 py-0.5 my-1">Ordenar por:</p>

            <button
                className="w-20 bg-white text-black border text-xs font-semibold hover:opacity-70 px-4 py-0.5 ml-1 rounded-sm"
                onClick={handleNomeShow}
            >
                Nome
            </button>

            <button
                className="w-20 bg-white text-black border text-xs font-semibold hover:opacity-70 px-4 py-0.5 ml-1 rounded-sm"
                onClick={handleDateShow}
            >
                Data
            </button>

            <button
                className="w-20 bg-white text-black border text-xs font-semibold hover:opacity-70 px-4 py-0.5 ml-1 rounded-sm"
                onClick={handleTagShow}
            >
                Tag
            </button>
            <button className="w-auto bg-white text-black border text-xs font-semibold hover:opacity-70 px-4 py-0.5 ml-1 rounded-sm">Prioridade</button>
        </div>
    );
};
