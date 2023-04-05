import { StateUpdater, useState } from "preact/hooks"
import { ProductDetail, Selection } from "../../schema/productDetail"
import { ColorChooser } from "../shared"
import { Button } from "flowbite-react"

export default function DetailProductGroup({ setImgIndex, detail }: Props) {
    const { name, sku, price, discountedPrice, options } = detail
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const n = Number(e.target.value)
            if (n > 0)
                setQuantity(n)
        }
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
                            op.optionType == "COLOR" &&
                            <div>
                                <h5 class="text-lg text-gray-800 mb-3 font-medium">{op.title}</h5>
                                <ColorChooser
                                    selectedColor={selectedColor}
                                    setSelectedColor={setSelectedColor}
                                    colorKeys={op.selections.map(c => c.value)}
                                    colorValues={op.selections.map(c => c.key)}
                                />
                            </div>
                        }
                        {
                            op.optionType == "DROP_DOWN" &&
                            <div>
                                <h5 class="text-lg text-gray-800 mb-3 font-medium">{op.title}</h5>
                                <SizeChooser selections={op.selections} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                            </div>
                        }
                    </div>
                )
            }
            <div class="pt-4">
                <label for="quantity" class="text-lg text-gray-800 mb-3 font-medium dark:text-white">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1"
                    onChange={updateQuantity}
                />
            </div>
            <Button>Add to cart</Button>
        </div>
    )
}

function ColorPick() {
    return (
        <div class="pt-4">
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
            <div class="flex items-center gap-2">
                <div class="color-selector">
                    <input type="radio" name="color" id="red" class="hidden" />
                    <label for="red"
                        class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                        style="background-color: #fc3d57;"></label>
                </div>
                <div class="color-selector">
                    <input type="radio" name="color" id="black" class="hidden" />
                    <label for="black"
                        class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                        style="background-color: #000;"></label>
                </div>
                <div class="color-selector">
                    <input type="radio" name="color" id="white" class="hidden" />
                    <label for="white"
                        class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                        style="background-color: #fff;"></label>
                </div>

            </div>
        </div>
    )
}

function SizeChooser({ selections, selectedSize, setSelectedSize }: SizeChooserProps) {
    return (
        <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedSize}
            onChange={e => {
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
    setImgIndex: StateUpdater<number | null>
    detail: ProductDetail
}

interface SizeChooserProps {
    selections: Selection[]
    selectedSize: string
    setSelectedSize: StateUpdater<string>
}