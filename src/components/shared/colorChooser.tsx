import { getContrastingColor, HsvaColor, hsvaToHex } from "@uiw/color-convert"
import Swatch from "@uiw/react-color-swatch"
import { StateUpdater, useEffect, useState } from "preact/hooks"
import { FilterValue } from "../../schema/filter"

export default function ColorChooser({ selectedColor, setSelectedColor, colors }: Props) {
    const [colorHexList, setColorHexList] = useState<string[]>([])
    const [hex, setHex] = useState("")
    useEffect(() => {
        setColorHexList(colors.map((c) => c.key))
    }, [colors])

    useEffect(() => {
        const color = colors.find(c => c.key == hex)
        if (color)
            setSelectedColor(color.value)
    }, [hex])
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

interface Props {
    selectedColor: string
    setSelectedColor: StateUpdater<string>
    colors: FilterValue[]
}