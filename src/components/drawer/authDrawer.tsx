import { useAuthCtx } from "../../hooks/useAuth";
import Drawer from "../shared/drawer";
import { Tab } from "@headlessui/react";
import { Button, Card, Label, TextInput, Checkbox } from "flowbite-react";
import { useState } from "preact/hooks";

export default function AuthDrawer() {
    const { isAuthDrawerOpen, setAuthDrawerOpen } = useAuthCtx()
    const [selectedTab, setSelectedTab] = useState(1)

    const commonClass = 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ' +
        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 '

    return (
        <Drawer header="Greeting!" isOpen={isAuthDrawerOpen} setOpen={setAuthDrawerOpen}>
            <Tab.Group
                defaultIndex={1}
                onChange={(idx) => {
                    setSelectedTab(idx)
                }}
            >
                <Tab.List class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab
                        key="register"
                        class={
                            selectedTab == 0
                                ? commonClass + 'bg-white shadow'
                                : commonClass + 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }
                    >Register</Tab>
                    <Tab
                        key="logIn"
                        class={
                            selectedTab == 1
                                ? commonClass + 'bg-white shadow'
                                : commonClass + 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }
                    >Log in</Tab>
                </Tab.List>
                <Tab.Panels class="mt-3">
                    <Tab.Panel
                        key="reg"
                        class={
                            'rounded-xl bg-white p-3' +
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400'
                        }
                    >
                        <Register />
                    </Tab.Panel>
                    <Tab.Panel
                        key="login"
                        class={
                            'rounded-xl bg-white p-3' +
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400'
                        }
                    >
                        <Login />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Drawer>
    )
}

function Login() {
    return (
        <Card>
            <div className="flex flex-col gap-4">
                <header className="font-bold text-md uppercase">Log in</header>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email1"
                            value="Email"
                        />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder=""
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password1"
                            value="Password"
                        />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        required={true}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">
                        Remember me
                    </Label>
                </div>
                <Button>
                    Submit
                </Button>
            </div>
        </Card>
    )
}

function Register() {
    return (
        <Card>
            <div className="flex flex-col gap-4">
                <header className="font-bold text-md uppercase">Sign Up</header>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="name"
                            value="Username"
                        />
                    </div>
                    <TextInput
                        id="name"
                        type="name"
                        placeholder=""
                        required={true}
                    />
                </div>
                <div></div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email"
                            value="Email"
                        />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder=""
                        required={true}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password"
                            value="Password"
                        />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        required={true}
                    />
                </div>
                <Button>
                    Submit
                </Button>
            </div>
        </Card>
    )
}