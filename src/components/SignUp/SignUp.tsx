import { LuListTodo } from "react-icons/lu";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [nome, setNome] = useState<any>("");

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col bg-gray-900 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LuListTodo className="bg-white mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Crie sua conta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                        <label
                            htmlFor="nome"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Seu nome
                        </label>
                        <div className="mt-2">
                            <input
                                id="nome"
                                name="nome"
                                type="nome"
                                autoComplete="text"
                                required
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
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
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-blackshadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
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
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password-confirm"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Confirme Senha
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password-confirm"
                                name="password-confirm"
                                type="password-confirm"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                        >
                            Cadastrar-se
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-100">
                    Já tem uma conta?{" "}
                    <Link
                        to={"/"}
                        className="font-semibold leading-6 text-white hover:text-gray-500"
                    >
                        Faça Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
