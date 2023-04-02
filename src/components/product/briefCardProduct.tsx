

export default function BriefProductCard({ name, medias, priceDiscountAmount }: Props) {
    return (
        <div class="rounded drop-shadow-xl bg-white">
            <img src={medias[0].url} class="h-40 md:h-52 xl:h-60" />
            <div>{name}</div>
            <div>{priceDiscountAmount}</div>
            <button class="outline w-full ">Add to cart</button>
        </div>
    )
}

interface Props {
    name: string
    priceAmount: number
    priceDiscountAmount: number
    medias: Media[]
    isInStock: boolean
    ribbon: string
    urlPath: string
}

interface Media {
    url: string
    index: number,
    mediaType: string,
    altText: string | null,
    title: string
}
