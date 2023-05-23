export interface Product {
  id: string
  options: Option[]
  ribbon: string
  price: number
  discountedPrice: number
  sku: string
  isInStock: boolean
  urlPath: string
  formattedDiscountedPrice: string
  formattedPrice: string
  name: string
  media: Media[]
  inventory: Inventory
}

interface Media {
  url: string
  index: number
  mediaType: string
  altText: string | null
  title: string
}

interface Option {
  id: string
  key: string
}

export interface Inventory {
  status: string
  quantity: number
}
