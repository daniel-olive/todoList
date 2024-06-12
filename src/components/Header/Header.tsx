import { useEffect } from "react";
import { useAuth } from "../../Contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { Dropdaw } from "../Dropdaw/Dropdaw";

type Props = {
    title: string;
};

export const Header = ({ title }: Props) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    function logoutGoogle() {
        logout();
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="flex w-full justify-center items-center bg-black h-20">
            <div className="flex flex-1"></div>
            <h1 className="flex flex-1 justify-center text-white font-bold text-2xl ml-2 font-sans">
                {title}
            </h1>
            <div className="flex flex-1 justify-end items-center">
                {user && (
                    <>
                        <div className="text-white text-base ml-2">
                            {user ? (
                                <div className="text-white font-medium">
                                    {user.displayName}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="rounded-full border-2 border-white mx-2">
                            <img
                                className="border-2 border-gray-900 rounded-full h-9"
                                src={user.photoURL}
                                alt=""
                            />
                        </div>
                    </>
                )}
                <div className="mr-2">
                    <Dropdaw logoutGoogle={logoutGoogle} />
                </div>
            </div>
        </div>
    );
};
