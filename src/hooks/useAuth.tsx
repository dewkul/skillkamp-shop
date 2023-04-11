import { signal, computed } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { IDB } from "../lib/idb";

const authData = signal<AuthData>({})

function useAuth() {
    const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(false)

    const setAuthData = (data: AuthData) => {
        authData.value = data
    }

    const removeAuthData = async () => {
        if (authData.value.email) {
            await IDB.auth.where('email').equals(authData.value.email).delete()
            authData.value = {}
        }
    }

    const isLogIn = computed(() => Boolean(authData.value.token))

    const openAuthDrawer = () => setAuthDrawerOpen(true)
    const closeAuthDrawer = () => setAuthDrawerOpen(false)

    return {
        isAuthDrawerOpen,
        openAuthDrawer,
        closeAuthDrawer,
        isLogIn,
        setAuthData,
        removeAuthData,
    }
}

const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(
    undefined
)

export function useAuthCtx() {
    return useContext(AuthContext)!
}

export function AuthProvider({
    children,
}: {
    children: ComponentChildren,
}) {
    return (
        <AuthContext.Provider value={useAuth()}>
            {children}
        </AuthContext.Provider>
    )
}

interface AuthData {
    token?: string
    email?: string
    name?: string
}
