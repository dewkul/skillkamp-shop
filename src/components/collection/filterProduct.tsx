import { Accordion } from "flowbite-react";
import { FilterQueryParams, FilterValue } from "../../schema/filter";
import { useEffect, useState } from "preact/hooks";
import { signal } from '@preact/signals'
import ColorsChooser from "./colorsChooser";
import { useGetFilterApi } from "../../hooks";
import { route, useRouter } from "preact-router";

const categoriesData = signal<FilterValue[]>([])
const pricesData = signal<FilterValue[]>([])
const sizesData = signal<FilterValue[]>([])
const colorKeysData = signal<string[]>([])
const colorValuesData = signal<string[]>([])

// const selectedCat = signal("")
// const selectedSizes = signal<string[]>([])

export default function filterProduct() {
    const [selectedColors, setSelectedColors] = useState<string[]>([])

    const { filters, loading } = useGetFilterApi()

    useEffect(() => {
        if (filters)
            filters.map((f, _) => {
                if (f.filterType == "CATEGORY")
                    categoriesData.value = f.values.reverse()
                else if (f.filterType == "PRICE")
                    pricesData.value = f.values
                else if (f.filterType == "OPTION_COLOR") {
                    colorKeysData.value = f.values.map(c => c.key)
                    colorValuesData.value = f.values.map(c => c.value)
                }
                // colors = f.values
                else if (f.filterType == "OPTION_LIST")
                    sizesData.value = f.values
            })
    }, [filters])

    return (
        <div class="hidden lg:block">
            <Accordion flush={true} alwaysOpen={true}>
                <Accordion.Panel>
                    <Accordion.Title>
                        Category
                    </Accordion.Title>
                    <Accordion.Content>
                        {
                            categoriesData.value.length == 0
                                ? <div className="animate-pulse flex-1 space-y-6 py-2 pl-2">
                                    <span class="flex space-x-2">
                                        <div className="rounded-full bg-gray-400 h-4 w-4"></div>
                                        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                                    </span>
                                    <span class="flex space-x-2">
                                        <div className="rounded-full bg-gray-400 h-4 w-4"></div>
                                        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                    </span>
                                    <span class="flex space-x-2">
                                        <div className="rounded-full bg-gray-400 h-4 w-4"></div>
                                        <div className="h-4 bg-gray-400 rounded w-4/6"></div>
                                    </span>
                                </div>
                                : <CategoryFilter />
                        }
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        Price
                    </Accordion.Title>
                    <Accordion.Content>
                        { }
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        Color
                        {selectedColors.length > 0 && <span> - {selectedColors.join(", ")}</span>}
                    </Accordion.Title>
                    <Accordion.Content>
                        <ColorsChooser
                            setSelectedColors={setSelectedColors}
                            colorKeys={colorKeysData.value}
                            colorValues={colorValuesData.value}
                        />
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        Size
                        {/* {selectedSizes.value.length > 0 && <span> - {selectedSizes.value.join(", ")}</span>} */}
                    </Accordion.Title>
                    <Accordion.Content>
                        <SizeFilter />
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}

function CategoryFilter() {
    const [{ matches }] = useRouter()
    const [selectedCat, setSelectedCat] = useState("All Products")
    const onCategoryChange = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const updatedCat = e.target.value
            setSelectedCat(updatedCat)
            route(`/shop${getQueryString({
                ...matches,
                cat: updatedCat === "All Products" ? "" : updatedCat,
            })}`)
        }
    }

    useEffect(() => {
        if (matches) {
            const { cat } = matches
            if (cat) {
                setSelectedCat(cat)
            } else {
                setSelectedCat("All Products")
            }
        }
    }, [])

    return (
        <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            {categoriesData.value.map(c =>
                <li>
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                id={c.key}
                                name="category-radio"
                                type="radio"
                                value={c.value}
                                onChange={onCategoryChange}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={c.value === selectedCat}
                            />
                        </div>
                        <div class="ml-2 text-sm">
                            <label for={c.key} class="font-medium text-gray-900 dark:text-gray-300">
                                <div>{c.value}</div>
                                {/* <p id="helper-radio-text-4" class="text-xs font-normal text-gray-500 dark:text-gray-300"></p> */}
                            </label>
                        </div>
                    </div>
                </li>)}
        </ul>
    )
}



function SizeFilter() {
    const [checkedStates, setCheckStates] = useState<boolean[]>([])
    const [{ matches }] = useRouter()

    useEffect(() => {
        console.log("size useEffect ", sizesData.value.length)
        const initStates = new Array(sizesData.value.length).fill(false)
        if (matches) {
            const { s } = matches
            if (s) {
                s.split(",").forEach(size => {
                    const i = sizesData.value.findIndex(data => data.value === size)
                    if (i > -1) {
                        initStates[i] = true
                    }
                })
            }
        }
        setCheckStates(initStates)
    }, [sizesData.value])

    // useEffect(() => {
    //     setCheckStates(new Array(sizesData.value.length).fill(false))
    // }, [sizesData.value])

    const onSizeChange = (pos: number) => {
        let sizeStr: string[] = []
        const updatedChecked = checkedStates.map((item, idx) => idx === pos ? !item : item)

        setCheckStates(updatedChecked)

        updatedChecked.map((isChecked, idx) => {
            if (isChecked)
                sizeStr.push(sizesData.value[idx].value)
        })
        route(`/shop${getQueryString({
            ...matches,
            s: sizeStr.join(","),
        })}`)
    }


    // useEffect(() => {
    //     let s: string[] = []

    //     checkedStates.map((c, idx) => {
    //         if (c)
    //             s.push(sizesData.value[idx].value)
    //     })

    // }, [checkedStates])
    return (
        <div>
            {sizesData.value.map((s, idx) => <div class="flex items-center pb-3">
                <input
                    id={s.key}
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={checkedStates[idx]}
                    onChange={() => onSizeChange(idx)}
                />
                <label
                    for={s.key}
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    {s.value}
                </label>
            </div>
            )}
        </div>
    )
}

function getQueryString({ cat, f, t, c, s }: FilterQueryParams) {
    const params: string[] = []
    if (cat) {
        params.push(`cat=${cat}`)
    }
    if (s) {
        if (s.length > 0) {
            params.push(`s=${s}`)
        }
    }
    return params.length > 0 ? `?${params.join("&")}` : ""
}



// function CheckIcon(props: { class: string }) {
//     return (
//         <svg viewBox="0 0 24 24" fill="none" {...props}>
//             <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
//             <path
//                 d="M7 13l3 3 7-7"
//                 stroke="#fff"
//                 strokeWidth={1.5}
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//             />
//         </svg>
//     )
// }

