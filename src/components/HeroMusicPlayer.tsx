import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  ListMusic,
  ExternalLink,
  Disc,
} from 'lucide-react'

export interface Track {
  id: string
  title: string
  artist: string
  jp?: string
}

export const PLAYLIST: Track[] = [
  {
    id: 'aeisMKwtDvU',
    title: 'Klebus',
    artist: 'Misono Mika (AI) • Vil Mi',
    jp: '聖園ミカ',
  },
  {
    id: 'dRs7NT-6-N0',
    title: '운명 (Fate)',
    artist: 'Why (Full House OST)',
    jp: '運命',
  },
  {
    id: 'W6j7ntV7848',
    title: 'KISINAN 2',
    artist: 'Takanashi Hoshino (AI) • Vil Mi',
    jp: '小鳥遊ホシノ',
  },
  {
    id: 'FocFked1TbQ',
    title: 'Surat Cinta Untuk Starla',
    artist: 'Virgoun',
    jp: 'スターラへの手紙',
  },
  {
    id: 'Cs70yKJmUvs',
    title: 'ささやかな祈り',
    artist: 'Rice Shower (CV: Manaka Iwami)',
    jp: 'ライスシャワー',
  },
  {
    id: 'YExL2ilCMLs',
    title: 'BRIGHTEST HEART',
    artist: 'Oguri Cap (CV: Tomoyo Takayanagi)',
    jp: 'オグリキャップ',
  },
  {
    id: 'n7VZxg9pxkg',
    title: 'veil',
    artist: '須田景凪 (Keina Suda)',
    jp: '須田景凪',
  },
  {
    id: 'Soy4jGPHr3g',
    title: 'テトリス (Tetris)',
    artist: '柊マグネタイト feat. 重音テト',
    jp: '柊マグネタイト',
  },
  {
    id: 'PCp2iXA1uLE',
    title: 'オドループ (oddloop)',
    artist: 'フレデリック (Frederic)',
    jp: 'フレデリック',
  },
  {
    id: 'J5Z7tIq7bco',
    title: '奏 (かなで / Kanade)',
    artist: 'スキマスイッチ (Sukima Switch)',
    jp: 'スキマスイッチ',
  },
  {
    id: 'RCltAg_iK0E',
    title: 'Bunny Girl (バニーガール)',
    artist: 'AKASAKI',
    jp: 'AKASAKI',
  },
  {
    id: 'QkSCy3r8N9M',
    title: '木漏れ日のエール',
    artist: 'Tokai Teio & Mejiro McQueen',
    jp: 'トウカイテイオー & メジロマックイーン',
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
    id: 'F64yFFnZfkI',
    title: '言って。(Say It.)',
    artist: 'ヨルシカ (Yorushika)',
    jp: 'ヨルシカ',
  },
  {
    id: 'vd3IlOjSUGQ',
    title: 'ハルカ (Haruka)',
    artist: 'YOASOBI',
    jp: 'YOASOBI',
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isApiReady, setIsApiReady] = useState(false)

  const playerRef = useRef<any>(null)
  const isSeekingRef = useRef(false)

  const currentTrack = PLAYLIST[currentIndex]

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
      videoId: PLAYLIST[currentIndex].id,
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
            handleAutoNext()
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

  // Timer pemantauan durasi dan posisi scrub
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
      }, 350)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Navigasi Lagu
  const loadTrackByIndex = (idx: number, playImmediate = true) => {
    setCurrentIndex(idx)
    setCurrentTime(0)
    setDuration(0)

    if (playerRef.current) {
      try {
        if (playImmediate) {
          playerRef.current.loadVideoById(PLAYLIST[idx].id)
          setIsPlaying(true)
        } else {
          playerRef.current.cueVideoById(PLAYLIST[idx].id)
          setIsPlaying(false)
        }
      } catch {}
    }
  }

  const handleAutoNext = () => {
    if (isLoop) {
      if (playerRef.current) {
        playerRef.current.seekTo(0)
        playerRef.current.playVideo()
      }
    } else if (isShuffle) {
      let nextIdx = Math.floor(Math.random() * PLAYLIST.length)
      if (nextIdx === currentIndex && PLAYLIST.length > 1) {
        nextIdx = (nextIdx + 1) % PLAYLIST.length
      }
      loadTrackByIndex(nextIdx, true)
    } else {
      const nextIdx = (currentIndex + 1) % PLAYLIST.length
      loadTrackByIndex(nextIdx, true)
    }
  }

  const handleNext = () => {
    if (isShuffle) {
      let nextIdx = Math.floor(Math.random() * PLAYLIST.length)
      if (nextIdx === currentIndex && PLAYLIST.length > 1) {
        nextIdx = (nextIdx + 1) % PLAYLIST.length
      }
      loadTrackByIndex(nextIdx, isPlaying)
    } else {
      const nextIdx = (currentIndex + 1) % PLAYLIST.length
      loadTrackByIndex(nextIdx, isPlaying)
    }
  }

  const handlePrev = () => {
    if (currentTime > 4) {
      // Jika sudah berjalan lebih dari 4 detik, ulangi dari awal lagu
      if (playerRef.current) {
        playerRef.current.seekTo(0, true)
        setCurrentTime(0)
      }
      return
    }
    const prevIdx = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length
    loadTrackByIndex(prevIdx, isPlaying)
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

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const thumbnailUrl = `https://i.ytimg.com/vi/${currentTrack.id}/hqdefault.jpg`

  return (
    <div className="relative w-full max-w-[460px] sm:max-w-[480px] lg:max-w-[500px] select-none">
      {/* Hidden YouTube Iframe Audio Engine (ditempatkan aktif di DOM tanpa memblokir rendering) */}
      <div
        id="hero-youtube-audio-iframe"
        aria-hidden="true"
        className="fixed bottom-1 right-1 w-[2px] h-[2px] opacity-[0.01] pointer-events-none overflow-hidden -z-50"
      />

      {/* Main Music Player Card: Modern, Sleek Japanese Audio Deck Chassis */}
      <div className="relative rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white/85 dark:bg-[#09090d]/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none"
        />

        {/* 1. Header Bar: Serial / Deck Name & Playlist Toggle */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-200/70 dark:border-white/5 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-zinc-900 dark:text-white uppercase">
              ANDRA SOUND DECK
            </span>
            <span className="text-zinc-400 dark:text-zinc-600 font-sans text-[11px]">
              / 音響
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Track Counter (01 / 16) */}
            <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium tracking-widest">
              {String(currentIndex + 1).padStart(2, '0')} / {String(PLAYLIST.length).padStart(2, '0')}
            </span>

            {/* Tombol Buka/Tutup Playlist Drawer */}
            <button
              type="button"
              onClick={() => setShowPlaylist(!showPlaylist)}
              aria-label={showPlaylist ? 'Tutup daftar lagu' : 'Buka daftar lagu'}
              title="Daftar Putar Lagu"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer focus:outline-none ${
                showPlaylist
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-500'
              }`}
            >
              <ListMusic className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Artwork & Visualizer Display Area */}
        <div className="relative mt-4 mb-5 rounded-2xl overflow-hidden aspect-16/10 bg-zinc-950 flex items-center justify-center group/art border border-zinc-200/80 dark:border-white/5">
          {/* Cover Gambar YouTube HD */}
          <img
            src={thumbnailUrl}
            alt={currentTrack.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isPlaying ? 'scale-105 brightness-95' : 'scale-100 brightness-85'
            }`}
          />

          {/* Gradien Overlay Halus */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Vinyl Disc Icon Overlay saat Berputar */}
          <div className="absolute top-3 right-3 pointer-events-none">
            <div
              className={`p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              <Disc className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Audio Waveform Bars (Animasi Real-time saat Lagu Diputar) */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-1 pointer-events-none">
            <div className="flex items-end gap-1 h-7">
              {[40, 75, 100, 60, 85, 45, 95, 65, 80, 50, 90, 70].map((h, i) => (
                <span
                  key={i}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * ((i % 3) + 1)) % 100)}%` : '18%',
                    transition: 'height 0.22s ease-in-out',
                    animation: isPlaying
                      ? `waveBarBounce 0.${6 + (i % 5)}s ease-in-out infinite alternate`
                      : 'none',
                  }}
                  className="w-1 rounded-full bg-blue-400 dark:bg-blue-400"
                />
              ))}
            </div>

            {/* Tombol Tonton Resmi di YouTube */}
            <a
              href={`https://www.youtube.com/watch?v=${currentTrack.id}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka di YouTube"
              className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 hover:text-white bg-black/50 hover:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 transition-colors pointer-events-auto no-underline"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 3. Track Info (Judul, Penyanyi & Kanji) */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-bold text-lg sm:text-xl tracking-tight text-zinc-950 dark:text-white truncate">
              {currentTrack.title}
            </h3>
            {currentTrack.jp && (
              <span className="shrink-0 text-xs font-sans text-zinc-400 dark:text-zinc-500">
                {currentTrack.jp}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 truncate mt-0.5">
            {currentTrack.artist}
          </p>
        </div>

        {/* 4. Seek Scrubber Bar & Timestamps */}
        <div className="mb-5">
          <div className="relative group/scrub py-1.5 flex items-center">
            {/* Background Track */}
            <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
              {/* Progress Active Bar */}
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-150 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>

            {/* Native Input Range untuk Scrubbing Fleksibel */}
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

          {/* Elapsed & Total Duration Timestamps */}
          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{isBuffering ? 'Memuat...' : formatTime(duration)}</span>
          </div>
        </div>

        {/* 5. Main Controls Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Tombol Acak (Shuffle) */}
          <button
            type="button"
            onClick={() => setIsShuffle(!isShuffle)}
            aria-label={isShuffle ? 'Matikan acak lagu' : 'Nyalakan acak lagu'}
            title={isShuffle ? 'Acak: Aktif' : 'Acak: Mati'}
            className={`p-2 rounded-xl transition-all cursor-pointer focus:outline-none ${
              isShuffle
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Tombol Lagu Sebelumnya */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Lagu sebelumnya"
            title="Lagu Sebelumnya"
            className="p-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer focus:outline-none active:scale-90"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Tombol Utama Play / Pause */}
          <motion.button
            type="button"
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            aria-label={isPlaying ? 'Jeda pemutaran musik' : 'Putar musik'}
            title={isPlaying ? 'Jeda' : 'Putar'}
            className="w-14 h-14 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer focus:outline-none"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </motion.button>

          {/* Tombol Lagu Berikutnya */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Lagu berikutnya"
            title="Lagu Berikutnya"
            className="p-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer focus:outline-none active:scale-90"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {/* Tombol Ulangi (Loop) */}
          <button
            type="button"
            onClick={() => setIsLoop(!isLoop)}
            aria-label={isLoop ? 'Matikan ulang lagu' : 'Ulangi lagu ini'}
            title={isLoop ? 'Ulangi: Aktif' : 'Ulangi: Mati'}
            className={`p-2 rounded-xl transition-all cursor-pointer focus:outline-none ${
              isLoop
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* 6. Volume Control Slider */}
        <div className="mt-4 pt-3 border-t border-zinc-200/70 dark:border-white/5 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-500" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>

          <div className="flex-1 max-w-[130px] sm:max-w-[160px] flex items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume audio"
              className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
            />
          </div>
        </div>

        {/* 7. Collapsible Playlist Drawer (Menampilkan 16 Lagu Pilihan) */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-4 pt-4 border-t border-zinc-200/80 dark:border-white/10"
            >
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-zinc-500 dark:text-zinc-400">DAFTAR PUTAR (16)</span>
                <span className="text-blue-600 dark:text-blue-400 font-sans text-[11px]">
                  Pilih lagu untuk memutar
                </span>
              </div>

              <div className="max-h-52 overflow-y-auto space-y-1 pr-1 font-sans text-xs scrollbar-thin">
                {PLAYLIST.map((track, idx) => {
                  const isCurrent = idx === currentIndex
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => loadTrackByIndex(idx, true)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer focus:outline-none ${
                        isCurrent
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 w-5">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="truncate">
                          <p className="truncate text-xs font-medium">{track.title}</p>
                          <p className="truncate text-[10.5px] text-zinc-500 dark:text-zinc-400">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      {isCurrent && isPlaying && (
                        <div className="flex items-end gap-0.5 h-3 shrink-0 ml-2">
                          <span className="w-0.5 h-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                          <span className="w-0.5 h-2/3 bg-blue-600 dark:bg-blue-400 animate-pulse delay-75" />
                          <span className="w-0.5 h-4/5 bg-blue-600 dark:bg-blue-400 animate-pulse delay-150" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
