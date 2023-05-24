import { CartItem } from "../../schema/cart"

export default function ProductCheckout({ item }: Props) {
    const { name, discountedPrice, color, size, qty, imgUrl } = item
    return (
        <div class="grid item-center grid-cols-4 lg:grid-cols-5 hover:bg-gray-100 -mx-2 px-6 py-5">
            <div class="col-span-2">
                <div class="grid grid-cols-2">
                    <div class="w-20">
                        <img class="h-24" src={imgUrl} alt={name} />
                    </div>
                    <div class="grid grid-col-3 justify-between ml-4 align-middle">
                        <span class="font-bold text-sm">{name}</span>
                        <span class="text-xs">{color}</span>
                        <span class="text-xs">{size}</span>
                    </div>
                </div>
            </div>
            <span class="text-center m-auto font-semibold ">{qty}</span>
            <span class="text-center m-auto font-semibold text-sm">${discountedPrice}</span>
            <span class="text-center m-auto font-semibold text-sm lg:block hidden">${(discountedPrice * qty).toFixed(2)}</span>
        </div>
    )
}

interface Props {
    item: CartItem
}