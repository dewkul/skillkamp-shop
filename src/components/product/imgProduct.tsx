import { useProductCtx } from "../../hooks/useProduct"

export function ImageProduct({ isShowSelector }: Props) {
    const { productInfo, imgIndex, setImgIndex } = useProductCtx()

    return (
        <div>
            {
                productInfo.value
                && <div>
                    <img
                        src={productInfo.value.media[imgIndex].url}
                        class="w-full"
                    />
                    {isShowSelector && <div class="grid grid-cols-5 gap-4 mt-4">
                        {
                            productInfo.value.media.map(
                                (m, idx) => <span>
                                    <img
                                        src={m.url}
                                        alt={m.title}
                                        class={imgIndex == idx ? "w-full cursor-pointer border border-primary" : "w-full cursor-pointer border"}
                                        onClick={() => setImgIndex(idx)}
                                    />
                                </span>
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