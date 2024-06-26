import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { useAuth } from "../../Contexts/useAuth";

type Props = {
    logoutGoogle: () => void;
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const Dropdaw = ({ logoutGoogle }: Props) => {
    const { user } = useAuth();
    const handleMenu = () => {
        return <Dropdaw logoutGoogle={logoutGoogle} />;
    };
    return (
        <Menu as="div" className="relative inline-block text-left border-0">
            <div>
                <MenuButton>
                    <div className="rounded-full border-2 border-white mx-2">
                        {user && (
                            <img
                                src={user.photoURL}
                                className="border-2 border-gray-900 rounded-full h-9 w-9"
                                alt=""
                                onClick={handleMenu}
                            />
                        )}
                    </div>
                </MenuButton>
            </div>

            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <MenuItem>
                            {({ focus }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        focus
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Configurações de Conta
                                </a>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ focus }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        focus
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Faça uma doação
                                </a>
                            )}
                        </MenuItem>

                        <form>
                            <MenuItem>
                                {({ focus }) => (
                                    <button
                                        onClick={logoutGoogle}
                                        type="submit"
                                        className={classNames(
                                            focus
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block w-full px-4 py-2 text-left text-sm"
                                        )}
                                    >
                                        Sair
                                    </button>
                                )}
                            </MenuItem>
                        </form>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
};
