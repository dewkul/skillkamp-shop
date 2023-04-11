import { signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { Filter, FilterQueryParams, FilterValue } from "../schema/filter";

const categoriesData = signal<FilterValue[]>([])
const pricesData = signal<FilterValue[]>([])
const sizesData = signal<FilterValue[]>([])
const colorKeysData = signal<string[]>([])
const colorValuesData = signal<string[]>([])

function useFilter() {
    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false)
    const [selectedCat, setSelectedCat] = useState("All Products")
    const [sizeCheckStates, setSizeCheckStates] = useState<boolean[]>([])
    const [colorPickStates, setColorPickState] = useState<boolean[]>([])
    const [selectedFromPrice, setSelectedFromPrice] = useState("")
    const [selectedToPrice, setSelectedToPrice] = useState("")
    const [fromPriceList, setFromPriceList] = useState<string[]>([])
    const [toPriceList, setToPriceList] = useState<string[]>([])

    const openFilterDrawer = () => setFilterDrawerOpen(true)
    const closeFilterDrawer = () => setFilterDrawerOpen(false)

    const setFilterData = (filters: Filter[]) => {
        filters.map((f, _) => {
            if (f.filterType == "CATEGORY")
                categoriesData.value = f.values.reverse()
            else if (f.filterType == "PRICE")
                pricesData.value = f.values
            else if (f.filterType == "OPTION_COLOR") {
                colorKeysData.value = f.values.map(c => c.key)
                colorValuesData.value = f.values.map(c => c.value)
            }
            else if (f.filterType == "OPTION_LIST")
                sizesData.value = f.values
        })
    }

    return {
        isFilterDrawerOpen,
        openFilterDrawer,
        closeFilterDrawer,
        setFilterData,
        categoriesData,
        pricesData,
        sizesData,
        colorKeysData,
        colorValuesData,
        setSelectedCat,
        selectedCat,
        sizeCheckStates,
        setSizeCheckStates,
        colorPickStates,
        setColorPickState,
        selectedFromPrice,
        setSelectedFromPrice,
        selectedToPrice,
        setSelectedToPrice,
        fromPriceList,
        setFromPriceList,
        toPriceList,
        setToPriceList,
    }
}

const FilterContext = createContext<ReturnType<typeof useFilter> | undefined>(
    undefined
)

export function useFilterCtx() {
    return useContext(FilterContext)!
}

export function FilterProvider({
    children,
}: {
    children: ComponentChildren,
}) {
    return (
        <FilterContext.Provider value={useFilter()}>
            {children}
        </FilterContext.Provider>
    )
}