import Dexie, { Table } from 'dexie'

export class HappyKidsDb extends Dexie {
  auth!: Table<AuthTable>

  constructor() {
    super('happyKidsApp')
    this.version(1).stores({
      auth: '++id, token, email',
    })
  }
}

export const IDB = new HappyKidsDb()

export interface AuthTable {
  id?: number
  token: string
  email: string
}
