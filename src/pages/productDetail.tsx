import { Breadcrumb } from "flowbite-react"
import { useEffect } from "preact/hooks"
import { MdHome } from "react-icons/md"
import DetailProductGroup from "../components/product/detailProduct"
import { useProductCtx } from "../hooks/useProduct"
import { ImageProduct } from "../components/product/imgProduct"
import { HorizontalProductList } from "../components/shared"

export default function ProductDetailPage({ urlPath }: Props) {

    const { allProducts, productInfo, setSelectedSku, setSelectedColor, setSelectedSize } = useProductCtx()

    useEffect(() => {
        if (allProducts) {
            const p = allProducts.find(product => product.urlPart == urlPath)
            if (p) {
                setSelectedSku(p.sku)
            }
        }
        setSelectedColor(null)
        setSelectedSize("")
    }, [urlPath, allProducts])

    return (
        <div class="mx-3">
            <div class="my-8">
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
            </div>
            <div class="container grid grid-cols-1 md:grid-cols-2 gap-6">
                {productInfo.value && <ImageProduct isShowSelector={true} />}
                {productInfo.value && <DetailProductGroup detail={productInfo.value} />}
            </div>
            <div class="pl-3 pt-9 flex justify-between items-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900">Related products</h2>
            </div>
            <HorizontalProductList products={allProducts} />
        </div>
    )
}



interface Props {
    urlPath: string
}

