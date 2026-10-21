import { config } from 'dotenv'
config({ path: ['.env.local', '.env'] })

import { drizzle } from 'drizzle-orm/node-postgres'
import { musicTracks } from './schema'
import * as schema from './schema'

const SEED_TRACKS = [
  { youtubeId: 'vd3IlOjSUGQ', title: 'ハルカ (Haruka)', artist: 'YOASOBI', jp: 'YOASOBI', order: 1 },
  { youtubeId: 'F64yFFnZfkI', title: '言って。(Say It.)', artist: 'ヨルシカ (Yorushika)', jp: 'ヨルシカ', order: 2 },
  { youtubeId: 'RCltAg_iK0E', title: 'Bunny Girl (バニーガール)', artist: 'AKASAKI', jp: 'AKASAKI', order: 3 },
  { youtubeId: 'Soy4jGPHr3g', title: 'テトリス (Tetris)', artist: '柊マグネタイト feat. 重音テト', jp: '重音テト', order: 4 },
  { youtubeId: 'Cs70yKJmUvs', title: 'ささやかな祈り', artist: 'Rice Shower (CV: Manaka Iwami)', jp: 'ライスシャワー', order: 5 },
  { youtubeId: 'QkSCy3r8N9M', title: '木漏れ日のエール', artist: 'Tokai Teio & Mejiro McQueen', jp: 'トウカイテイオー & メジロマックイーン', order: 6 },
  { youtubeId: 'YExL2ilCMLs', title: 'BRIGHTEST HEART', artist: 'Oguri Cap (CV: Tomoyo Takayanagi)', jp: 'オグリキャップ', order: 7 },
  { youtubeId: 'VFOg6mHtZcA', title: 'うまぴょい伝説', artist: 'ウマ娘 (Uma Musume)', jp: 'ウマ娘 プリティーダービー', order: 8 },
  { youtubeId: 'aOfbMnp37xY', title: 'Make debut!', artist: 'Spica (ウマ娘 / Uma Musume)', jp: 'スピカ', order: 9 },
  { youtubeId: 'PCp2iXA1uLE', title: 'オドループ (oddloop)', artist: 'フレデリック (Frederic)', jp: 'フレデリック', order: 10 },
  { youtubeId: 'n7VZxg9pxkg', title: 'veil', artist: '須田景凪 (Keina Suda)', jp: '須田景凪', order: 11 },
  { youtubeId: 'J5Z7tIq7bco', title: '奏 (かなで / Kanade)', artist: 'スキマスイッチ (Sukima Switch)', jp: 'スキマスイッチ', order: 12 },
  { youtubeId: 'FocFked1TbQ', title: 'Surat Cinta Untuk Starla', artist: 'Virgoun', jp: 'スターラへの手紙', order: 13 },
  { youtubeId: 'aeisMKwtDvU', title: 'Klebus', artist: 'Misono Mika (AI) • Vil Mi', jp: '聖園ミカ', order: 14 },
  { youtubeId: 'W6j7ntV7848', title: 'KISINAN 2', artist: 'Takanashi Hoshino (AI) • Vil Mi', jp: '小鳥遊ホシノ', order: 15 },
]

async function seed() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('DATABASE_URL tidak ditemukan. Atur DATABASE_URL di .env atau .env.local terlebih dahulu.')
    process.exit(1)
  }

  console.log('Menyambung ke database PostgreSQL / Supabase...')
  const db = drizzle(dbUrl, { schema })

  console.log('Memasukkan 15 lagu ke tabel music_tracks...')
  for (const track of SEED_TRACKS) {
    await db
      .insert(musicTracks)
      .values({
        youtubeId: track.youtubeId,
        title: track.title,
        artist: track.artist,
        jp: track.jp,
        order: track.order,
        isActive: true,
      })
      .onConflictDoNothing()
  }

  console.log('✅ Berhasil memasukkan data lagu ke database!')
  process.exit(0)
}

seed().catch((e) => {
  console.error('❌ Gagal melakukan seed database:', e)
  process.exit(1)
})
