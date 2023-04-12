import { useEffect } from "preact/hooks";
import { useCartCtx } from "../../hooks/useCart";
import { useLiveQuery } from "../../hooks/useLiveQuery";
import { IDB } from "../../lib/idb";
import ItemCart from "../cart/itemCart";
import SubtotalCart from "../cart/subtotalCart";
import Drawer from "../shared/drawer";

export default function CartDrawer() {
    const { isCartDrawerOpen, closeCartDrawer, totalQtyCart } = useCartCtx()

    return (
        <Drawer
            header="Shopping Cart"
            isOpen={isCartDrawerOpen}
            closeDrawer={closeCartDrawer}
            footer={<SubtotalCart />}>
            <div>
                {
                    totalQtyCart > 0
                        ? <ItemListCart />
                        : <EmptyCart />
                }
            </div>
        </Drawer>
    )
}

function ItemListCart() {
    const { cartList } = useCartCtx()

    return (
        <div class="m-8">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
                {
                    cartList.value &&
                    cartList.value.map(item => (
                        <ItemCart item={item} />
                    ))
                }
            </ul>
        </div>
    )
}

function EmptyCart() {
    return (
        <div class="flex">
            <div class="m-auto">
                <p>No product in the cart</p>
            </div>
        </div>
    )
}
