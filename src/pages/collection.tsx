import { FilterProduct, GridProducts } from "../components/collection";
import getProducts from "../json/getProduct.json"

export default function CollectionPage() {
    const getProductResponse = getProducts.detail.data.catalog.category.productsWithMetaData

    return (
        <section aria-labelledby="collection-heading" class="pb-24 pt-6">
            <div class="flex items-baseline justify-between border-b border-gray-200 pb-6">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">Collections</h1>
                <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                    <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div class="pt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <FilterProduct />
                <GridProducts products={getProductResponse.list} />
            </div>
        </section>
    )
}
