import { signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { Product } from "../schema/product";
import { ProductDetail } from "../schema/productDetail";
import { getProductInfoBySku } from "./useApi";
import { FilterValue } from "../schema/filter";

const productInfo = signal<ProductDetail | null>(null)

function useProduct() {
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [selectedSku, setSelectedSku] = useState<string | null>(null)
    const [isProductInfoModalOpen, setProductInfoModalOpen] = useState(false)
    const [imgIndex, setImgIndex] = useState<number>(0)
    const [selectedColor, setSelectedColor] = useState<FilterValue | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState("")

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
        setSelectedSku,
        imgIndex,
        setImgIndex,
        selectedColor,
        setSelectedColor,
        quantity,
        setQuantity,
        selectedSize,
        setSelectedSize,
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