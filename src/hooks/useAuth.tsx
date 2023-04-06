import { ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";

function useAuth() {
    const [isAuthDrawerOpen, setAuthDrawerOpen] = useState(false)

    return {
        isAuthDrawerOpen,
        setAuthDrawerOpen,
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
