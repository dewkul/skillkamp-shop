import { useAuthCtx } from "../../hooks/useAuth";
import Drawer from "../shared/drawer";
import { Tab } from "@headlessui/react";
import { Button, Card, Label, TextInput, Checkbox } from "flowbite-react";
import { StateUpdater, useState } from "preact/hooks";
import API from "../../lib/api"
import { IDB } from "../../lib/idb";

export default function AuthDrawer() {
    const { isAuthDrawerOpen, closeAuthDrawer } = useAuthCtx()
    const [selectedTab, setSelectedTab] = useState(1)

    const commonClass = 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ' +
        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 '

    return (
        <Drawer header="Greeting!" isOpen={isAuthDrawerOpen} closeDrawer={closeAuthDrawer}>
            <Tab.Group
                selectedIndex={selectedTab}
                onChange={(idx) => {
                    setSelectedTab(idx)
                }}
            >
                <Tab.List class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab
                        key="register"
                        className={
                            selectedTab == 0
                                ? commonClass + 'bg-white shadow'
                                : commonClass + 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }
                    >Register</Tab>
                    <Tab
                        key="logIn"
                        className={
                            selectedTab == 1
                                ? commonClass + 'bg-white shadow'
                                : commonClass + 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                        }
                    >Log in</Tab>
                </Tab.List>
                <Tab.Panels class="mt-3">
                    <Tab.Panel
                        key="reg"
                        className={
                            'rounded-xl bg-white p-3' +
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400'
                        }
                    >
                        <Register setSelectedTab={setSelectedTab} />
                    </Tab.Panel>
                    <Tab.Panel
                        key="login"
                        className={
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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRemember, setRemember] = useState(true)

    const { closeAuthDrawer, setAuthData } = useAuthCtx()

    const onEmailInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            setEmail(e.target.value)
        }
    }

    const onPasswordInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            setPassword(e.target.value)
        }
    }

    const login = async () => {
        try {
            const { data, status } = await API.post("/v1/api/auth/login", {
                email,
                password,
            })

            if (status != 200)
                throw new Error("Got status" + status)
            const token = data.detail.Token

            setAuthData({
                token,
                email,
            })

            if (isRemember)
                await IDB.auth.add({
                    email,
                    token,
                });
            closeAuthDrawer()
        } catch (err) {
            console.error("Login: ", err)
        }

    }

    return (
        <Card>
            <form className="flex flex-col gap-4">
                <header className="font-bold text-md capitalize">Log in</header>
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
                        onChange={onEmailInput}
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
                        onChange={onPasswordInput}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remember"
                        checked={isRemember}
                        onChange={() => setRemember(!isRemember)}
                    />
                    <Label htmlFor="remember">
                        Remember me
                    </Label>
                </div>
                <Button onClick={login}>
                    Log in
                </Button>
            </form>
        </Card>
    )
}

function Register({ setSelectedTab }: RegisterProps) {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorStr, setErrorStr] = useState("")

    const onFullName = (e: Event) => {
        if (e.target instanceof HTMLInputElement)
            setFullName(e.target.value)
    }

    const onEmail = (e: Event) => {
        if (e.target instanceof HTMLInputElement)
            setEmail(e.target.value)
    }

    const onPassword = (e: Event) => {
        if (e.target instanceof HTMLInputElement)
            setPassword(e.target.value)
    }

    const signUp = async () => {
        try {
            const { data, status } = await API.post("/v1/api/auth/signup", {
                fullname: fullName,
                email,
                password,
            })

            if (status == 201) {
                setSelectedTab(1)
                setFullName("")
                setEmail("")
                setPassword("")
                return
            }

            console.error(`Status: ${status} - ${data.detail}`)
            setErrorStr(data.detail)
        } catch (err) {
            if (err instanceof Error)
                setErrorStr(err.message)
            return
        }

    }

    return (
        <Card>
            <form className="flex flex-col gap-4">
                <header className="font-bold text-md">Create a new account</header>
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
                        onChange={onFullName}
                    />
                </div>
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
                        onChange={onEmail}
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
                        onChange={onPassword}
                    />
                </div>
                <Button onClick={signUp}>
                    Sign Up
                </Button>
            </form>
        </Card>
    )
}

interface RegisterProps {
    setSelectedTab: StateUpdater<number>
}