import { useEffect, useState } from "react";

export function useWindowSize() {
    // Estado para armazenar a largura e altura da janela
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // Função que atualiza o estado com o tamanho atual da janela
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Adiciona um "event listener" para redimensionamento
        window.addEventListener("resize", handleResize);

        // Limpa o "event listener" quando o componente é desmontado
        return () => window.removeEventListener("resize", handleResize);
    }, []); // [] significa que o efeito roda uma única vez quando o componente é montado

    return windowSize; // Retorna o tamanho atual da janela
}
