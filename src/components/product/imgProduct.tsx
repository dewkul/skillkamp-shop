import { useEffect } from "preact/hooks"
import { useProductCtx } from "../../hooks/useProduct"

export function ImageProduct({ isShowSelector }: Props) {
    const { productInfo, imgIndex, setImgIndex } = useProductCtx()

    useEffect(() => {
        setImgIndex(0)
    }, [])
    return (
        <div>
            {
                productInfo.value
                && <div>
                    <img
                        src={productInfo.value.media[imgIndex].fullUrl}
                        class="w-full"
                    />
                    {isShowSelector && <div class="grid grid-cols-5 gap-4 mt-4">
                        {
                            productInfo.value.media.map(
                                m => <img
                                    src={m.fullUrl}
                                    alt={m.title}
                                    class="w-full cursor-pointer border border-primary"
                                />
                            )
                        }

                    </div>}
                </div>
            }
        </div>
    )
}

interface Props {
    isShowSelector: boolean
}