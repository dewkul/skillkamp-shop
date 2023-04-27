import { Router, Route, route } from "preact-router"
import { useEffect } from "preact/hooks"
import { useGetAllProducts, useGetItemsInCart } from "./hooks/useApi"
import { useAuthCtx } from "./hooks/useAuth"
import { FilterProvider } from "./hooks/useFilter"
import { useProductCtx } from "./hooks/useProduct"
import { IDB } from "./lib/idb"
import { HomePage, ContactPage, CollectionPage, ProductDetailPage, NotFoundError, CheckoutPage, StoryPage } from "./pages"
import PaidModal from "./components/modal/paidModal"
import { useCartCtx } from "./hooks/useCart"

export default function Routes() {
    const { setAuthData } = useAuthCtx()
    const { products } = useGetAllProducts()
    const { setAllProducts } = useProductCtx()
    const { syncItems } = useCartCtx()

    const { itemsInCart } = useGetItemsInCart()

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

    useEffect(() => {
        if (itemsInCart) {
            syncItems(itemsInCart)
        }
    }, [itemsInCart])

    return (<FilterProvider>
        <div class="container mx-auto max-w-7xl">
            <PaidModal />
            <Router>
                <Route path="/" component={HomePage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/shop" component={CollectionPage} />
                <Route path="/product/:urlPath" component={ProductDetailPage} />
                <AuthRoute path="/checkout" component={CheckoutPage} />
                <Route path="/story" component={StoryPage} />
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
