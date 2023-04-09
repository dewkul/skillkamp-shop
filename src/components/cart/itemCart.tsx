import { useState } from "preact/hooks";
import { CartItem } from "../../schema/cart";

export default function ItemCart({ item }: Props) {
    const { name, qty, discountedPrice, price, color, size, fullUrl } = item
    const [quantity, setQuantity] = useState(qty)
    return (
        <li class="flex py-6">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={fullUrl}
                    alt={name}
                    class="h-full w-full object-cover object-center"
                />
            </div>

            <div class="ml-4 flex flex-1 flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href="#">Throwback Hip Bag</a>
                        </h3>
                        <p class="ml-4">${discountedPrice}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{color}</p>
                    <p class="mt-1 text-sm text-gray-500">{size}</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                    {/* <p class="text-gray-500">Qty 1</p> */}
                    <div class="flex items-center border-gray-100">
                        <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                        <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={quantity} min="1" />
                        <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                    </div>

                    <div class="flex">
                        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

interface Props {
    item: CartItem
}