import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    ColorBackground: string;
    windowSize?: string;// Aqui defino quando se aplica o min-h-screen, quando list.lenght <=1
};

export const Container = ({ children, ColorBackground, windowSize }: Props) => {
    return <div className={`flex flex-col items-center mt-5 justify-start ${ColorBackground} ${windowSize}`}>{children}</div>;
};
