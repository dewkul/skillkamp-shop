export interface CartItem {
  sku: string
  name: string
  price: number
  discountedPrice: number
  color: string
  size: string
  qty: number
  fullUrl?: string
}
