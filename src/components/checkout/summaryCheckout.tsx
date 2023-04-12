import { useCartCtx } from "../../hooks/useCart"

export default function SummaryCheckout() {
    const { subtotalInCart, shippingCost, totalPrice } = useCartCtx()
    return (
        <div>
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-5">
                <span class="font-semibold text-sm uppercase">Subtotal</span>
                <span class="font-semibold text-sm">${subtotalInCart}</span>
            </div>
            <div class="flex justify-between my-5">
                <span class="font-semibold text-sm uppercase">Shipping</span>
                {
                    shippingCost == 0
                        ? <span class="font-semibold text-sm">FREE</span>
                        : <span class="font-semibold text-sm">$ {shippingCost.toFixed(2)}</span>
                }

            </div>
            <div class="py-4 border-t">
                <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                <div class="flex">
                    <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full" />
                    <button class="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                </div>
            </div>

            <div class="border-t mt-8">
                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                </div>
                <button
                    class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full round-lg"
                >
                    Place Order
                </button>
            </div>
        </div>
    )
}