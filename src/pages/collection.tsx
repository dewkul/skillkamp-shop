import { useEffect } from "preact/hooks";
import { FilterProduct, GridProducts } from "../components/collection";
import { FilterDrawer } from "../components/drawer/filterDrawer";
import ProductModal from "../components/modal/productModal";
import { useGetFilterApi } from "../hooks";
import { useFilterCtx } from "../hooks/useFilter";

export default function CollectionPage() {
    const { openFilterDrawer, setFilterData } = useFilterCtx()

    const { filters, loading } = useGetFilterApi()

    useEffect(() => {
        if (filters)
            setFilterData(filters)
    }, [filters])

    return (
        <section aria-labelledby="collection-heading" class="pb-24 pt-6">
            <div class="flex items-baseline justify-between border-b border-gray-200 pb-6">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">Collections</h1>
                <button
                    class="lg:hidden px-4 py-2 border-l"
                    onClick={openFilterDrawer}
                >
                    <div class="flex space-x-2">
                        <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-md">Filter</span>
                    </div>
                </button>
            </div>
            <div class="pt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <div class="hidden lg:block">
                    <FilterProduct id="side-" />
                </div>
                <GridProducts />
            </div>
            <ProductModal />
            <div class="lg:hidden">
                <FilterDrawer />
            </div>
        </section>
    )
}
