import { Link } from "react-router-dom";

export const Notfound = () => {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-roxinho">404</p>
                    <h1 className="mt-4 text-base sm:text-5xl font-bold tracking-tight text-gray-900">
                        Página não encontrada
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Desculpe, não encontramos a página que você está
                        procurando.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to={"/home"}
                            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Ir para página inicial
                        </Link>

                        <Link
                            to={"/suporte-tecnico"}
                            className="text-sm font-semibold text-gray-900"
                        >
                            Entre em contato com o suporte{" "}
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};
