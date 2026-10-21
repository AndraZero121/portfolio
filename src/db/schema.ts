import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Tabel Musik untuk Mengatur Track Playlist dari Database (Supabase / Postgres)
export const musicTracks = pgTable('music_tracks', {
  id: serial().primaryKey(),
  youtubeId: text('youtube_id').notNull(),
  title: text('title').notNull(),
  artist: text('artist').notNull(),
  jp: text('jp'),
  order: integer('order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
})
