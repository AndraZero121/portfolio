import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.ts'

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDb() {
  if (typeof process === 'undefined' || !process.env?.DATABASE_URL) {
    return null
  }
  if (!dbInstance) {
    try {
      dbInstance = drizzle(process.env.DATABASE_URL, { schema })
    } catch {
      return null
    }
  }
  return dbInstance
}

export const db = getDb()
