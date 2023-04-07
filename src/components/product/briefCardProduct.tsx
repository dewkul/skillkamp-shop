import { Card, Button } from "flowbite-react";
import { Product } from "../../schema/product";


export default function BriefProductCard({ product }: Props) {
    const { name, discountedPrice, media } = product
    return (
        <Card
            imgSrc={media[0].url}
        >
            <h4>{name}</h4>
            <h3>{discountedPrice}</h3>
            <Button class=" w-full">Add to cart</Button>
        </Card>
    )
}

interface Props {
    product: Product
}