import { computed, signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { Product } from "../schema/product";
import { ProductDetail } from "../schema/productDetail";
import { getProductInfoBySku } from "./useApi";

const products = signal<Product[]>([])
const productInfo = signal<ProductDetail | null>(null)
// const currentSku = signal<string | null>(null)
// const isInfoModalOpen = signal(false)

function useProduct() {
    const [selectedSku, setSelectedSku] = useState<string | null>(null)
    const [isProductInfoModalOpen, setProductInfoModalOpen] = useState(false)

    const allProducts = computed(() => products.value)
    const setAllProducts = (p: Product[]) => products.value = p
    // const selectedSku = computed(() => currentSku.value ? currentSku.value : "")

    const openProductInfoModal = (sku: string) => {
        setSelectedSku(sku)
        setProductInfoModalOpen(true)
    }
    const closeProductInfoModal = () => setProductInfoModalOpen(false)

    useEffect(() => {
        if (selectedSku)
            getProductInfoBySku(selectedSku).then((info) => {
                productInfo.value = info
            })
    }, [selectedSku])

    return {
        allProducts,
        setAllProducts,
        selectedSku,
        isProductInfoModalOpen,
        openProductInfoModal,
        closeProductInfoModal,
        productInfo,
    }
}

const ProductContext = createContext<ReturnType<typeof useProduct> | undefined>(
    undefined
)

export function useProductCtx() {
    return useContext(ProductContext)!
}

export function ProductProvider({
    children,
}: {
    children: ComponentChildren,
}) {
    return (
        <ProductContext.Provider value={useProduct()}>
            {children}
        </ProductContext.Provider>
    )
}