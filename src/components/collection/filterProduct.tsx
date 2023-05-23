import { Accordion } from "flowbite-react";
import { FilterQueryParams, FilterValue } from "../../schema/filter";
import { useEffect, useState } from "preact/hooks";
import { signal } from '@preact/signals'
import { route, useRouter } from "preact-router";
import { ColorRect } from "../shared";
import { useFilterCtx } from "../../hooks/useFilter";

export default function FilterProduct({ id }: Props) {
    const { categoriesData } = useFilterCtx()
    return (
        <Accordion id={id} flush={true} alwaysOpen={true}>
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
                            : <CategoryFilter id={id} />
                    }
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Price
                </Accordion.Title>
                <Accordion.Content>
                    <PricesFilter id={id} />
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Color
                </Accordion.Title>
                <Accordion.Content>
                    <ColorsFilter id={id} />
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Size
                    {/* {selectedSizes.value.length > 0 && <span> - {selectedSizes.value.join(", ")}</span>} */}
                </Accordion.Title>
                <Accordion.Content>
                    <SizeFilter id={id} />
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    )
}

function CategoryFilter({ id }: Props) {
    const [{ matches }] = useRouter()
    const { categoriesData, selectedCat, setSelectedCat } = useFilterCtx()

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
        <ul id={id + "ul"} class="space-y-1 text-sm text-gray-700 dark:text-gray-200">
            {categoriesData.value.map(c =>
                <li>
                    <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div class="flex items-center h-5">
                            <input
                                id={id + c.key}
                                name={id + "category-radio"}
                                type="radio"
                                value={c.value}
                                onInput={onCategoryChange}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={c.value === selectedCat}
                            />
                        </div>
                        <div class="ml-2 text-sm">
                            <label for={id + c.key} class="font-medium text-gray-900 dark:text-gray-300">
                                <div>{c.value}</div>
                                {/* <p id="helper-radio-text-4" class="text-xs font-normal text-gray-500 dark:text-gray-300"></p> */}
                            </label>
                        </div>
                    </div>
                </li>)}
        </ul>
    )
}



function SizeFilter({ id }: Props) {
    const [{ matches }] = useRouter()
    const { sizesData, sizeCheckStates, setSizeCheckStates } = useFilterCtx()

    useEffect(() => {
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
        setSizeCheckStates(initStates)
    }, [sizesData.value])

    const onSizeChange = (pos: number) => {
        let sizeStr: string[] = []
        const updatedChecked = sizeCheckStates.map((item, idx) => idx === pos ? !item : item)

        setSizeCheckStates(updatedChecked)

        updatedChecked.map((isChecked, idx) => {
            if (isChecked)
                sizeStr.push(sizesData.value[idx].value)
        })
        route(`/shop${getQueryString({
            ...matches,
            s: sizeStr.join(","),
        })}`)
    }

    return (
        <div>
            {sizesData.value.map((s, idx) => <div class="flex items-center pb-3">
                <input
                    id={id + s.key}
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={sizeCheckStates[idx]}
                    onInput={() => onSizeChange(idx)}
                />
                <label
                    for={id + s.key}
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    {s.value}
                </label>
            </div>
            )}
        </div>
    )
}

function ColorsFilter({ id }: Props) {
    const [{ matches }] = useRouter()
    const { colorPickStates, setColorPickState, colorKeysData, colorValuesData } = useFilterCtx()

    useEffect(() => {
        const initStates = new Array(colorKeysData.value.length).fill(false)
        if (matches) {
            const { c } = matches
            if (c) {
                c.split(",").forEach(c => {
                    const i = colorValuesData.value.findIndex(data => data === c)
                    if (i > -1) {
                        initStates[i] = true
                    }
                })
            }
        }
        setColorPickState(initStates)
    }, [colorKeysData.value])

    const onMultiColorChange = (pos: number) => {
        const updatedChecked = colorPickStates.map((item, idx) => idx === pos ? !item : item)
        setColorPickState(updatedChecked)
        let selColors: string[] = []
        updatedChecked.forEach((c, idx) => {
            if (c) {
                selColors.push(colorValuesData.value[idx])
            }
        })

        route(`/shop${getQueryString({
            ...matches,
            c: selColors.join(",")
        })}`)
        // setSelectedColors(selColors)
    }

    return (
        <div class="flex items-center gap-2">
            {
                colorKeysData.value.map((key, i) =>
                    <ColorRect
                        hex={colorValuesData.value[i]}
                        value={key}
                        isChecked={colorPickStates[i]}
                        onColorChange={() => onMultiColorChange(i)}
                        id={`multi-${id}`}
                    />
                )
            }
        </div>
    )
}

function PricesFilter({ id }: Props) {
    const [{ matches }] = useRouter()
    const {
        pricesData,
        selectedFromPrice,
        setSelectedFromPrice,
        selectedToPrice,
        setSelectedToPrice,
        fromPriceList,
        setFromPriceList,
        toPriceList,
        setToPriceList,
    } = useFilterCtx()

    const priceListCount = pricesData.value.length

    const onFromPriceChange = (e: Event) => {
        if (e.target instanceof HTMLSelectElement) {
            const newFromPrice = e.target.value
            setSelectedFromPrice(newFromPrice)
            route(`/shop${getQueryString({
                ...matches,
                // f: newFromPrice === pricesData.value[0].key ? "" : newFromPrice,
                f: newFromPrice,
                t: selectedToPrice,
            })}`)
        }
    }

    const onToPriceChange = (e: Event) => {
        if (e.target instanceof HTMLSelectElement) {
            const newToPrice = e.target.value
            setSelectedToPrice(newToPrice)
            route(`/shop${getQueryString({
                ...matches,
                t: newToPrice === pricesData.value[priceListCount - 1].key ? "" : newToPrice,
                f: selectedFromPrice,
            })}`)
        }
    }

    useEffect(() => {
        if (pricesData.value.length > 0) {
            const initPrices = {
                from: "",
                to: ""
            }
            if (matches) {
                const { f, t } = matches
                if (f) {
                    initPrices.from = f //setSelectedFromPrice(f)
                } else {
                    initPrices.from = pricesData.value[0].key //setSelectedFromPrice(pricesData.value[0].key)
                }

                if (t) {
                    initPrices.to = t //setSelectedToPrice(t)
                } else {
                    initPrices.to = pricesData.value[priceListCount - 1].key //setSelectedToPrice(pricesData.value[priceListCount - 1].key)
                }
            }
            setSelectedFromPrice(initPrices.from)
            setSelectedToPrice(initPrices.to)
            setFromPriceList(pricesData.value.map(p => p.key))
            setToPriceList(pricesData.value.map(p => p.key))
        }
    }, [pricesData.value])

    return (
        <div class="flex">
            <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedFromPrice}
                id={`${id}from-price`}
                onInput={onFromPriceChange}
            >
                {
                    fromPriceList.map(price =>
                        <option value={price}>$ {price}</option>
                    )
                }
            </select>
            <span class="p-2">-</span>
            <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedToPrice}
                id={`${id}to-price`}
                onInput={onToPriceChange}
            >
                {
                    toPriceList.map(price =>
                        <option value={price}>$ {price}</option>
                    )
                }
            </select>
        </div>
    )
}


function getQueryString({ cat, f, t, c, s }: FilterQueryParams) {
    const params: string[] = []
    if (cat)
        params.push(`cat=${cat}`)

    if (s)
        if (s.length > 0) {
            params.push(`s=${s}`)
        }

    if (c)
        if (c.length > 0) {
            params.push(`c=${c}`)
        }

    if (f)
        params.push(`f=${f}`)

    if (t)
        params.push(`t=${t}`)
    return params.length > 0 ? `?${params.join("&")}` : ""
}

interface Props {
    id: string
}


