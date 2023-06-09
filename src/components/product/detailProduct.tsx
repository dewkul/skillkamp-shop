import { ProductDetail, Selection } from "../../schema/productDetail"
import ColorSingleChooser from "./colorSingleChooser"
import { Button } from "flowbite-react"
import { useCartCtx } from "../../hooks/useCart"
import { toast } from "react-hot-toast"
import { useProductCtx } from "../../hooks/useProduct"

export default function DetailProduct({ detail }: Props) {
    const { name, sku, price, discountedPrice, options, media } = detail
    const { selectedColor, quantity, setQuantity, selectedSize } = useProductCtx()
    const { addItemInCart } = useCartCtx()

    const addToCart = () => {
        if (!selectedColor) {
            console.warn("Color is not selected")
            toast.error("Color is not selected")
            return
        }
        if (selectedSize == "") {
            console.warn("Size is not selected")
            toast.error("Size is not selected")
            return
        }
        const itemToBeAdded = {
            name,
            sku,
            price,
            discountedPrice,
            color: selectedColor.value,
            size: selectedSize,
            qty: quantity,
            imgUrl: media[0].url
        }
        addItemInCart(itemToBeAdded)
        toast.success(`${name} is added to cart`)
    }

    const increaseQuantity = () => {
        if (quantity < detail.inventory[0].quantity)
            setQuantity(quantity + 1)

    }

    const decreaseQuantity = () => {
        if (quantity > 1)
            setQuantity(quantity - 1)
    }

    return (
        <div>
            <h2 class="text-3xl font-medium uppercase mb-2">{name}</h2>
            <h4 class="text-xs text-gray-500">SKU: {sku}</h4>
            <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                <p class="text-xl text-primary font-semibold">${discountedPrice}</p>
                {price != discountedPrice && <p class="text-base text-gray-400 line-through">${price}</p>}
            </div>
            {
                options.map(op =>
                    <div class="pt-4">
                        {
                            op.key == "Color" &&
                            <div>

                                <h5 class="text-lg text-gray-800 mb-3 font-medium">
                                    <span>
                                        Color
                                        {selectedColor && " - " + selectedColor.value}
                                    </span>

                                </h5>

                                <ColorSingleChooser
                                    colorKeys={op.selections.map(c => c.value)}
                                    colorValues={op.selections.map(c => c.key)}
                                />
                            </div>
                        }
                        {
                            op.key == "Size" &&
                            <div>
                                <h5 class="text-lg text-gray-800 mb-3 font-medium">Size</h5>
                                <SizeChooser selections={op.selections} />
                            </div>
                        }

                    </div>
                )
            }

            <div class="mt-4">
                <h3 class="text-lg text-gray-800 mb-3 font-medium">Quantity</h3>
                <div
                    class="flex border border-gray-300 rounded-lg text-gray-600 divide-x divide-gray-300 w-max"
                >
                    <button
                        class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <div class="h-8 w-10 text-base flex items-center justify-center">
                        {quantity}
                    </div>
                    <button
                        class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                        onClick={increaseQuantity}
                    >
                        +
                    </button>
                </div>
            </div>
            <div class="mt-4" onClick={addToCart}>
                <Button>Add to cart</Button>
            </div>
        </div>
    )
}

function SizeChooser({ selections }: SizeChooserProps) {
    const { selectedSize, setSelectedSize } = useProductCtx()
    return (
        <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedSize}
            onInput={e => {
                if (e.target instanceof HTMLSelectElement)
                    setSelectedSize(e.target.value)
            }}
        >
            <option selected disabled hidden value="">Choose a size</option>
            {
                selections.map(s =>
                    <option value={s.value}>
                        {s.value}
                    </option>
                )
            }
        </select>
    )
}



interface Props {
    detail: ProductDetail
}

interface SizeChooserProps {
    selections: Selection[]
}