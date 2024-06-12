import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

type Props = {
    logoutGoogle: () => void
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const Dropdaw = ({ logoutGoogle }: Props) => {
    return (
        <Menu as="div" className="relative inline-block text-left border-0">
            <div>
                <MenuButton>
                    <Cog6ToothIcon
                        className="mr-2 h-5 w-5 text-white"
                        aria-hidden="true"
                    />
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
