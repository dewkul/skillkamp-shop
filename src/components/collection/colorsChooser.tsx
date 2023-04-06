import { StateUpdater, useEffect, useState } from "preact/hooks"
import { ColorRect } from "../shared"


export default function ColorChooser({ selectedColors, setSelectedColors, colorKeys, colorValues }: Props) {
    const [checkedStates, setCheckStates] = useState<boolean[]>([])

    useEffect(() => {
        setCheckStates(new Array(colorKeys.length).fill(false))
        console.log('use effect ' + colorKeys.length)
    }, [colorKeys])

    const onColorChange = (pos: number) => {
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

    return (
        <div class="flex items-center gap-2">
            {
                colorKeys.map((key, i) =>
                    <ColorRect hex={key} value={colorValues[i]} isChecked={checkedStates[i]} onColorChange={() => onColorChange(i)} />
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