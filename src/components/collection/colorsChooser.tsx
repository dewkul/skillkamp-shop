import { StateUpdater, useEffect, useState } from "preact/hooks"
import { ColorRect } from "../shared"


export default function ColorChooser({ setSelectedColors, colorKeys, colorValues }: Props) {
    const [checkedStates, setCheckStates] = useState<boolean[]>([])

    useEffect(() => {
        setCheckStates(new Array(colorKeys.length).fill(false))
    }, [colorKeys])

    const onColorChange = (pos: number) => {
        const updatedChecked = checkedStates.map((item, idx) => idx === pos ? !item : item)
        setCheckStates(updatedChecked)
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
        </div>
    )
}

interface Props {
    setSelectedColors: StateUpdater<string[]>
    colorKeys: string[]
    colorValues: string[]
}