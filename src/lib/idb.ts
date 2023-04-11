import Dexie, { Table } from 'dexie'

class HappyKidsDb extends Dexie {
  auth!: Table<AuthTable>

  constructor() {
    super('happyKidsApp')
    this.version(1).stores({
      auth: '++id, token, email, name',
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
