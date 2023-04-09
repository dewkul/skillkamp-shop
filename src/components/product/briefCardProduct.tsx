import { Card, Button } from "flowbite-react";
import { useProductCtx } from "../../hooks/useProduct";
import { Product } from "../../schema/product";


export default function BriefProductCard({ product }: Props) {
    const { name, discountedPrice, media, sku } = product
    const { openProductInfoModal } = useProductCtx()

    const onClick = () => openProductInfoModal(sku)
    return (
        <div>
            <Card
                imgSrc={media[0].url}
            >
                <h4>{name}</h4>
                <h3>{discountedPrice}</h3>
                <Button class=" w-full" onClick={onClick}>Add to cart</Button>
            </Card>
        </div>
    )
}

interface Props {
    product: Product
}