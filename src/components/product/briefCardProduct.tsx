import { Card, Button } from "flowbite-react";
import { Product } from "../../schema/product";


export default function BriefProductCard({ product }: Props) {
    const { name, discountedPrice, media } = product
    return (
        <Card>
            <img src={media[0].url} class="h-40 md:h-52 xl:h-60" />
            <h4>{name}</h4>
            <h3>{discountedPrice}</h3>
            <Button class=" w-full">Add to cart</Button>
        </Card>
    )
}

interface Props {
    product: Product
}