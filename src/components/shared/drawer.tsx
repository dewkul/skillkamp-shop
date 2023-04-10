import { ComponentChild, ComponentChildren } from "preact";
import { StateUpdater } from "preact/hooks";

export default function Drawer({ children, header, isOpen, closeDrawer, footer }: Props) {
    return (
        <div
            class={
                "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (isOpen
                    ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                    : " transition-all delay-500 opacity-0 translate-x-full  ")
            }
        >
            <div class={
                " w-screen max-w-md right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                (isOpen ? " translate-x-0 " : " translate-x-full ")
            }>

                <div class="relative w-screen max-w-md flex flex-col space-y-3 overflow-y-scroll h-screen">
                    <div class="flex border-b border-gray-200">
                        <header className="p-4 font-bold text-lg">{header}</header>
                        <button
                            onClick={closeDrawer}
                            data-drawer-hide="drawer"
                            aria-controls="drawer"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-4 right-4 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div class="px-4 flex-grow">
                        {children}
                    </div>
                    {footer}
                </div>
            </div>
            <section
                className=" w-screen h-full cursor-pointer"
                onClick={closeDrawer}
            />
        </div>
    )
}

interface Props {
    children: ComponentChildren
    header: string
    isOpen: boolean
    closeDrawer: () => void
    footer?: ComponentChild
}