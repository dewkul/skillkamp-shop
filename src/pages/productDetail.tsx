import { Breadcrumb } from "flowbite-react"
import { useEffect, useState } from "preact/hooks"
import { MdHome } from "react-icons/md"
import DetailProductGroup from "../components/product/detailProduct"
import { useProductCtx } from "../hooks/useProduct"

export default function ProductDetailPage({ urlPath }: Props) {
    const [imgIndex, setImgIndex] = useState<number | null>(null)
    const { allProducts, productInfo, setSelectedSku } = useProductCtx()

    useEffect(() => {
        if (allProducts) {
            const p = allProducts.find(product => product.urlPart == urlPath)
            if (p) {
                setSelectedSku(p.sku)
            }
        }
    }, [urlPath, allProducts])

    return (
        <div class="mx-2">
            <Breadcrumb aria-label="breadcrumb">
                <Breadcrumb.Item href="/" icon={MdHome}>
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/shop">
                    Shop
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {productInfo.value?.name}
                </Breadcrumb.Item>
            </Breadcrumb>
            <div class="container grid grid-cols-2 gap-6">

                {productInfo.value && <div>
                    <img
                        src={productInfo.value.media[0].fullUrl}
                        class="w-full"
                    />
                    <div class="grid grid-cols-5 gap-4 mt-4">
                        {
                            productInfo.value.media.map(
                                m => <img
                                    src={m.fullUrl}
                                    alt={m.title}
                                    class="w-full cursor-pointer border border-primary"
                                />
                            )
                        }

                    </div>
                </div>}
                {productInfo.value && <DetailProductGroup setImgIndex={setImgIndex} detail={productInfo.value} />}
            </div>
        </div>
    )
}

interface Props {
    urlPath: string
}

