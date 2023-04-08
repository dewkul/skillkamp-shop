import { signal, computed } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const authData = signal<AuthData>({})

function useAuth() {
    const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(false)

    const setAuthData = (data: AuthData) => {
        authData.value = data
    }

    const removeAuthData = () => {
        authData.value = {}
    }

    const isLogIn = computed(() => Boolean(authData.value.token))

    return {
        isAuthDrawerOpen,
        setAuthDrawerOpen,
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
}
