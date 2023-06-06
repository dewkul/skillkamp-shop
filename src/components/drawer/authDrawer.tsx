import { useAuthCtx } from "../../hooks/useAuth";
import Drawer from "../shared/drawer";
import { Tab } from "@headlessui/react";
import { Button, Card, Label, TextInput, Checkbox } from "flowbite-react";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { IDB } from "../../lib/idb";
import { postData } from "../../lib/api";
import { useCartCtx } from "../../hooks/useCart";
import { toast } from "react-hot-toast";

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
                        <Register />
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
    const [error, setError] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [isBlockLogin, setBlockLogin] = useState(false)

    const { closeAuthDrawer, setAuthData } = useAuthCtx()
    const { openCartDrawer, isCartPending, setCartPending } = useCartCtx()



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

    const afterLogin = (data: LogInResponse) => {
        const { token, name } = data

        setAuthData({
            token,
            email,
            name
        })

        if (isRemember)
            IDB.auth.add({
                email,
                token,
                name,
            });

        toast.success("Welcome back" + (name ? `, ${name}!` : "!"))
        setEmail("")
        setPassword("")
        closeAuthDrawer()
        if (isCartPending) {
            setCartPending(false)
            openCartDrawer()
        }
    }

    const login = async (e: Event) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await postData<LogInResponse>({
                path: "/v2/auth/login",
                body: {
                    email,
                    password,
                },
            })

            if (!data) {
                console.warn('Log in: No response data')
                return
            }
            afterLogin(data)

        } catch (err) {
            toast.error((err as Error).message)
            setError("Check your password and try agiain")
            console.error("Login: ", err)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        setBlockLogin(email.length < 3 || password.length < 1)
    }, [email, password])

    return (
        <div>
            <Card>
                <form className="flex flex-col gap-4" onSubmit={e => login(e)}>
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
                            required
                            value={email}
                            onInput={onEmailInput}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="current-password"
                                value="Password"
                            />
                        </div>
                        <TextInput
                            id="current-password"
                            type="password"
                            required
                            value={password}
                            onInput={onPasswordInput}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={isRemember}
                            onInput={() => setRemember(!isRemember)}
                        />
                        <Label htmlFor="remember">
                            Remember me
                        </Label>
                    </div>
                    <Button type="submit" disabled={isLoading || isBlockLogin}>
                        Log in
                    </Button>
                </form>
            </Card>
            {
                error
                && <ErrorToast title={error} />
            }
        </div>
    )
}

function Register() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [isBlockRegister, setBlockRegister] = useState(false)

    const { closeAuthDrawer, setAuthData } = useAuthCtx()
    const { openCartDrawer, isCartPending, setCartPending } = useCartCtx()

    useEffect(() => {
        setBlockRegister(password.length < 8 || email.length < 5)
    }, [password, email])

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

    const afterSignUp = (data: LogInResponse) => {
        const { token, name } = data

        setAuthData({
            token,
            email,
            name
        })

        IDB.auth.add({
            email,
            token,
            name,
        });
        toast.success("Hello there" + (name ? `, ${name}!` : "!"))
        setFullName("")
        setEmail("")
        setPassword("")
        closeAuthDrawer()
        if (isCartPending) {
            setCartPending(false)
            openCartDrawer()
        }
    }

    const signUp = async (e: Event) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await postData<LogInResponse>({
                path: "/v2/auth/signup",
                body: {
                    email,
                    password,
                },
                expectedStatus: 201,
            })

            afterSignUp(data)
        } catch (err) {
            toast.error((err as Error).message)
            setError("Unable to create an account.")
            console.error("Register: ", err)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div>
            <Card>
                <form className="flex flex-col gap-4" onSubmit={e => signUp(e)}>
                    <header className="font-bold text-md">Create a New Account</header>
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
                            required
                            value={fullName}
                            onInput={onFullName}
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
                            required
                            value={email}
                            onInput={onEmail}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="current-password"
                                value="Password"
                            />
                        </div>
                        <TextInput
                            id="current-password"
                            type="password"
                            required
                            value={password}
                            onInput={onPassword}
                            helperText={<>Required 8 or more characters.</>}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading || isBlockRegister}>
                        Sign Up
                    </Button>
                </form>
            </Card>
            {
                error
                && <ErrorToast title="Failed to register a new account" />
            }
        </div>
    )
}

function ErrorToast({ title }: ToastProps) {
    return (
        <div class="flex items-center w-full p-4 mt-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Error icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">{title}</div>
            {/* <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button> */}
        </div>

    )
}

interface RegisterProps {
    setSelectedTab: StateUpdater<number>
}

interface ToastProps {
    title: string
}

interface LogInResponse {
    token: string
    ref: string
    name: string
}
