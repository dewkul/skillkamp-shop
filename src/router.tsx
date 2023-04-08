import Router, { Route } from "preact-router"
import { useEffect } from "preact/hooks"
import { useAuthCtx } from "./hooks/useAuth"
import { IDB } from "./lib/idb"
import { HomePage, ContactPage, CollectionPage, ProductDetailPage } from "./pages"

export default function Routes() {
    const { setAuthData } = useAuthCtx()
    useEffect(() => {
        const queryAuth = async () => {
            const auth = await IDB.auth.orderBy('id').first()
            if (auth)
                setAuthData(auth)
        }
        queryAuth()
    }, [])

    return (
        <div class="container mx-auto max-w-7xl">
            <Router>
                <Route path="/" component={HomePage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/shop" component={CollectionPage} />
                <Route path="/product/:name" component={ProductDetailPage} />
            </Router>
        </div>
    )
}
