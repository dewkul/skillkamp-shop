import { useState } from "preact/hooks"
import DetailProductGroup from "../components/product/detailProduct"
import getProductDetail from "../json/getProductDetail.json"

export default function ProductDetailPage() {
    const [imgIndex, setImgIndex] = useState<number | null>(null)
    const detail = getProductDetail.detail.data.catalog.product
    return (
        <div>
            <div class="container grid grid-row-2 gap-6">
                <img
                    src={detail.media[0].fullUrl}
                    class="w-full"
                />
                <DetailProductGroup setImgIndex={setImgIndex} detail={detail} />
            </div>
        </div>
    )
}

