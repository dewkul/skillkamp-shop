import { Card } from "flowbite-react"
import ItemsListCheckout from "../components/checkout/itemsListCheckout"
import SummaryCheckout from "../components/checkout/summaryCheckout"

export default function CheckoutPage() {
    return (
        <div class="container mx-auto mt-10">
            <Card>
                <div class="grid grid-cols-1 md:grid-cols-3 md:divide-x space-x-2 divide-y md:divide-y-0">
                    <div class="col-span-2 bg-white pr-4 pt-4">
                        <ItemsListCheckout />
                    </div>
                    <div class=" pl-4 py-4">
                        <SummaryCheckout />
                    </div>
                </div>
            </Card>
        </div>
    )
}