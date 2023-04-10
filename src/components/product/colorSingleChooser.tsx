import { Signal } from "@preact/signals"
import { StateUpdater, useEffect, useState } from "preact/hooks"
import { FilterValue } from "../../schema/filter"
import { ColorRect } from "../shared"

export default function ColorSingleChooser({ setSelectedColor, colorKeys, colorValues, colorCount }: Props) {
    const [checkedStates, setCheckStates] = useState<boolean[]>(new Array(colorCount).fill(false))

    // useEffect(() => {
    //     setCheckStates(new Array(colorKeys.length).fill(false))
    //     console.log('use effect ' + colorKeys.length)
    // }, [colorKeys])

    const onColorSingleChange = (pos: number) => {
        const updatedChecked = checkedStates.map((item, idx) => idx === pos ? !item : false)
        setCheckStates(updatedChecked)
        console.log("color changed")
        for (let idx = 0; idx < updatedChecked.length; idx++) {
            if (updatedChecked[idx]) {
                setSelectedColor({
                    key: colorKeys[idx],
                    value: colorValues[idx],
                })
                return
            }
        }
        setSelectedColor(null)
    }

    return (
        <div class="flex items-center gap-2">
            {
                colorKeys.map((key, i) =>
                    <ColorRect
                        hex={key}
                        value={colorValues[i]}
                        isChecked={checkedStates[i]}
                        onColorChange={() => onColorSingleChange(i)}
                        id="single-"
                    />
                )
            }
        </div>
    )
}


interface Props {
    setSelectedColor: StateUpdater<FilterValue | null>
    colorKeys: string[]
    colorValues: string[]
    colorCount: number
}