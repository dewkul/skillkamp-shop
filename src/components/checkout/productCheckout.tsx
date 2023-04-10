import { CartItem } from "../../schema/cart"

export default function ProductCheckout({ item }: Props) {
    const { name, discountedPrice, color, size, qty, fullUrl } = item
    return (
        <div class="flex items-center hover:bg-gray-100 -mx-2 px-6 py-5">
            <div class="flex w-2/5">
                <div class="w-20">
                    <img class="h-24" src={fullUrl} alt={name} />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">{name}</span>
                    <span class="text-xs">{color}</span>
                    <span class="text-xs">{size}</span>
                </div>
            </div>
            <div class="flex justify-center w-1/5">
                {/* <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg> */}
                <span>{qty}</span>
                {/* <input class="mx-2 border text-center w-8" type="text" value="1" />

                <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg> */}
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">${discountedPrice}</span>
            <span class="text-center w-1/5 font-semibold text-sm">${(discountedPrice * qty).toFixed(2)}</span>
        </div>
    )
}

interface Props {
    item: CartItem
}