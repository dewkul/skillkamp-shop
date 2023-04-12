import { Breadcrumb } from "flowbite-react"
import { useEffect } from "preact/hooks"
import { MdHome } from "react-icons/md"
import DetailProductGroup from "../components/product/detailProduct"
import { useProductCtx } from "../hooks/useProduct"
import { ImageProduct } from "../components/product/imgProduct"

export default function ProductDetailPage({ urlPath }: Props) {

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

                {productInfo.value && <ImageProduct isShowSelector={true} />}
                {productInfo.value && <DetailProductGroup detail={productInfo.value} />}
            </div>
        </div>
    )
}



interface Props {
    urlPath: string
}

