import { Carousel } from "flowbite-react"
import { Link } from "preact-router"

export default function HomeCarousel({ urls }: CarouselProps) {
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
                <p class="uppercase lg:text-xl">new collection</p>
                <Link href="/shop">
                    <button class="mt-3 outline w-full hover:bg-black hover:text-white">Shop Now</button>
                </Link>
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