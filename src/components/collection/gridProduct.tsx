import { Product } from "../../schema/product"
import BriefProductCard from "../product/briefCardProduct"

export default function GridProducts({ products }: Props) {
    return (
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                products.map(
                    (p, _) => <BriefProductCard product={p} />
                )
            }
        </div>
    )
}

interface Props {
    products: Product[]
}

