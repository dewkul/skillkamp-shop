import { computed, signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { CartItem } from "../schema/cart";

const cartList = signal<CartItem[]>([])

function useCart() {
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false)
    const [subtotalInCart, setSubTotalInCart] = useState(0)

    useEffect(() => {
        const subtotal = cartList.value.reduce((accumulator, item) => {
            return accumulator + item.discountedPrice
        }, 0)
        console.log(subtotal)
        setSubTotalInCart(subtotal)
    }, [cartList])

    const updateItemInCart = (item: CartItem) => {
        const idx = cartList.value.indexOf(item)
        // if item existed in cart
        if (idx) {
            // update item
            const updatedList = cartList.value.map((c, i) => i == idx ? item : c)
            cartList.value = updatedList
        } else {
            // add item
            cartList.value = [...cartList.value, item]
        }
    }

    const removeItemInCart = (item: CartItem) => {
        const idx = cartList.value.indexOf(item)
        if (idx) {
            const temp = cartList.value[idx]
            let updatedList = cartList.value
            updatedList[idx] = updatedList[-1]
            updatedList[-1] = temp
            updatedList.pop()
            cartList.value = updatedList
        }
    }

    const items = computed(() => cartList.value)
    const itemsCount = computed(() => cartList.value.length)

    return {
        isCartDrawerOpen,
        setCartDrawerOpen,
        updateItemInCart,
        removeItemInCart,
        items,
        itemsCount,
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

