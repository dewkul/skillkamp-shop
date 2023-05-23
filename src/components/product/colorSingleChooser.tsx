import { ColorRect } from "../shared"
import { useProductCtx } from "../../hooks/useProduct"

export default function ColorSingleChooser({ colorKeys, colorValues }: Props) {
    const { setImgIndex, selectedColor, setSelectedColor } = useProductCtx()

    const onColorSingleChange = (pos: number) => {
        setImgIndex(pos)
        if (selectedColor?.value === colorValues[pos])
            setSelectedColor(null)
        else
            setSelectedColor({
                key: colorKeys[pos],
                value: colorValues[pos],
            })
    }

    return (
        <div class="flex items-center gap-2">
            {
                colorKeys.map((key, i) =>
                    <ColorRect
                        hex={key}
                        value={colorValues[i]}
                        isChecked={colorValues[i] === selectedColor?.value}
                        onColorChange={() => onColorSingleChange(i)}
                        id="single-"
                    />
                )
            }
        </div>
    )
}


interface Props {
    colorKeys: string[]
    colorValues: string[]
}