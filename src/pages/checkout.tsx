import { Card } from "flowbite-react"
import ItemsListCheckout from "../components/checkout/itemsListCheckout"
import SummaryCheckout from "../components/checkout/summaryCheckout"

export default function CheckoutPage() {
    return (
        <div class="container mx-auto mt-10">
            <Card>
                <div class="flex flex-row-1">
                    <div class="w-3/4 bg-white p-4">
                        <ItemsListCheckout />
                    </div>
                    <div class="w-1/4 pl-4 py-4">
                        <SummaryCheckout />
                    </div>
                </div>
            </Card>
        </div>
    )
}