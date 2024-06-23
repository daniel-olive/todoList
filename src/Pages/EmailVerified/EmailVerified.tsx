import { LuListTodo } from "react-icons/lu";
import { Link } from "react-router-dom";

export const EmailVerified = () => {
    return (
        <div className="flex min-h-screen flex-1 flex-col bg-gray-900 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LuListTodo className="bg-white mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Verifique seu e-mail.
                </h2>
                <p className="text-sm text-white text-center mt-9">Um link para verificar seu e-mail foi enviado para o e-mail que você cadastrou.</p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <Link
                            to={"/"}
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm active:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                        >
                            Fazer Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
