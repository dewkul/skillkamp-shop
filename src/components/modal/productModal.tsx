import { Modal } from "flowbite-react"
import DetailProduct from "../product/detailProduct"
import { useState } from "preact/hooks"
import { useProductCtx } from "../../hooks/useProduct"
import { ImageProduct } from "../product/imgProduct"

export default function ProductModal() {
    const { isProductInfoModalOpen, closeProductInfoModal, productInfo } = useProductCtx()
    const [imgIndex, setImgIndex] = useState<number | null>(null)


    return (
        <Modal show={isProductInfoModalOpen} onClose={closeProductInfoModal}>
            <Modal.Header />
            <Modal.Body>
                {productInfo.value
                    && <div class="flex">
                        <ImageProduct isShowSelector={false} />
                        <div class="mr-10">
                            <DetailProduct detail={productInfo.value} />
                        </div>
                    </div>
                }
            </Modal.Body>
        </Modal>
    )
}
