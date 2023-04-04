import { Accordion } from "flowbite-react";
import { FilterValue, Filter } from "../../schema/filter";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { hsvaToHex, getContrastingColor, HsvaColor } from '@uiw/color-convert';
import Swatch from '@uiw/react-color-swatch';
import { signal } from '@preact/signals'
import { RadioGroup } from "@headlessui/react";

const categories = signal<FilterValue[]>([])
const prices = signal<FilterValue[]>([])
const colors = signal<FilterValue[]>([])
const sizes = signal<FilterValue[]>([])

export default function filterProduct({ filtersResp }: Props) {
    const [hex, setHex] = useState("")

    useEffect(() => {
        filtersResp.map((f, _) => {
            if (f.filterType == "CATEGORY")
                categories.value = f.values
            else if (f.filterType == "PRICE")
                prices.value = f.values
            else if (f.filterType == "OPTION_COLOR")
                colors.value = f.values
            else if (f.filterType == "OPTION_LIST")
                sizes.value = f.values
        })
    }, [filtersResp])

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
                        <ColorFilter hex={hex} setHex={setHex} colors={colors.value} />
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

function ColorFilter({ hex, setHex, colors }: ColorFilterProps) {
    const [colorHexList, setColorHexList] = useState<string[]>([])
    useEffect(() => {
        setColorHexList(colors.map((c) => c.key))
    }, [colors])
    return (
        <Swatch
            colors={colorHexList}
            color={hex}
            rectProps={{
                children: <Point />,
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }}
            onChange={(hsvColor: HsvaColor) => {
                const newHex = hsvaToHex(hsvColor)
                if (newHex == hex)
                    setHex("")
                else
                    setHex(newHex)
            }}
        />
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

function Point(props: { color?: string; checked?: boolean }) {
    if (!props.checked) return null;
    return (
        <div
            style={{
                height: 5,
                width: 5,
                borderRadius: '50%',
                backgroundColor: getContrastingColor(props.color!),
            }}
        />
    );
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

interface Props {
    filtersResp: Filter[]
}

interface ColorFilterProps {
    hex: string
    setHex: StateUpdater<string>
    colors: FilterValue[]
}

interface CategoryFliterProps {
    categories: FilterValue[]
}

interface SizeFilterProps {
    sizes: FilterValue[]
}
