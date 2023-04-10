import "./colorRect.css"

export default function ColorRect({ hex, value, onColorChange, isChecked, id }: Props) {
    return (
        <div class="color-selector">
            <input
                type="checkbox"
                value={value}
                name="color"
                id={id + hex}
                class="hidden"
                checked={isChecked}
                onChange={onColorChange} />
            <label
                for={id + hex}
                class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                style={"background-color: " + hex}
            ></label>
        </div>
    )
}

interface Props {
    hex: string
    value: string
    onColorChange: () => void //(pos: number) => void
    isChecked: boolean
    id: string
}

