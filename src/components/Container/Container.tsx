import { ReactNode } from "react";

export const Container = ({children}: {children: ReactNode}) => {
    return (
        <div className="flex flex-col items-center mt-5 justify-start bg-gray-900">
            {children}
        </div>
    );
};
