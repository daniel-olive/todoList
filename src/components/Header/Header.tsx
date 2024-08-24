import { useEffect } from "react";
import { useAuth } from "../../Contexts/useAuth";
import { useNavigate } from "react-router-dom";

import { MenuSiderBar } from "../MenuSiderBar/MenuSiderBar";
import { MenuDropDown } from "../MenuDroDown/MenuDropDown";
type Props = {
    title: string;
};

export const Header = ({ title }: Props) => {
    const { logout, user } = useAuth();
    // const mobile = window.screen.width < 400;
    const navigate = useNavigate();

    function logoutGoogle() {
        return logout();
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);
    return (
        <div className="flex w-full justify-center items-center bg-black h-20">
            <div className="flex flex-1">
                <div className="text-left">
                    <MenuDropDown logoutGoogle={logoutGoogle} />
                </div>
            </div>
            <h1 className="flex flex-1 justify-center text-white text-sm font-bold lg:text-2xl ml-2 font-sans">{title}</h1>
            <div className="flex flex-1 justify-end items-center">
                <div className="mr-2">
                    <MenuSiderBar />
                </div>
            </div>
        </div>
    );
};
