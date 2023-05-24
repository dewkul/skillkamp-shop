import Dexie, { Table } from 'dexie'
import { CartItem } from '../schema/cart'

class HappyKidsDb extends Dexie {
  auth!: Table<AuthTable>
  cart!: Table<CartTable>

  constructor() {
    super('happyKidsApp')
    this.version(1).stores({
      auth: '++id, token, email, name',
      cart: '++id, sku, name, price, discountedPrice, color, size, qty, fullUrl, isSync',
    })

    this.version(2)
      .stores({
        cart: '++id, sku, name, price, discountedPrice, color, size, qty, fullUrl, isDataSync',
      })
      .upgrade((trans) => {
        return trans
          .table('cart')
          .toCollection()
          .modify((cart) => {
            cart.isDataSync = cart.isSync ? 1 : 0
            delete cart.isSync
          })
      })
    this.version(3)
      .stores({
        cart: '++id, sku, name, price, discountedPrice, color, size, qty, imgUrl, isDataSync',
      })
      .upgrade((trans) => {
        return trans
          .table('cart')
          .toCollection()
          .modify((cart) => {
            cart.imgUrl = cart.fullUrl
            delete cart.fullUrl
          })
      })
  }
}

export const IDB = new HappyKidsDb()

interface AuthTable {
  id?: number
  token: string
  email: string
  name: string
}

interface CartTable extends CartItem {
  id?: number
  sku: string
  name: string
  price: number
  discountedPrice: number
  color: string
  size: string
  qty: number
  imgUrl: string
  isDataSync: number
}
