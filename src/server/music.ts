import { createServerFn } from '@tanstack/react-start'
import { asc, eq } from 'drizzle-orm'
import { getDb } from '#/db/index'
import { musicTracks } from '#/db/schema'
import { PLAYLIST as DEFAULT_PLAYLIST, type Track } from '#/components/HeroMusicPlayer'

// Server function untuk mengambil daftar lagu dari PostgreSQL / Supabase melalui Drizzle
export const getMusicTracksFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Track[]> => {
    try {
      const db = getDb()
      if (!db) {
        return DEFAULT_PLAYLIST
      }

      const rows = await db
        .select()
        .from(musicTracks)
        .where(eq(musicTracks.isActive, true))
        .orderBy(asc(musicTracks.order))

      if (!rows || rows.length === 0) {
        return DEFAULT_PLAYLIST
      }

      return rows.map((r) => ({
        id: r.youtubeId,
        title: r.title,
        artist: r.artist,
        jp: r.jp || undefined,
      }))
    } catch (err) {
      // Fallback graceful jika database belum dikonfigurasi atau offline
      console.warn('Database music tracks fallback to local playlist:', err)
      return DEFAULT_PLAYLIST
    }
  }
)
