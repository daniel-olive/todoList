import { useContext, useEffect, useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { userAuthContext } from "../../Contexts/ContextUsers";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { FcGoogle } from "react-icons/fc";

export const SignIn = () => {
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [msgEmail, setMsgEmail] = useState("");
    const [msgPassword, setMsgPassword] = useState("");
    const [msgemailVerified, setMsgemailVerified] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const { signInGoogle, user, setUser, logout } = useContext(userAuthContext);
    const navigate = useNavigate();

    const LoginGoogle = async () => {
        await signInGoogle();
    };
    const handleLoginEmailAndPassword = async (e: any) => {
        e.preventDefault();
        if (email.trim() === "") {
            setMsgEmail("Prencha o campo email!");
            return false;
        }
        if (password.trim() === "") {
            setMsgPassword("Prencha o campo senha!");
            return false;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const token: any = user.uid;
                setUser(user);
                sessionStorage.setItem("@AuthFirebase:token", token);
                sessionStorage.setItem(
                    "@AuthFirebase:user",
                    JSON.stringify(user)
                );
                if (!user.emailVerified) {
                    logout();
                    setMsgemailVerified(true);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == "auth/invalid-credential") {
                    setPasswordValid(true);
                    return false;
                }
            });
    };

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <div className="flex min-h-full flex-1 flex-col bg-gray-900 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LuListTodo className="bg-white mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Faça login em sua conta
                </h2>
                <div className="flex justify-evenly" onClick={LoginGoogle}>
                    <div className="flex justify-center w-full bg-white mt-10 cursor-pointer hover:opacity-40 rounded-md">
                        <FcGoogle
                            color="black"
                            size={50}
                            className="p-2 rounded-md text-center text-2xl font-bold leading-9 tracking-tight text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {passwordValid && (
                    <span className="flex text-xs text-center mb-4 text-red-500">
                        E-mail ou Senha incorreto. Tente novamente ou clique em
                        'Esqueceu a senha?' para escolher outra.
                    </span>
                )}
                {msgemailVerified && (
                    <span className="flex text-xs text-center mb-4 text-red-500">
                        Por favor, verifique seu email antes de fazer login.
                    </span>
                )}
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Endereço de email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                            {email == "" && (
                                <span className="text-xs text-red-500">
                                    {msgEmail}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Senha
                            </label>
                            <div className="text-sm">
                                <Link
                                    to={"/update_password"}
                                    className="font-semibold text-white hover:text-gray-500"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                            {password == "" && (
                                <span className="text-xs text-red-500">
                                    {msgPassword}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleLoginEmailAndPassword}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                        >
                            Entrar
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-100">
                    Não é um membro?{" "}
                    <Link
                        to={"/signup"}
                        className="font-semibold leading-6 text-white hover:text-gray-500"
                    >
                        Crie uma nova conta
                    </Link>
                </p>
            </div>
        </div>
    );
};
