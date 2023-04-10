import { useCartCtx } from "../../hooks/useCart";
import ItemCart from "../cart/itemCart";
import SubtotalCart from "../cart/subtotalCart";
import Drawer from "../shared/drawer";

export default function CartDrawer() {
    const { isCartDrawerOpen, closeCartDrawer, itemsCount } = useCartCtx()

    return (
        <Drawer
            header="Shopping Cart"
            isOpen={isCartDrawerOpen}
            closeDrawer={closeCartDrawer}>
            <div>
                {
                    itemsCount.value > 0
                        ? <ItemListCart />
                        : <EmptyCart />
                }
            </div>
            <SubtotalCart />
        </Drawer>
    )
}

function ItemListCart() {
    const { items } = useCartCtx()
    return (
        <div class="m-8">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
                {
                    items.value.map(item => (
                        <ItemCart item={item} />
                    ))
                }
            </ul>
        </div>
    )
}

function EmptyCart() {
    return (
        <p>Empty</p>
    )
}
