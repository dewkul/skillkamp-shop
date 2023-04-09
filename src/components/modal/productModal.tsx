import { Modal } from "flowbite-react"
import DetailProductGroup from "../product/detailProduct"
import { useState } from "preact/hooks"
import { useProductCtx } from "../../hooks/useProduct"

export default function ProductModal() {
    const { isProductInfoModalOpen, closeProductInfoModal, productInfo } = useProductCtx()
    const [imgIndex, setImgIndex] = useState<number | null>(null)


    return (
        <Modal show={isProductInfoModalOpen} onClose={closeProductInfoModal}>
            <Modal.Header />
            <Modal.Body>
                {productInfo.value
                    && <DetailProductGroup setImgIndex={setImgIndex} detail={productInfo.value} />}
            </Modal.Body>
        </Modal>
    )
}
