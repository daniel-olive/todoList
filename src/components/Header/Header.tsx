import { useEffect } from "react";
import { useAuth } from "../../Contexts/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
};

export const Header = ({ title }: Props) => {
    const { logout, user, signInGoogle } = useAuth();
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
            <div className="flex-1 text-white text-base ml-2">
                {user ? <div>{user.displayName}</div> : ""}
            </div>
            <h1 className="flex flex-1 justify-center text-white font-bold text-2xl ml-2 font-sans">
                {title}
            </h1>
            <div className="flex flex-1 justify-end">
                {user ? (
                    <button
                        className="w-20 bg-white p-1 mr-2 rounded-md text-black text-base"
                        onClick={logoutGoogle}
                    >
                        Sair
                    </button>
                ) : (
                    <button
                        className="w-20 bg-white p-1 mr-2 rounded-md text-black text-base"
                        onClick={signInGoogle}
                    >
                        Entrar
                    </button>
                )}
            </div>
        </div>
    );
};
