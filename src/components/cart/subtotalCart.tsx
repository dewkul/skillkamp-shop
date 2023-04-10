import { route } from "preact-router"
import { useCartCtx } from "../../hooks/useCart"

export default function SubtotalCart() {
    const { subtotalInCart, closeCartDrawer } = useCartCtx()

    const onCheckout = () => {
        route('/checkout')
        closeCartDrawer()
    }

    return (
        <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotalInCart}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div class="mt-6">
                <button
                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    onClick={onCheckout}
                >
                    Checkout
                </button>
            </div>
            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                    or
                    <button
                        class="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                        onClick={closeCartDrawer}
                    >
                        <span aria-hidden="true">&larr; </span>
                        Continue Shopping
                    </button>
                </p>
            </div>
        </div>
    )
}