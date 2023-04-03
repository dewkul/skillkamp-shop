import { Product } from "../../schema/product";


export default function BriefProductCard({ product }: Props) {
    const { name, discountedPrice, media } = product
    return (
        <div class="rounded drop-shadow-xl bg-white">
            <img src={media[0].url} class="h-40 md:h-52 xl:h-60" />
            <div>{name}</div>
            <div>{discountedPrice}</div>
            <button class="outline w-full ">Add to cart</button>
        </div>
    )
}

interface Props {
    product: Product
}