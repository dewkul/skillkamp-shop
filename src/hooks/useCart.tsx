import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { CartItem } from "../schema/cart";
import { useProductCtx } from "./useProduct";
import { useLiveQuery } from "./useLiveQuery";
import { IDB } from "../lib/idb";
import { computed } from "@preact/signals";
import { useAuthCtx } from "./useAuth";
import { deleteAuthData, postAuthData, putAuthData } from "../lib/api";

function useCart() {
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false)
    const [subtotalInCart, setSubTotalInCart] = useState("")
    const [totalQtyCart, setTotalQtyCart] = useState(0)
    const [isCartPending, setCartPending] = useState(false)
    const [shippingCost, setShippingCost] = useState(0)
    const [isPaidModalShow, setPaidModalShow] = useState(false)

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
            let err = undefined
            if (token.value) {
                err = await putAuthData({
                    path,
                    body: newItem,
                    token: token.value,
                })
            }
            IDB.cart.update(item.id!, { qty, isDataSync: err ? 0 : 1 })
        } else {
            let err = undefined
            if (token.value) {
                err = await postAuthData({
                    path,
                    body: { ...newItem },
                    token: token.value,
                })
            }
            IDB.cart.add({
                ...newItem,
                isDataSync: err ? 0 : 1,
            })
        }
    }

    const removeItemInCart = async (toBeRemoved: CartItem) => {
        const item = await findItem(toBeRemoved)

        if (item) {
            if (item.isDataSync) {
                if (token.value)
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
            let err = undefined
            if (token.value) {
                err = await putAuthData({
                    path,
                    body: updatedItem,
                    token: token.value,
                })
            }
            IDB.cart.update(item.id!, {
                ...updatedItem,
                isDataSync: err ? 0 : 1,
            })
        } else {
            let err = undefined
            if (token.value) {
                err = await postAuthData({
                    path,
                    body: { ...newItem },
                    token: token.value,
                })
            }
            IDB.cart.add({
                ...newItem,
                isDataSync: err ? 0 : 1,
            })
        }
        closeProductInfoModal()
    }

    const clearCart = async () => {
        const allItems = await IDB.cart
            .toArray()

        allItems.forEach(i => {
            IDB.cart.delete(i.id!)
        })
    }

    const syncItems = (itemsInCloud: CartItem[]) => {
        syncItemsFromCloud(itemsInCloud)
        // .then(() => syncItemsToCloud(itemsInCloud))
    }

    const syncItemsFromCloud = async (itemsInCloud: CartItem[]) => {
        for (const item of itemsInCloud) {
            const itemInDb = await findItem(item)
            if (!itemInDb) {
                IDB.cart.add({
                    ...item,
                    isDataSync: 1,
                })
                return
            }

            if (!itemInDb.isDataSync) {
                IDB.cart.update(itemInDb.id!, { ...item, isDataSync: 1 })
            }
        }
    }

    // const syncItemsToCloud = async (itemsInCloud: CartItem[]) => {
    // TODO: remapping boolean -> 0, 1 - as bool is non-indexable
    //     IDB.cart.where("isSync").equals
    // }

    const totalPrice = computed(() => Number(subtotalInCart) + shippingCost)

    const openCartDrawer = () => setCartDrawerOpen(true)
    const closeCartDrawer = () => setCartDrawerOpen(false)
    const openPaidModal = () => setPaidModalShow(true)
    const closePaidModal = () => setPaidModalShow(false)

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
        totalPrice,
        shippingCost,
        setShippingCost,
        isPaidModalShow,
        openPaidModal,
        closePaidModal,
        clearCart,
        syncItems,
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

