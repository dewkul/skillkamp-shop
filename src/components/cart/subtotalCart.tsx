import { route } from "preact-router"
import { useCartCtx } from "../../hooks/useCart"
import { useAuthCtx } from "../../hooks/useAuth"

export default function SubtotalCart() {
    const { subtotalInCart, closeCartDrawer, totalQtyCart, setCartPending } = useCartCtx()
    const { isLogIn, openAuthDrawer } = useAuthCtx()

    const onCheckout = () => {
        route('/checkout')
        closeCartDrawer()
    }

    const login = () => {
        setCartPending(true)
        closeCartDrawer()
        openAuthDrawer()
    }

    return (
        <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
            {
                (totalQtyCart > 0) &&
                <>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotalInCart}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                </>
            }
            <div class="mt-6">
                {
                    isLogIn.value
                        ?
                        <button
                            class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 disabled:bg-primary-200"
                            onClick={onCheckout}
                            disabled={totalQtyCart <= 0}
                        >
                            <span>Checkout</span>

                        </button>
                        : <button
                            class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 disabled:bg-primary-200"
                            onClick={login}>
                            <span>Log in to Checkout</span>
                        </button>
                }
            </div>


            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                    or
                    <button
                        class="font-medium text-secondary-600 hover:text-secondary-500 ml-2"
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