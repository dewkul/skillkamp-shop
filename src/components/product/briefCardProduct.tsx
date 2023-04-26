import { Card, Button } from "flowbite-react";
import { Link } from "preact-router";
import { useProductCtx } from "../../hooks/useProduct";
import { Product } from "../../schema/product";


export default function BriefProductCard({ product }: Props) {
    const { name, discountedPrice, media, sku, urlPart, price } = product
    const { openProductInfoModal } = useProductCtx()

    const onClick = () => openProductInfoModal(sku)
    return (
        <Card
            imgSrc={media[0].url}
        >
            <Link href={"/product/" + urlPart}>
                <h4 class="text-lg font-medium uppercase">{name}</h4>
                <div class="flex items-baseline mb-1 space-x-2 mt-4">
                    <h3 class="text-xl text-primary font-semibold">$ {discountedPrice}</h3>
                    {price != discountedPrice && <p class="text-base text-gray-400 line-through">${price}</p>}
                </div>
            </Link>
            <Button class="w-full" onClick={onClick}>Add to cart</Button>
        </Card>

    )
}

interface Props {
    product: Product
}