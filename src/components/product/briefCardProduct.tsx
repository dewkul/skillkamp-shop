import { Card, Button } from "flowbite-react";
import { Link } from "preact-router";
import { useProductCtx } from "../../hooks/useProduct";
import { Product } from "../../schema/product";


export default function BriefProductCard({ product }: Props) {
    const { name, discountedPrice, media, sku, urlPart } = product
    const { openProductInfoModal } = useProductCtx()

    const onClick = () => openProductInfoModal(sku)
    return (
        <Card
            imgSrc={media[0].url}
        ><Link href={"/product/" + urlPart}>
                <h4>{name}</h4>
                <h3>{discountedPrice}</h3></Link>
            <Button class=" w-full" onClick={onClick}>Add to cart</Button>
        </Card>

    )
}

interface Props {
    product: Product
}