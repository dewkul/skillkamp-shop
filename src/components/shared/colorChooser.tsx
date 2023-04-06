import { StateUpdater, useEffect, useState } from "preact/hooks"
import "./colorChooser.css"


export default function ColorChooser({ selectedColors, setSelectedColors, colorKeys, colorValues }: Props) {
    const [checkedStates, setCheckStates] = useState<boolean[]>(new Array(colorKeys.length).fill(false))

    useEffect(() => {
        setCheckStates(new Array(colorKeys.length).fill(false))
        console.log('use effect ' + colorKeys.length)
    }, [colorKeys])

    const onColorChange = (pos: number) => {


        // let newChecked: boolean[] = new Array(colorKeys.length).fill(false)
        // console.log(newChecked)
        // if (isMultiChoose)
        //     newChecked = checkedStates
        // console.log(newChecked, checkedStates)

        console.log(checkedStates)
        console.log(pos)

        const updatedChecked = checkedStates.map((item, idx) => idx === pos ? !item : item)
        setCheckStates(updatedChecked)
        console.log(checkedStates)
        let selColors: string[] = []
        updatedChecked.forEach((c, idx) => {
            if (c) {
                selColors.push(colorValues[idx])
            }
        })
        setSelectedColors(selColors)
    }

    // const colorMultiple
    return (
        <div class="flex items-center gap-2">
            {
                colorKeys.map((key, i) =>
                    <div class="color-selector">
                        <input
                            type="checkbox"
                            value={colorValues[i]}
                            name="color"
                            id={key}
                            class="hidden"
                            checked={checkedStates[i]}
                            onChange={() => onColorChange(i)} />
                        <label
                            for={key}
                            class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                            style={"background-color: " + key}
                        ></label>
                    </div>
                )
            }
            <p>Color: {selectedColors.map(c => <p>{c}</p>)}</p>
        </div>
    )
}


interface Props {
    selectedColors: string[]
    setSelectedColors: StateUpdater<string[]>
    colorKeys: string[]
    colorValues: string[]
}