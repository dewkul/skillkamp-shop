import { Product } from "../../schema/product";
import BriefProductCard from "../product/briefCardProduct";

export default function HorizontalProductList({ products }: Props) {
    return (
        <ul
            class="w-full flex justify-between items-start overflow-x-scroll bg-transparent p-4 rounded snap-x"
        >
            {
                products.map((p) =>
                    <li class="flex flex-none flex-col items-center space-y-1">
                        <div class="snap-start pl-5 w-52 md:w-64">
                            <BriefProductCard product={p} />
                        </div>
                    </li>
                )
            }

        </ul>
    )
}

interface Props {
    products: Product[]
}