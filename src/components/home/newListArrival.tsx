import { useGetNewArrivals } from "../../hooks/useApi";
import { HorizontalProductList } from "../shared";

export default function NewArrivalList() {
    const { newArrivals } = useGetNewArrivals()


    return (
        <div class="mt-5">
            <div class="p-5 flex justify-between items-center">
                <span>New Arrival</span>
                <a href="/shop">View All</a>
            </div>
            <HorizontalProductList products={newArrivals} />
        </div>
    )
}