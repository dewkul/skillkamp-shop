
import { NewArrivalList, ProductCarousel } from "../components/home";

export default function HomePage() {
    return (
        <div>
            <ProductCarousel urls={[
                // "http://fakeimg.pl/2000x800/0079D8/fff/?text=Hello",
                // "http://fakeimg.pl/2000x800/DA5930/fff/?text=World",
                // "http://fakeimg.pl/2000x800/F90/fff/?text=Human",
                "https://skillkamp-api.com/static/54d6b9_eb6b50374a2e4a88839d77d165fc9f59_mv2.png",
                "https://skillkamp-api.com/static/54d6b9_1a533d5056dc4a77a0b0176b36ea9106_mv2.png",
                "https://skillkamp-api.com/static/54d6b9_594a0ac4e0af4753be00b5e6b236a156_mv2.png",
            ]} />
            <NewArrivalList />
            {/* <h1 class="text-3xl font-bold underline">
                Hello world!
            </h1> */}
        </div>
    )
}