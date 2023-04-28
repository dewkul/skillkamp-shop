import { Tooltip } from "flowbite-react"
import "./colorRect.css"

export default function ColorRect({ hex, value, onColorChange, isChecked, id }: Props) {
    return (
        <Tooltip content={value} placement="bottom">
            <div class="color-selector">
                <input
                    type="checkbox"
                    value={value}
                    name="color"
                    id={id + hex}
                    class="hidden"
                    checked={isChecked}
                    onInput={onColorChange} />
                <label
                    for={id + hex}
                    class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={"background-color: " + hex}
                ></label>
            </div>
        </Tooltip>
    )
}

interface Props {
    hex: string
    value: string
    onColorChange: () => void //(pos: number) => void
    isChecked: boolean
    id: string
}

