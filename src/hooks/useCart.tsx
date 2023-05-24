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

    const path = "/v2/cart"

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

        let isDataSync = 0
        if (item) {
            if (token.value) {
                const err = await putAuthData({
                    path,
                    body: newItem,
                    token: token.value,
                })
                if (!err)
                    isDataSync = 1
            }
            IDB.cart.update(item.id!, { qty, isDataSync })
            return
        }
        // add new item
        if (token.value) {
            const err = await postAuthData({
                path,
                body: { ...newItem },
                token: token.value,
            })
            if (!err)
                isDataSync = 1
        }
        IDB.cart.add({
            ...newItem,
            isDataSync,
        })

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

        let isDataSync = 0
        if (item) {
            const updatedItem = {
                ...item,
                qty: item.qty + qty,
            }
            if (token.value) {
                const err = await putAuthData({
                    path,
                    body: updatedItem,
                    token: token.value,
                })
                if (!err)
                    isDataSync = 1
            }
            IDB.cart.update(item.id!, {
                ...updatedItem,
                isDataSync,
            })
        } else {

            if (token.value) {
                const err = await postAuthData({
                    path,
                    body: { ...newItem },
                    token: token.value,
                })
                if (!err)
                    isDataSync = 1
            }
            IDB.cart.add({
                ...newItem,
                isDataSync,
            })
        }
        closeProductInfoModal()
    }

    const clearCart = async () => {
        const allItems = await IDB.cart
            .toArray()

        allItems.forEach(i => {
            removeItemInCart(i)
        })
    }

    const syncItems = (itemsInCloud: CartItem[]) => {
        if (itemsInCloud)
            syncItemsFromCloud(itemsInCloud)
                .then(() => syncItemsToCloud(itemsInCloud))
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

    const syncItemsToCloud = async (itemsInCloud: CartItem[]) => {
        const itemsNotSync = await IDB.cart.where("isDataSync").equals(0).toArray()
        for (const item of itemsNotSync) {
            const isItemExistedInCloud = itemsInCloud.some(i => {
                if (i.sku === item.sku && i.color === item.color && i.size === item.size)
                    return true
                return false
            })

            let isDataSync = 0

            if (isItemExistedInCloud) {
                if (token.value) {
                    const err = await putAuthData({
                        path,
                        body: item,
                        token: token.value,
                    })
                    if (!err)
                        isDataSync = 1
                }
                IDB.cart.add({
                    ...item,
                    isDataSync,
                })
                return
            }
            // Item is not existed in cloud
            if (token.value) {
                const err = await postAuthData({
                    path,
                    body: item,
                    token: token.value,
                })
                if (!err)
                    isDataSync = 1
            }
            IDB.cart.update(item.id!, {
                ...item,
                isDataSync,
            })
        }

    }

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

