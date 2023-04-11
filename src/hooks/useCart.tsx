import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { CartItem } from "../schema/cart";
import { useProductCtx } from "./useProduct";
import { useLiveQuery } from "./useLiveQuery";
import { IDB } from "../lib/idb";
import { computed, signal } from "@preact/signals";


function useCart() {
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false)
    const [subtotalInCart, setSubTotalInCart] = useState("")
    const [totalQtyCart, setTotalQtyCart] = useState(0)
    const { closeProductInfoModal } = useProductCtx()

    const cartFromIdb = useLiveQuery(async () => {
        return await IDB.cart
            .toArray()
    })

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
            IDB.cart.update(item.id!, { qty })
        } else {
            IDB.cart.add({
                ...newItem,
                isSync: false,
            })
        }
    }

    const removeItemInCart = async (toBeRemoved: CartItem) => {

        const item = await findItem(toBeRemoved)

        if (item) {
            IDB.cart.delete(item.id!)
        }
    }

    const addItemInCart = async (newItem: CartItem) => {
        const { qty } = newItem
        const item = await findItem(newItem)

        if (item) {
            IDB.cart.update(item.id!, {
                ...item,
                qty: item.qty + qty,
                isSync: false
            })
        } else {
            IDB.cart.add({
                ...newItem,
                isSync: false,
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

