import { Inventory } from './product'

export interface ProductDetail {
  id: string
  description: string
  type: string
  isVisible: boolean
  sku: string
  ribbon: string
  brand: string | null
  price: number
  discountedPrice: number
  formattedPrice: string
  formattedDiscountedPrice: string
  createVersion: number
  name: string
  inventory: Inventory
  isInStock: boolean
  media: MediaDetail[]
  options: OptionsDetail[]
  productType: string
  urlPart: string
  additionalInfo: Info[]
}

interface MediaDetail {
  id: string
  url: string
  fullUrl: string
  altText: string | null
  thumbnailFullUrl: string
  mediaType: string
  index: number
  title: string
}

interface OptionsDetail {
  id: string
  title: string
  optionType: string
  key: string
  selections: Selection[]
}

export interface Selection {
  id: number
  value: string
  description: string
  key: string
  linkedMediaItems: LinkedMedia[] | null
}

interface LinkedMedia {
  altText: string | null
  url: string
  fullUrl: string
  thumbnailFullUrl: string
  mediaType: string
  index: number
  title: string
}

interface Info {
  id: string
  title: string
  description: string
  index: number
}
