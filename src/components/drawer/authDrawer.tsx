import { useAuthCtx } from "../../hooks/useAuth";
import Drawer from "../shared/drawer";
import { Tab } from "@headlessui/react";

export default function AuthDrawer() {
    const { isAuthDrawerOpen, setAuthDrawerOpen } = useAuthCtx()
    return (
        <Drawer header="Greeting!" isOpen={isAuthDrawerOpen} setOpen={setAuthDrawerOpen}>
            <Tab.Group
                defaultIndex={1}
            >
                <Tab.List class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab
                        key="register"
                        class={
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700' +
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2' +
                            //   'bg-white shadow'
                            'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }
                    >Register</Tab>
                    <Tab
                        key="logIn"
                        class={
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700' +
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2' +
                            //   'bg-white shadow'
                            'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }
                    >Log in</Tab>
                </Tab.List>
                <Tab.Panels class="mt-2">
                    <Tab.Panel
                        key="reg"
                        class={
                            'rounded-xl bg-white p-3' +
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                        }
                    >Content 1</Tab.Panel>
                    <Tab.Panel
                        key="login"
                        class={
                            'rounded-xl bg-white p-3' +
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                        }
                    >Content 2</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Drawer>
    )
}