import { useEffect, useState } from "preact/hooks"
import { Product } from "../../schema/product"
import BriefProductCard from "../product/briefCardProduct"
import { useRouter } from "preact-router"
import { useProductCtx } from "../../hooks/useProduct"
import { FilterQueryParams } from "../../schema/filter"
import api from "../../lib/api"
import { queryProductByFilters } from "../../hooks/useApi"

export default function GridProducts() {
    const [{ matches }] = useRouter()
    const { allProducts } = useProductCtx()
    const [productList, setProductList] = useState<Product[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        console.log('products useEffect: ', matches)
        if (matches) {
            if (Object.keys(matches).length > 0) {
                console.log("Get filters")
                queryProductByFilters(matches).then((p) => {
                    setProductList(p)
                }).catch(err => console.warn("Query product: ", err))
                // setProductList(allProducts.value)
            } else {
                console.log('Get all')
                setProductList(allProducts.value)
            }
        }
    }, [matches])

    return (
        <div class="lg:col-span-3">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    productList.map(
                        (p, _) => <BriefProductCard product={p} />
                    )
                }
            </div>
        </div>
    )
}


