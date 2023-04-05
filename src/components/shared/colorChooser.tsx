import { StateUpdater } from "preact/hooks"
import "./colorChooser.css"


export default function ColorChooser({ selectedColor, setSelectedColor, colorKeys, colorValues }: Props) {
    const onColorChange = (e: Event) => {
        if (e.target instanceof HTMLInputElement)
            setSelectedColor(e.target.value)
    }
    return (
        <div class="flex items-center gap-2">
            {
                colorKeys.map((key, i) =>
                    <div class="color-selector">
                        <input type="radio" value={colorValues[i]} name="color" id={key} class="hidden" onChange={onColorChange} />
                        <label
                            for={key}
                            class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                            style={"background-color: " + key}
                        ></label>
                    </div>
                )
            }
        </div>
    )
}


interface Props {
    selectedColor: string
    setSelectedColor: StateUpdater<string>
    colorKeys: string[]
    colorValues: string[]
}