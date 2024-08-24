import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArchiveBoxXMarkIcon, PencilIcon, Square2StackIcon, TrashIcon } from "@heroicons/react/16/solid";

type Props = {
    logoutGoogle: () => void;
};


export const MenuDropDown = ({ logoutGoogle }: Props) => {
    return (
        <Menu>
            <MenuButton>
                <div className="flex items-center justify-center text-white w-10 h-10 m-2 hover:bg-neutral-900 rounded-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                        width={25}
                        height={25}
                        className=""
                    >
                        <path
                            fill="#ffffff"
                            d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
                        />
                    </svg>
                </div>
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom start"
                className="ml-2 -mt-12 w-36 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <MenuItem>
                    <button className="group text-black flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500/10">
                        <PencilIcon className="size-4 fill-black" />
                        Editar
                        <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">⌘E</kbd>
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group text-black flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500/10">
                        <Square2StackIcon className="size-4 fill-black" />
                        Duplicar
                        <kbd className="ml-auto text-black hidden font-sans text-xs group-data-[focus]:inline">⌘D</kbd>
                    </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                    <button className="group text-black flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500/10">
                        <ArchiveBoxXMarkIcon className="size-4 fill-black" />
                        Arquivar
                        <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">⌘A</kbd>
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group text-black flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500/10">
                        <ArchiveBoxXMarkIcon className="size-4 fill-black" />
                        Deletar
                        <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">⌘D</kbd>
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        className="group text-black flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500/10"
                        onClick={logoutGoogle}
                        type="submit"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="size-3.5 fill-black"
                        >
                            <path
                                fill="#000"
                                d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                            />
                        </svg>
                        Sair
                        <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">⌘S</kbd>
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};
