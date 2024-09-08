import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    ColorBackground: string;
    windowSize?: string;
};

export const Container = ({ children, ColorBackground, windowSize }: Props) => {
    return <div className={`flex flex-col items-center mt-5 justify-start ${ColorBackground} ${windowSize}`}>{children}</div>;
};
