import { Router, Route, route, RouterOnChangeArgs, RouteProps } from "preact-router"
import { useEffect } from "preact/hooks"
import { useGetAllProducts } from "./hooks/useApi"
import { useAuthCtx } from "./hooks/useAuth"
import { FilterProvider } from "./hooks/useFilter"
import { useProductCtx } from "./hooks/useProduct"
import { IDB } from "./lib/idb"
import { HomePage, ContactPage, CollectionPage, ProductDetailPage, NotFoundError, CheckoutPage } from "./pages"

export default function Routes() {
    const { setAuthData } = useAuthCtx()
    const { products } = useGetAllProducts()
    const { setAllProducts } = useProductCtx()

    useEffect(() => {
        const queryAuth = async () => {
            const auth = await IDB.auth.orderBy('id').first()
            if (auth)
                setAuthData(auth)
        }
        queryAuth()
    }, [])

    useEffect(() => {
        setAllProducts(products)
    }, [products])

    return (<FilterProvider>
        <div class="container mx-auto max-w-7xl">
            <Router>
                <Route path="/" component={HomePage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/shop" component={CollectionPage} />
                <Route path="/product/:urlPath" component={ProductDetailPage} />
                <AuthRoute path="/checkout" component={CheckoutPage} />

                <Route default component={NotFoundError} />
            </Router>
        </div>
    </FilterProvider>
    )
}

function AuthRoute(props: any) {
    const { isLogIn } = useAuthCtx()

    useEffect(() => {
        if (!isLogIn.value)
            route("/", true)
    }, [isLogIn.value])

    if (!isLogIn.value) return null
    return <Route {...props} />
}
