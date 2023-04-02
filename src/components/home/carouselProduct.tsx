import { Button, Carousel } from "flowbite-react"

export default function ProductCarousel({ urls }: CarouselProps) {
    return (
        <Carousel>
            {
                urls.map((url, i) => (i === urls.length - 1)
                    ? <LastItemCarousel url={url} /> : <ItemCarousel url={url} />)
            }
        </Carousel>
    )
}


function ItemCarousel({ url }: ItemCarouselProps) {
    return (
        <div>
            <img class="object-cover" src={url} />
        </div>
    )
}

function LastItemCarousel({ url }: ItemCarouselProps) {
    return (
        <div>
            <div class="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p class="uppercase">new collection</p>
                <button class="mt-3 outline w-full ">Add to cart</button>
            </div>
            <img src={url} />
        </div>
    )
}


interface CarouselProps {
    urls: string[]
}

interface ItemCarouselProps {
    url: string
}