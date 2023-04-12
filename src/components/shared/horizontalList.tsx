import { Product } from "../../schema/product";
import BriefProductCard from "../product/briefCardProduct";

export default function HorizontalProductList({ products }: Props) {
    return (
        <ul
            class="w-full flex justify-between items-start overflow-x-scroll bg-transparent p-4 rounded snap-x"
        >
            {
                products.length > 0
                    ? products.map((p) =>
                        <li class="flex flex-none flex-col items-center space-y-1">
                            <div class="snap-start pl-5 w-52 md:w-64">
                                <BriefProductCard product={p} />
                            </div>
                        </li>
                    )
                    : <SkeletonProductList />
            }

        </ul>
    )
}

function SkeletonProductList() {
    return (
        <>
            {
                new Array(10).fill(true).map(() => (
                    <li class="flex flex-none flex-col items-center space-y-1">
                        <div class="snap-start pl-5 w-52 md:w-64">
                            <div class="bg-white p-2 sm:p-4  rounded-2xl shadow-lg flex flex-col gap-5 select-none ">
                                <div class="h-48 md:h-52 lg:h-64 w-full rounded-xl bg-gray-200 animate-pulse" ></div>
                                <div class="bg-gray-200 w-5/6 animate-pulse h-5 rounded-2xl" ></div>
                                <div class="bg-gray-200 w-3/5 animate-pulse h-5 rounded-2xl" ></div>
                                <div class="bg-gray-200 mt-1 w-full animate-pulse h-12 rounded-2xl" ></div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </>
    )
}

interface Props {
    products: Product[]
}