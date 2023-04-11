import { computed, signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { CartItem } from "../schema/cart";

const cartList = signal<CartItem[]>([])

function useCart() {
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false)
    const [subtotalInCart, setSubTotalInCart] = useState("")
    const [totalQtyCart, setTotalQtyCart] = useState(0)

    useEffect(() => {
        const subtotal = cartList.value.reduce((accumulator, item) => {
            return accumulator + (item.discountedPrice * item.qty)
        }, 0)
        const qty = cartList.value.reduce((accumulator, item) => {
            return accumulator + item.qty
        }, 0)
        setSubTotalInCart(subtotal.toFixed(2))
        setTotalQtyCart(qty)
    }, [cartList.value])

    const updateItemInCart = (item: CartItem) => {
        const idx = cartList.value.findIndex(c => c.sku === item.sku)
        // if item existed in cart
        if (idx > -1) {
            // update item
            const updatedList = cartList.value.map((c, i) => i == idx ? item : c)
            cartList.value = updatedList
        } else {
            // add item
            cartList.value = [...cartList.value, item]
        }
    }

    const removeItemInCart = (sku: string) => {
        const idx = cartList.value.findIndex((c) => c.sku === sku)
        if (idx > -1) {
            let updatedList = cartList.value
            if (cartList.value[idx].qty == 1) {
                // Remove item from cart
                const temp = cartList.value[idx]
                updatedList[idx] = updatedList[-1]
                updatedList[-1] = temp
                updatedList.pop()
            } else {
                // Reduct qty by 1
                updatedList.map((c, i) => i == idx ? c.qty -= 1 : c)
            }
            cartList.value = updatedList
        }
    }

    const addItemInCart = (item: CartItem) => {
        const idx = cartList.value.findIndex(c => c.sku === item.sku)

        if (idx > -1) {
            const itemInList = cartList.value[idx]
            itemInList.qty += item.qty
        } else {
            cartList.value = [...cartList.value, item]
        }
    }

    const items = computed(() => cartList.value)

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
        items,
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

