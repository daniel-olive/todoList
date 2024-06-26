import { LuListTodo } from "react-icons/lu";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [msgEmail, setMsgEmail] = useState("");
    const [msgPassword, setMsgPassword] = useState("");
    const [msgPasswordConfirm, SetMsgPasswordConfirm] = useState("");

    const [createUserShow, setCreateUserShow] = useState(false);
    const [errorExist, setErrorExist] = useState("");

    const navigate = useNavigate();

    const [igual, setIgual] = useState("");

    const handleSignUp = async (e: any) => {
        e.preventDefault();

        if (email.trim() === "") {
            setMsgEmail("Prencha o campo email!");
            return false;
        }
        if (password.trim() === "") {
            setMsgPassword("Prencha o campo senha!");
            return false;
        }
        if (msgPasswordConfirm.trim() === "") {
            SetMsgPasswordConfirm("Prencha o campo Confirme Senha.");
        }
        try {
            if (passwordConfirm !== password) {
                setIgual("As senhas não coincidem!");
            } else {
                setIgual("");
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(userCredential.user);
                setCreateUserShow(true);
                setTimeout(() => {
                    navigate("/email_verified");
                }, 3000);
            }
        } catch (error) {
            if (error) {
                setErrorExist("Este email já está em uso. Tente outro.");
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col bg-gray-900 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LuListTodo className="bg-white mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Crie sua conta</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {createUserShow && (
                    <div className="bg-green-300 p-3 rounded-md text-center border-2 border-green-800">
                        <span className="text-green-800">Cadastrado com Sucesso.</span>
                    </div>
                )}
                {errorExist !== "" && <span className="text-xs text-red-500">{errorExist}</span>}
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-white">
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
                        {email == "" && <span className="text-xs text-red-500">{msgEmail}</span>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white">
                                Senha
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                            {password == "" && <span className="text-xs text-red-500">{msgPassword}</span>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password-confirm"
                                className="block text-sm font-medium leading-6 text-white">
                                Confirme Senha
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password-confirm"
                                name="password-confirm"
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {passwordConfirm == "" && <span className="text-xs text-red-500">{msgPasswordConfirm}</span>}
                        {passwordConfirm && <span className="text-xs text-red-500">{igual}</span>}
                    </div>

                    <div>
                        <button
                            onClick={handleSignUp}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">
                            Cadastrar-se
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-100">
                    Já tem uma conta?{" "}
                    <Link
                        to={"/"}
                        className="font-semibold leading-6 text-white hover:text-gray-500">
                        Faça Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
