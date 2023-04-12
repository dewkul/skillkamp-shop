import { Link } from "preact-router";
import { useCartCtx } from "../../hooks/useCart";
import ProductCheckout from "./productCheckout";

export default function ItemsListCheckout() {
    const { cartList, totalQtyCart } = useCartCtx()
    return (
        <div>
            <div class="flex justify-between pb-8 border-b">
                <h1 class="font-semibold text-2xl">Checkout</h1>
                <h2 class="font-semibold text-2xl">{totalQtyCart} Items</h2>
            </div>
            <div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5"></h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Unit Price</h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            </div>
            {
                cartList.value
                    ? cartList.value.map(item => <ProductCheckout item={item} />)
                    : <div>
                        <h3>Cart is empty</h3>
                    </div>
            }


            <Link href="/shop"
                class="flex font-semibold text-indigo-600 text-sm mt-10"
            >
                <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                Continue Shopping
            </Link>
        </div>
    )
}