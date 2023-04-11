import Dexie, { Table } from 'dexie'
import { CartItem } from '../schema/cart'

class HappyKidsDb extends Dexie {
  auth!: Table<AuthTable>
  cart!: Table<CartTable>

  constructor() {
    super('happyKidsApp')
    this.version(1).stores({
      auth: '++id, token, email, name',
      cart: '++id, product, isSync',
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

interface CartTable {
  id?: number
  product: CartItem
  isSync: boolean
}
