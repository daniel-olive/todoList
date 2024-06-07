import { useContext, useEffect, useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { userAuthContext } from "../../Contexts/ContextUsers";

export const SignIn = () => {
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const { signInGoogle, user } = useContext(userAuthContext);
    const navigate = useNavigate();

    const LoginGoogle = async () => {
        await signInGoogle();
    };

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);
    console.log("Build v05.06.24");

    return (
        <div className="flex min-h-full flex-1 flex-col bg-gray-900 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LuListTodo className="bg-white mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Faça login em sua conta
                </h2>
                <div className="flex justify-evenly">
                    <FaGoogle
                        onClick={LoginGoogle}
                        color="black"
                        size={50}
                        className="border p-2 rounded-md bg-white hover:opacity-40 cursor-pointer mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
                    />
                    <FaApple
                        onClick={() => {}}
                        color="black"
                        size={50}
                        className="border p-2 rounded-md bg-white hover:opacity-40 cursor-pointer mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
                    />
                    <FaFacebook
                        onClick={() => {}}
                        color="black"
                        size={50}
                        className="border p-2 rounded-md bg-white hover:opacity-40 cursor-pointer mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
                    />
                </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                                <a
                                    href="#"
                                    className="font-semibold text-white hover:text-gray-500"
                                >
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
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
