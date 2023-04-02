import BriefProductCard from "../product/briefCardProduct";

export default function NewArrivalList() {
    const resp = {
        "id": "9c50a7f4-7b09-4c3d-f06b-daccbe54a6d5",
        "options": [
            {
                "id": "opt-1",
                "key": "Color"
            },
            {
                "id": "a1ccfa58-e41b-743e-b7d7-92a012ea669f",
                "key": "Size"
            }
        ],
        "ribbon": "",
        "price": 19.99,
        "discountedPrice": 19.99,
        "sku": "00001",
        "isInStock": true,
        "urlPart": "i-m-a-product-4",
        "formattedDiscountedPrice": "19.99$",
        "formattedPrice": "19.99$",
        "name": "I'm a product",
        "media": [
            {
                "url": "https://skillkamp-api.com/static/45d10e_11ee24bab35748af871e855fa259b6ab_mv2.jpg",
                "index": 0,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "https://skillkamp-api.com/static/45d10e_11ee24bab35748af871e855fa259b6ab_mv2.jpg"
            },
            {
                "url": "https://skillkamp-api.com/static/45d10e_2ba3595c1f554721a850a3bd9133c386_mv2.jpg",
                "index": 1,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "https://skillkamp-api.com/static/45d10e_2ba3595c1f554721a850a3bd9133c386_mv2.jpg"
            }
        ],
        "inventory": {
            "status": "in_stock",
            "quantity": 20
        }
    }

    const { name, price, discountedPrice, media, isInStock, ribbon, urlPart } = resp

    return (
        <div class="mt-5">
            <span class="pl-3">New Arrival</span>
            <ul
                class="w-full flex justify-between items-start mb-8 space-x-3 overflow-x-scroll bg-transparent p-4 rounded snap-x"
            >
                <li class="snap-start flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="snap-start flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="snap-start flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="snap-start flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
                <li class="flex flex-none flex-col items-center space-y-1">
                    <BriefProductCard name={name} priceDiscountAmount={discountedPrice} medias={media} isInStock={isInStock} ribbon={ribbon} urlPath={urlPart} priceAmount={price} />
                </li>
            </ul>
        </div>
    )
}