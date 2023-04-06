import { Accordion } from "flowbite-react";
import { FilterValue } from "../../schema/filter";
import { useEffect, useState } from "preact/hooks";
import { signal } from '@preact/signals'
import ColorsChooser from "./colorsChooser";
import { useGetFilterApi } from "../../hooks";

const categories = signal<FilterValue[]>([])
const prices = signal<FilterValue[]>([])
const sizes = signal<FilterValue[]>([])
const colorKeys = signal<string[]>([])
const colorValues = signal<string[]>([])

export default function filterProduct() {
    const [selectedColors, setSelectedColors] = useState<string[]>([])

    const { filters, loading } = useGetFilterApi()

    useEffect(() => {
        if (filters)
            filters.map((f, _) => {
                if (f.filterType == "CATEGORY")
                    categories.value = f.values
                else if (f.filterType == "PRICE")
                    prices.value = f.values
                else if (f.filterType == "OPTION_COLOR") {
                    colorKeys.value = f.values.map(c => c.key)
                    colorValues.value = f.values.map(c => c.value)
                }
                // colors = f.values
                else if (f.filterType == "OPTION_LIST")
                    sizes.value = f.values
            })
    }, [filters])

    return (
        <div class="hidden lg:block">
            <Accordion flush={true} alwaysOpen={true}>
                <Accordion.Panel>
                    <Accordion.Title>
                        Collection
                    </Accordion.Title>
                    <Accordion.Content>
                        <CategoryFilter categories={categories.value} />
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
                    </Accordion.Title>
                    <Accordion.Content>
                        <ColorsChooser
                            selectedColors={selectedColors}
                            setSelectedColors={setSelectedColors}
                            colorKeys={colorKeys.value}
                            colorValues={colorValues.value}
                        />
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        Size
                    </Accordion.Title>
                    <Accordion.Content>
                        <SizeFilter sizes={sizes.value} />
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}

function CategoryFilter({ categories }: CategoryFliterProps) {
    const [selectedCat, setSelectedCat] = useState("")
    return (
        <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            {categories.map(c =>
                <li>
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input id={c.key} name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
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
        // https://flowbite.com/docs/forms/radio/
        // https://headlessui.com/react/radio-group
    )
}



function SizeFilter({ sizes }: SizeFilterProps) {
    return (
        <div>
            {sizes.map(s => <div class="flex items-center pb-3">
                <input id={s.key} type="checkbox" value={s.key} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for={s.key} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{s.value}</label>
            </div>
            )}
        </div>
    )
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



interface CategoryFliterProps {
    categories: FilterValue[]
}

interface SizeFilterProps {
    sizes: FilterValue[]
}
