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
  isSync: boolean
}
