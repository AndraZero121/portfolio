import { useState, useEffect, useRef, memo, useCallback } from 'react'
import { motion } from 'motion/react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { getMusicTracksFn } from '#/server/music'

export interface Track {
  id: string
  title: string
  artist: string
  jp?: string
}

// 15 Lagu Pilihan Sesuai Urutan Permintaan:
// Haruka -> Itte -> Bunny Girl -> Tetoris -> Sasayaka Na Inori -> Komorebi No Yell ->
// Brightest Heart -> Umapyoi Legend -> Make Debut -> Oddloop -> Veil -> Kanade ->
// Surat Cinta Untuk Starla -> Klebus -> Kisinan
export const PLAYLIST: Track[] = [
  {
    id: 'vd3IlOjSUGQ',
    title: 'ハルカ (Haruka)',
    artist: 'YOASOBI',
    jp: 'YOASOBI',
  },
  {
    id: 'F64yFFnZfkI',
    title: '言って。(Say It.)',
    artist: 'ヨルシカ (Yorushika)',
    jp: 'ヨルシカ',
  },
  {
    id: 'RCltAg_iK0E',
    title: 'Bunny Girl (バニーガール)',
    artist: 'AKASAKI',
    jp: 'AKASAKI',
  },
  {
    id: 'Soy4jGPHr3g',
    title: 'テトリス (Tetris)',
    artist: '柊マグネタイト feat. 重音テト',
    jp: '重音テト',
  },
  {
    id: 'Cs70yKJmUvs',
    title: 'ささやかな祈り',
    artist: 'Rice Shower (CV: Manaka Iwami)',
    jp: 'ライスシャワー',
  },
  {
    id: 'QkSCy3r8N9M',
    title: '木漏れ日のエール',
    artist: 'Tokai Teio & Mejiro McQueen',
    jp: 'トウカイテイオー & メジロマックイーン',
  },
  {
    id: 'YExL2ilCMLs',
    title: 'BRIGHTEST HEART',
    artist: 'Oguri Cap (CV: Tomoyo Takayanagi)',
    jp: 'オグリキャップ',
  },
  {
    id: 'VFOg6mHtZcA',
    title: 'うまぴょい伝説',
    artist: 'ウマ娘 (Uma Musume)',
    jp: 'ウマ娘 プリティーダービー',
  },
  {
    id: 'aOfbMnp37xY',
    title: 'Make debut!',
    artist: 'Spica (ウマ娘 / Uma Musume)',
    jp: 'スピカ',
  },
  {
    id: 'PCp2iXA1uLE',
    title: 'オドループ (oddloop)',
    artist: 'フレデリック (Frederic)',
    jp: 'フレデリック',
  },
  {
    id: 'n7VZxg9pxkg',
    title: 'veil',
    artist: '須田景凪 (Keina Suda)',
    jp: '須田景凪',
  },
  {
    id: 'J5Z7tIq7bco',
    title: '奏 (かなで / Kanade)',
    artist: 'スキマスイッチ (Sukima Switch)',
    jp: 'スキマスイッチ',
  },
  {
    id: 'FocFked1TbQ',
    title: 'Surat Cinta Untuk Starla',
    artist: 'Virgoun',
    jp: 'スターラへの手紙',
  },
  {
    id: 'aeisMKwtDvU',
    title: 'Klebus',
    artist: 'Misono Mika (AI) • Vil Mi',
    jp: '聖園ミカ',
  },
  {
    id: 'W6j7ntV7848',
    title: 'KISINAN 2',
    artist: 'Takanashi Hoshino (AI) • Vil Mi',
    jp: '小鳥遊ホシノ',
  },
]

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void
    YT?: any
  }
}

export default function HeroMusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>(PLAYLIST)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isApiReady, setIsApiReady] = useState(false)

  const playerRef = useRef<any>(null)
  const isSeekingRef = useRef(false)
  const playlistScrollRef = useRef<HTMLDivElement>(null)

  // Synchronized Mutable Refs untuk mengatasi bug stale closure pada YouTube IFrame event listener
  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex
  const tracksRef = useRef(tracks)
  tracksRef.current = tracks
  const isLoopRef = useRef(isLoop)
  isLoopRef.current = isLoop
  const isShuffleRef = useRef(isShuffle)
  isShuffleRef.current = isShuffle
  const isPlayingRef = useRef(isPlaying)
  isPlayingRef.current = isPlaying
  const handleAutoNextRef = useRef<() => void>(() => {})

  const currentTrack = tracks[currentIndex] || tracks[0] || PLAYLIST[0]

  // Muat lagu dari database (Supabase / Postgres via Drizzle) jika tersedia
  useEffect(() => {
    let isMounted = true
    getMusicTracksFn()
      .then((dbTracks) => {
        if (isMounted && dbTracks && dbTracks.length > 0) {
          setTracks(dbTracks)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  // Inisialisasi YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.YT && window.YT.Player) {
      setIsApiReady(true)
      return
    }

    const prevOnReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prevOnReady) prevOnReady()
      setIsApiReady(true)
    }

    if (!document.getElementById('youtube-iframe-api-script')) {
      const tag = document.createElement('script')
      tag.id = 'youtube-iframe-api-script'
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
    }
  }, [])

  // Instansiasi Player IFrame saat API siap
  useEffect(() => {
    if (!isApiReady || typeof window === 'undefined') return

    const player = new window.YT.Player('hero-youtube-audio-iframe', {
      height: '1',
      width: '1',
      videoId: currentTrack.id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (e: any) => {
          playerRef.current = e.target
          try {
            e.target.setVolume(volume)
          } catch {}
        },
        onStateChange: (e: any) => {
          // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
          if (e.data === 1) {
            setIsPlaying(true)
            setIsBuffering(false)
          } else if (e.data === 2) {
            setIsPlaying(false)
            setIsBuffering(false)
          } else if (e.data === 3) {
            setIsBuffering(true)
          } else if (e.data === 0) {
            // Menggunakan ref segar untuk memastikan indeks lagu berpindah ke lagu berikutnya secara benar
            handleAutoNextRef.current()
          }
        },
        onError: () => {
          setIsBuffering(false)
        },
      },
    })

    return () => {
      try {
        player?.destroy()
      } catch {}
    }
  }, [isApiReady])

  // Timer pemantauan durasi dan posisi scrub (750ms menghemat alokasi CPU & render)
  useEffect(() => {
    let interval: any
    if (isPlaying && !isSeekingRef.current) {
      interval = setInterval(() => {
        if (playerRef.current) {
          try {
            const curr = playerRef.current.getCurrentTime() || 0
            const dur = playerRef.current.getDuration() || 0
            setCurrentTime(curr)
            if (dur > 0) setDuration(dur)
          } catch {}
        }
      }, 750)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Navigasi Lagu Berdasarkan Indeks (Stabil & Memoized)
  const loadTrackByIndex = useCallback((idx: number, playImmediate = true) => {
    currentIndexRef.current = idx
    setCurrentIndex(idx)
    setCurrentTime(0)
    setDuration(0)

    const list = tracksRef.current
    if (playerRef.current && list[idx]) {
      try {
        if (playImmediate) {
          playerRef.current.loadVideoById(list[idx].id)
          setIsPlaying(true)
        } else {
          playerRef.current.cueVideoById(list[idx].id)
          setIsPlaying(false)
        }
      } catch {}
    }
  }, [])

  const handleSelectTrack = useCallback((idx: number) => {
    loadTrackByIndex(idx, true)
  }, [loadTrackByIndex])

  // Otomatis Pindah ke Lagu Berikutnya Saat Lagu Selesai
  const handleAutoNext = () => {
    const curr = currentIndexRef.current
    const list = tracksRef.current
    if (isLoopRef.current) {
      if (playerRef.current) {
        try {
          playerRef.current.seekTo(0, true)
          playerRef.current.playVideo()
        } catch {}
      }
      return
    }

    if (isShuffleRef.current) {
      let nextIdx = Math.floor(Math.random() * list.length)
      if (nextIdx === curr && list.length > 1) {
        nextIdx = (nextIdx + 1) % list.length
      }
      loadTrackByIndex(nextIdx, true)
      return
    }

    const nextIdx = (curr + 1) % list.length
    loadTrackByIndex(nextIdx, true)
  }
  handleAutoNextRef.current = handleAutoNext

  const handleNext = () => {
    const curr = currentIndexRef.current
    const list = tracksRef.current
    if (isShuffleRef.current) {
      let nextIdx = Math.floor(Math.random() * list.length)
      if (nextIdx === curr && list.length > 1) {
        nextIdx = (nextIdx + 1) % list.length
      }
      loadTrackByIndex(nextIdx, isPlayingRef.current)
    } else {
      const nextIdx = (curr + 1) % list.length
      loadTrackByIndex(nextIdx, isPlayingRef.current)
    }
  }

  const handlePrev = () => {
    const curr = currentIndexRef.current
    const list = tracksRef.current
    if (currentTime > 4) {
      // Jika sudah berjalan lebih dari 4 detik, ulangi dari awal lagu
      if (playerRef.current) {
        try {
          playerRef.current.seekTo(0, true)
          setCurrentTime(0)
        } catch {}
      }
      return
    }
    const prevIdx = (curr - 1 + list.length) % list.length
    loadTrackByIndex(prevIdx, isPlayingRef.current)
  }

  const togglePlay = () => {
    if (!playerRef.current) return
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo()
        setIsPlaying(false)
      } else {
        playerRef.current.playVideo()
        setIsPlaying(true)
      }
    } catch {}
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value)
    setCurrentTime(targetTime)
  }

  const handleSeekCommit = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    isSeekingRef.current = false
    const targetTime = parseFloat((e.target as HTMLInputElement).value)
    if (playerRef.current) {
      try {
        playerRef.current.seekTo(targetTime, true)
      } catch {}
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    setVolume(val)
    if (playerRef.current) {
      try {
        playerRef.current.setVolume(val)
        if (val > 0 && isMuted) {
          playerRef.current.unMute()
          setIsMuted(false)
        }
      } catch {}
    }
  }

  const toggleMute = () => {
    if (!playerRef.current) return
    try {
      if (isMuted) {
        playerRef.current.unMute()
        setIsMuted(false)
      } else {
        playerRef.current.mute()
        setIsMuted(true)
      }
    } catch {}
  }

  // Scroll tombol khusus di dalam daftar putar (Memoized)
  const scrollPlaylist = useCallback((direction: 'up' | 'down') => {
    if (playlistScrollRef.current) {
      playlistScrollRef.current.scrollBy({
        top: direction === 'up' ? -90 : 90,
        behavior: 'smooth',
      })
    }
  }, [])

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const thumbnailUrl = `https://i.ytimg.com/vi/${currentTrack.id}/hqdefault.jpg`

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[440px] select-none">
      {/* Hidden YouTube Iframe Audio Engine (ditempatkan aktif di DOM tanpa memblokir rendering) */}
      <div
        id="hero-youtube-audio-iframe"
        aria-hidden="true"
        className="fixed bottom-1 right-1 w-[2px] h-[2px] opacity-[0.01] pointer-events-none overflow-hidden -z-50"
      />

      {/* Main Music Player Card: Cyber Hi-Fi Deck with Modern Glassmorphism */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-5 overflow-hidden">
        {/* Subtle Background Glow Accent matching playback state */}
        <div
          aria-hidden="true"
          className={`absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isPlaying
              ? 'bg-blue-500/20 dark:bg-sky-500/25 scale-110'
              : 'bg-blue-500/8 dark:bg-blue-600/10 scale-90'
          }`}
        />

        {/* 0. DECK STATUS BAR: Telemetry & Sound Indicator */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/70 dark:border-white/5 text-[10.5px] font-mono">
          <div className="flex items-center gap-2">
            {/* Animated Equalizer Waveform */}
            <div className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-blue-500 rounded-full transition-all ${
                  isPlaying ? 'h-full animate-pulse' : 'h-1.5'
                }`}
              />
              <span
                className={`w-0.5 bg-sky-400 rounded-full transition-all ${
                  isPlaying ? 'h-3/4 animate-pulse delay-75' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-indigo-500 rounded-full transition-all ${
                  isPlaying ? 'h-4/5 animate-pulse delay-150' : 'h-2'
                }`}
              />
            </div>
            <span className="font-bold tracking-wider text-zinc-700 dark:text-zinc-300">
              SOUND DECK // 音響
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
            <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
              {String(currentIndex + 1).padStart(2, '0')}/{String(tracks.length).padStart(2, '0')}
            </span>
            <span className="text-[9.5px] uppercase tracking-widest hidden sm:inline">
              {isPlaying ? 'PLAYING' : 'IDLE'}
            </span>
          </div>
        </div>

        {/* 1. TOP ROW: Cover Persegi di Kiri + Info & Scrubber di Kanan */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Cover Persegi di Sebelah Kiri - Klik untuk Membuka di YouTube Langsung */}
          <a
            href={`https://www.youtube.com/watch?v=${currentTrack.id}`}
            target="_blank"
            rel="noopener noreferrer"
            title={`Buka "${currentTrack.title}" di YouTube`}
            className="group/cover relative aspect-square w-24 h-24 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-zinc-200/80 dark:border-white/10 shadow-md block bg-zinc-950 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <img
              src={thumbnailUrl}
              alt={currentTrack.title}
              loading="lazy"
              className={`w-full h-full object-cover transition-all duration-500 ${
                isPlaying ? 'scale-105 brightness-100' : 'scale-100 brightness-90'
              }`}
            />

            {/* Subtle Hover Overlay showing YouTube External Link */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
              <ExternalLink className="w-5 h-5 drop-shadow-md" />
            </div>

            {/* Subtle dynamic wave indicator in bottom corner if playing */}
            {isPlaying && (
              <div className="absolute bottom-1.5 left-1.5 flex items-end gap-0.5 h-3 bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded-md pointer-events-none">
                <span className="w-0.5 h-full bg-blue-400 animate-pulse" />
                <span className="w-0.5 h-2/3 bg-blue-400 animate-pulse delay-75" />
                <span className="w-0.5 h-4/5 bg-blue-400 animate-pulse delay-150" />
              </div>
            )}
          </a>

          {/* Sisi Kanan: Judul, Artist, Tag Jepang & Scrubber */}
          <div className="flex-1 min-w-0 flex flex-col justify-between h-24 sm:h-28 py-0.5">
            {/* Title & Artist */}
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base tracking-tight text-zinc-950 dark:text-white truncate leading-snug">
                {currentTrack.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5 truncate">
                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {currentTrack.artist}
                </p>
                {currentTrack.jp && (
                  <span className="hidden sm:inline-block px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800/60 text-[9px] font-mono text-zinc-400 shrink-0">
                    {currentTrack.jp}
                  </span>
                )}
              </div>
            </div>

            {/* Seek Scrubber Bar & Timestamps */}
            <div>
              <div className="relative group/scrub py-1 flex items-center">
                <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-blue-500 dark:via-sky-400 dark:to-indigo-400 transition-all duration-150 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  aria-label="Posisi pemutaran musik"
                  onMouseDown={() => (isSeekingRef.current = true)}
                  onTouchStart={() => (isSeekingRef.current = true)}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekCommit}
                  onTouchEnd={handleSeekCommit}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{isBuffering ? 'Memuat...' : formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE ROW: Primary Controls (Shuffle, Back, Pause/Play, Skip, Loop) */}
        <div className="mt-4 pt-3 border-t border-zinc-200/70 dark:border-white/5 flex items-center justify-between gap-2 px-1 sm:px-2">
          {/* Shuffle */}
          <button
            type="button"
            onClick={() => setIsShuffle(!isShuffle)}
            aria-label={isShuffle ? 'Matikan acak lagu' : 'Nyalakan acak lagu'}
            title={isShuffle ? 'Acak: Aktif' : 'Acak: Mati'}
            className={`p-2 rounded-xl transition-all cursor-pointer focus:outline-none ${
              isShuffle
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/40'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          {/* Back / Previous */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Lagu sebelumnya"
            title="Lagu Sebelumnya"
            className="p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all cursor-pointer focus:outline-none active:scale-90"
          >
            <SkipBack className="w-4 h-4 fill-current" />
          </button>

          {/* Pause / Play */}
          <motion.button
            type="button"
            onClick={togglePlay}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            aria-label={isPlaying ? 'Jeda pemutaran musik' : 'Putar musik'}
            title={isPlaying ? 'Jeda' : 'Putar'}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer focus:outline-none"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            )}
          </motion.button>

          {/* Skip / Next */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Lagu berikutnya"
            title="Lagu Berikutnya"
            className="p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all cursor-pointer focus:outline-none active:scale-90"
          >
            <SkipForward className="w-4 h-4 fill-current" />
          </button>

          {/* Repeat / Loop */}
          <button
            type="button"
            onClick={() => setIsLoop(!isLoop)}
            aria-label={isLoop ? 'Matikan ulang lagu' : 'Ulangi lagu ini'}
            title={isLoop ? 'Ulangi: Aktif' : 'Ulangi: Mati'}
            className={`p-2 rounded-xl transition-all cursor-pointer focus:outline-none ${
              isLoop
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/40'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. VOLUME ROW: Slider & Angka Volume yang Rapi */}
        <div className="mt-3 pt-2.5 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between gap-3 px-1 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
              className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-500" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <span className="text-xs font-bold font-mono text-zinc-700 dark:text-zinc-200 min-w-8">
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>

          <div className="flex-1 max-w-[170px] sm:max-w-[210px] flex items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume audio"
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
          </div>
        </div>

        {/* 4. PERMANENT PLAYLIST DRAWER (Memoized) */}
        <PlaylistDrawer
          tracks={tracks}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
          playlistScrollRef={playlistScrollRef}
          scrollPlaylist={scrollPlaylist}
        />
      </div>
    </div>
  )
}

// Sub-komponen Daftar Putar yang di-memoize untuk mencegah re-render konstan saat timer audio berdetik
interface PlaylistDrawerProps {
  tracks: Track[]
  currentIndex: number
  isPlaying: boolean
  onSelectTrack: (idx: number) => void
  playlistScrollRef: React.RefObject<HTMLDivElement | null>
  scrollPlaylist: (dir: 'up' | 'down') => void
}

const PlaylistDrawer = memo(function PlaylistDrawer({
  tracks,
  currentIndex,
  isPlaying,
  onSelectTrack,
  playlistScrollRef,
  scrollPlaylist,
}: PlaylistDrawerProps) {
  return (
    <div className="mt-3.5 pt-3 border-t border-zinc-200/80 dark:border-white/10">
      {/* Header Daftar Putar & Tombol Scroll Khusus */}
      <div className="flex items-center justify-between mb-2 px-0.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 tracking-wider">
            DAFTAR PUTAR ({tracks.length})
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-zinc-400 dark:text-zinc-500 font-sans text-[10.5px]">
            Pilih lagu
          </span>
        </div>

        {/* Tombol Scroll Khusus untuk Mempermudah Menggulir Daftar Lagu */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scrollPlaylist('up')}
            aria-label="Scroll daftar lagu ke atas"
            title="Scroll ke atas"
            className="p-1 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200/80 dark:border-white/5 transition-colors cursor-pointer focus:outline-none"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollPlaylist('down')}
            aria-label="Scroll daftar lagu ke bawah"
            title="Scroll ke bawah"
            className="p-1 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200/80 dark:border-white/5 transition-colors cursor-pointer focus:outline-none"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable Container dengan data-lenis-prevent & overscroll-contain agar tidak men-scroll halaman */}
      <div
        ref={playlistScrollRef}
        data-lenis-prevent
        className="max-h-36 sm:max-h-40 overflow-y-auto space-y-1 pr-1 font-sans text-xs scrollbar-thin overscroll-contain select-none"
        style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
      >
        {tracks.map((track, idx) => {
          const isCurrent = idx === currentIndex
          return (
            <button
              key={`${track.id}-${idx}`}
              type="button"
              onClick={() => onSelectTrack(idx)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer focus:outline-none ${
                isCurrent
                  ? 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/30 shadow-xs'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span
                  className={`font-mono text-[10.5px] w-5 shrink-0 ${
                    isCurrent
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="truncate">
                  <p className="truncate text-xs font-medium leading-snug">{track.title}</p>
                  <p className="truncate text-[10.5px] text-zinc-400 dark:text-zinc-500">
                    {track.artist}
                  </p>
                </div>
              </div>

              {isCurrent && isPlaying ? (
                <div className="flex items-end gap-0.5 h-3 shrink-0 ml-2">
                  <span className="w-0.5 h-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-blue-600 dark:bg-blue-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-4/5 bg-blue-600 dark:bg-blue-400 animate-pulse delay-150" />
                </div>
              ) : isCurrent ? (
                <span className="text-[9px] font-mono uppercase text-blue-500/80 px-1 py-0.5 rounded bg-blue-100/50 dark:bg-blue-900/30">
                  READY
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
})
