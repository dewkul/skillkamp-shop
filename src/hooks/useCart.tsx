import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { CartItem } from "../schema/cart";
import { useProductCtx } from "./useProduct";
import { useLiveQuery } from "./useLiveQuery";
import { IDB } from "../lib/idb";
import { computed } from "@preact/signals";
import { useAuthCtx } from "./useAuth";
import { deleteAuthData, postAuthData, putAuthData } from "./useApi";


function useCart() {
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false)
    const [subtotalInCart, setSubTotalInCart] = useState("")
    const [totalQtyCart, setTotalQtyCart] = useState(0)
    const [isCartPending, setCartPending] = useState(false)

    const { closeProductInfoModal } = useProductCtx()
    const { token } = useAuthCtx()

    const cartFromIdb = useLiveQuery(async () => {
        return await IDB.cart
            .toArray()
    })

    const path = "/v1/api/cart"

    useEffect(() => {
        if (!cartFromIdb)
            return

        const subtotal = cartFromIdb.reduce((accumulator, item) => {
            return accumulator + (item.discountedPrice * item.qty)
        }, 0)
        const qty = cartFromIdb.reduce((accumulator, item) => {
            return accumulator + item.qty
        }, 0)
        setSubTotalInCart(subtotal.toFixed(2))
        setTotalQtyCart(qty)
    }, [cartFromIdb])

    const cartList = computed(() => cartFromIdb)

    const findItem = async (item: CartItem) => {
        const { sku, color, size } = item
        return await IDB.cart.where({
            sku,
            color,
            size,
        }).first()
    }

    const updateItemInCart = async (newItem: CartItem) => {
        const { qty } = newItem
        const item = await findItem(newItem)

        if (item) {
            const err = await putAuthData({
                path,
                body: newItem,
                token: token.value,
            })
            IDB.cart.update(item.id!, { qty, isSync: !err })
        } else {
            const err = await postAuthData({
                path,
                body: { ...newItem },
                token: token.value,
            })
            IDB.cart.add({
                ...newItem,
                isSync: !err,
            })
        }
    }

    const removeItemInCart = async (toBeRemoved: CartItem) => {
        const item = await findItem(toBeRemoved)

        if (item) {
            if (item.isSync) {
                deleteAuthData({
                    path,
                    body: toBeRemoved,
                    token: token.value,
                })
            }
            IDB.cart.delete(item.id!)
        }
    }

    const addItemInCart = async (newItem: CartItem) => {
        const { qty } = newItem
        const item = await findItem(newItem)

        if (item) {
            const updatedItem = {
                ...item,
                qty: item.qty + qty,
            }
            const err = await putAuthData({
                path,
                body: updatedItem,
                token: token.value,
            })
            IDB.cart.update(item.id!, {
                ...updatedItem,
                isSync: !err
            })
        } else {
            const err = await postAuthData({
                path,
                body: { ...newItem },
                token: token.value,
            })
            IDB.cart.add({
                ...newItem,
                isSync: !err,
            })
        }
        closeProductInfoModal()
    }

    const openCartDrawer = () => setCartDrawerOpen(true)
    const closeCartDrawer = () => setCartDrawerOpen(false)

    return {
        isCartDrawerOpen,
        setCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        addItemInCart,
        updateItemInCart,
        removeItemInCart,
        cartList,
        totalQtyCart,
        subtotalInCart,
        isCartPending,
        setCartPending,
    }
}

const CartContext = createContext<ReturnType<typeof useCart> | undefined>(
    undefined
)

export function useCartCtx() {
    return useContext(CartContext)!
}

export function CartProvider({
    children,
}: {
    children: ComponentChildren
}) {
    return (
        <CartContext.Provider value={useCart()}>
            {children}
        </CartContext.Provider>
    )
}

