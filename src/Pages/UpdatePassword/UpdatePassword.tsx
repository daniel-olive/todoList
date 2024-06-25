import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { MsgConfirm } from "../../components/MsgConfirm/MsgConfirm";

export const UpdatePassword = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const auth = getAuth();

    const handleUpdatePassword = (e: any) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                if (auth) {
                    setMsg(
                        "Um link para redifinição de senha foi enviado para seu email..."
                    );
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                if (errorCode == "auth/too-many-requests") {
                    setMsg("Muitas tentativas de redefinir a senha");
                }
            });
    };
    return (
        <div className="flex min-h-screen flex-1 flex-col bg-gray-900 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {msg && (
                    <MsgConfirm
                        title={msg}
                        danger="text-xs mb-9 bg-green-300 border-green-800 text-green-800"
                    />
                )}
                <LuListTodo className="bg-white mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Redefinir senha
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="exemplo@gmail.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-blackshadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleUpdatePassword}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                        >
                            Redefinir senha
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
