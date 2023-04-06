import { useState } from "preact/hooks"
import DetailProductGroup from "../components/product/detailProduct"
import getProductDetail from "../json/getProductDetail.json"

export default function ProductDetailPage() {
    const [imgIndex, setImgIndex] = useState<number | null>(null)
    const detail = getProductDetail.detail.data.catalog.product
    return (
        <div>
            <div class="container grid grid-cols-2 gap-6">
                <div>
                    <img
                        src={detail.media[0].fullUrl}
                        class="w-full"
                    />
                    <div class="grid grid-cols-5 gap-4 mt-4">
                        {
                            detail.media.map(
                                m => <img
                                    src={m.fullUrl}
                                    alt={m.title}
                                    class="w-full cursor-pointer border border-primary"
                                />
                            )
                        }

                    </div>
                </div>
                <DetailProductGroup setImgIndex={setImgIndex} detail={detail} />
            </div>
        </div>
    )
}

