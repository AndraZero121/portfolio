import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimate } from 'motion/react'
import { useLenis } from 'lenis/react'
import {
  ArrowUpRight,
  Sun,
  Moon,
} from 'lucide-react'
import { getLocale, setLocale } from '#/paraglide/runtime'

// Flag SVGs
const FlagUK = ({ className }: { className?: string }) => (
  <svg className={className || 'w-5 h-3.5'} viewBox="0 0 60 30">
    <clipPath id="flag-uk-clip">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="flag-uk-subclip">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#flag-uk-clip)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag-uk-subclip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
)

const FlagID = ({ className }: { className?: string }) => (
  <svg className={className || 'w-5 h-3.5'} viewBox="0 0 3 2">
    <rect width="3" height="1" y="0" fill="#E70011" />
    <rect width="3" height="1" y="1" fill="#FFFFFF" />
  </svg>
)

const FlagJP = ({ className }: { className?: string }) => (
  <svg className={className || 'w-5 h-3.5'} viewBox="0 0 3 2">
    <rect width="3" height="2" fill="#FFFFFF" />
    <circle cx="1.5" cy="1" r="0.6" fill="#BC002D" />
  </svg>
)

const availableLanguages = [
  { code: 'en', name: 'English', flag: FlagUK },
  { code: 'id', name: 'Bahasa Indonesia', flag: FlagID },
  { code: 'ja', name: '日本語', flag: FlagJP },
]

// Kolom Hujan Glif Jepang (Hiragana & Katakana) dengan animasi Motion
// Kolom Hujan Glif Jepang (Hiragana, Katakana & Aksen Kanji Air/Alam) yang Mengalir Dinamis seperti Air Hujan
const KANA_RAIN_STREAMS = [
  {
    chars: ['雨', '水', '滴', 'ア', 'ン', 'ド', 'ラ', 'シ', 'ス', 'テ', 'ム', '雫'],
    speed: 4.8,
    delay: 1.2,
    right: '3%',
    size: 'text-xs',
    baseOpacity: 0.85,
  },
  {
    chars: ['デ', 'ザ', 'イ', 'ン', 'と', 'コ', 'ー', 'ド', 'の', '調', '和', '蒼'],
    speed: 6.2,
    delay: 3.7,
    right: '8%',
    size: 'text-[11px]',
    baseOpacity: 0.65,
  },
  {
    chars: ['み', 'ず', 'の', 'こ', 'と', 'ば', '清', '涼', '透', '明', '感'],
    speed: 4.2,
    delay: 0.5,
    right: '13%',
    size: 'text-xs',
    baseOpacity: 0.9,
  },
  {
    chars: ['ク', 'リ', 'エ', 'イ', 'テ', 'ィ', 'ブ', 'な', '道', '創', '造'],
    speed: 7.5,
    delay: 4.8,
    right: '18%',
    size: 'text-[10px]',
    baseOpacity: 0.5,
  },
  {
    chars: ['ゆ', 'め', 'ト', 'キ', 'ョ', 'ウ', 'ひ', 'か', 'り', 'ネ', 'オ', 'ン'],
    speed: 5.1,
    delay: 2.1,
    right: '24%',
    size: 'text-xs',
    baseOpacity: 0.8,
  },
  {
    chars: ['静', '寂', 'の', '中', 'に', 'あ', 'る', '力', '強', 'さ', '動'],
    speed: 4.5,
    delay: 1.8,
    right: '30%',
    size: 'text-xs',
    baseOpacity: 0.88,
  },
  {
    chars: ['次', '世', '代', 'の', 'ウ', 'ェ', 'ブ', '経', '験', '探', '究'],
    speed: 7.0,
    delay: 3.2,
    right: '36%',
    size: 'text-[10px]',
    baseOpacity: 0.55,
  },
  {
    chars: ['あ', 'め', 'し', 'ず', 'く', 'な', 'が', 'れ', 'る', '水', '滴'],
    speed: 4.0,
    delay: 2.8,
    right: '42%',
    size: 'text-xs sm:text-sm',
    baseOpacity: 0.95,
  },
  {
    chars: ['モ', 'ー', 'シ', 'ョ', 'ン', 'の', '息', 'づ', 'か', 'い', '生'],
    speed: 5.6,
    delay: 1.4,
    right: '48%',
    size: 'text-xs',
    baseOpacity: 0.82,
  },
  {
    chars: ['透', 'き', '通', 'る', '知', '性', 'と', '感', '性', '雫', '雨'],
    speed: 4.4,
    delay: 0.4,
    right: '54%',
    size: 'text-xs sm:text-sm',
    baseOpacity: 0.9,
  },
]

function FallingKanaRain() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        contain: 'strict',
      }}
    >
      {KANA_RAIN_STREAMS.map((col, idx) => {
        const lastIdx = col.chars.length - 1

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              right: col.right,
              top: 0,
              animation: `kanaRainFall ${col.speed}s linear -${col.delay}s infinite`,
              willChange: 'transform',
            }}
            className={`flex flex-col items-center gap-1.5 sm:gap-2 font-mono font-medium tracking-widest ${col.size}`}
          >
            {col.chars.map((char, cIdx) => {
              const isHead = cIdx === lastIdx
              const progress = cIdx / lastIdx
              const charOpacity = isHead
                ? 1
                : 0.05 + Math.pow(progress, 1.8) * 0.72 * col.baseOpacity

              return (
                <span
                  key={cIdx}
                  style={{
                    opacity: charOpacity,
                  }}
                  className={`inline-block select-none transition-opacity ${
                    isHead
                      ? 'text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-110'
                      : 'text-zinc-300'
                  }`}
                >
                  {char}
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// Social Media Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-4 h-4 fill-current'} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-4 h-4 fill-current'} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-4 h-4 fill-current'} viewBox="0 0 24 24">
    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-4 h-4 fill-current'} viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-4 h-4 fill-current'} viewBox="0 0 24 24">
    <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(() => {
    try {
      return (getLocale() as string) || 'en'
    } catch {
      return 'en'
    }
  })
  const [brandScope, animateBrand] = useAnimate()
  const lenis = useLenis()

  // Highlight mewah menyamping: bergerak halus dan standar, diam di kanan saat lepas, datang lagi dari kiri saat dihover kembali
  const handleBrandHover = () => {
    animateBrand(
      '.brand-shimmer',
      {
        x: ['-130%', '320%'],
        opacity: [0, 1, 1, 0],
      },
      {
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
      }
    )
  }

  // Inisialisasi tema saat pertama kali render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setIsDark(initialDark)
    if (initialDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const setAppTheme = (dark: boolean) => {
    setIsDark(dark)
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Tutup menu dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Cegah scroll saat overlay menu terbuka (terintegrasi dengan Lenis)
  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
        lenis?.start()
      }
    }
  }, [isOpen, lenis])

  // Menu items: Minimalis, angka Jepang autentik (〇一, 〇二, dst), karakter watermark unik
  const menuItems = [
    { number: '一', label: 'HOME', jp: 'ホーム', watermark: '始', href: '#home' },
    { number: '二', label: 'ABOUT', jp: '概要', watermark: '意', href: '#about' },
    { number: '三', label: 'WORKS', jp: '実績', watermark: '作', href: '#projects' },
    { number: '四', label: 'STACK', jp: '技術', watermark: '技', href: '#skills' },
    { number: '五', label: 'EXPERIENCE', jp: '経歴', watermark: '歴', href: '#experience' },
    { number: '六', label: 'CONTACT', jp: '連絡', watermark: '通', href: '#contact' },
  ]

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/AndraZero121', icon: GithubIcon },
    { label: 'Instagram', href: 'https://instagram.com/andrazero121', icon: InstagramIcon },
    { label: 'Facebook', href: 'https://facebook.com/andrazero121', icon: FacebookIcon },
    { label: 'X', href: 'https://x.com/novahoshizora', icon: XIcon },
    { label: 'YouTube', href: 'https://youtube.com/@AndraZero121', icon: YoutubeIcon },
  ]

  const handleLinkClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('#')) {
      if (lenis) {
        lenis.scrollTo(href, {
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  const activeWatermark = hoveredIndex !== null ? menuItems[hoveredIndex].watermark : '案'
  // Warna nama brand: putih saat menu terbuka ATAU saat dark mode; hitam saat keluar menu di light mode
  const isBrandWhite = isOpen || isDark

  return (
    <>
      {/* Brand Header: Menempel di atas hero section (stick / anchor ke hero section) */}
      <header
        className={`${
          isOpen ? 'fixed z-50' : 'absolute z-40'
        } top-0 left-0 right-0 pointer-events-none transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-between">
          {/* Logo / Brand di Kiri Atas dengan Animasi Highlight Menyamping Modern */}
          <a
            href="#home"
            onClick={(e) => {
              if (isOpen) {
                e.preventDefault()
                handleLinkClick('#home')
              }
            }}
            onMouseEnter={handleBrandHover}
            className="group/brand pointer-events-auto flex items-center gap-3 no-underline select-none cursor-pointer"
          >
            {/* Logo Image langsung tanpa outline/border apapun */}
            <img
              src="/logoandranew.png"
              alt="Logo Andra"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-300 group-hover/brand:scale-105"
            />

            {/* Container Teks ANDRA / アンドラ dengan Animasi Highlight Mewah Menyamping */}
            <div
              ref={brandScope}
              className="relative overflow-hidden flex items-baseline gap-2 py-0.5 px-1.5 rounded"
            >
              <span
                className={`font-bold tracking-tight text-base sm:text-lg select-none transition-colors duration-300 ${
                  isBrandWhite ? '!text-white' : '!text-zinc-950'
                }`}
                style={{ color: isBrandWhite ? '#ffffff' : '#09090b' }}
              >
                ANDRA
              </span>
              <span
                className={`text-xs sm:text-sm font-normal font-sans tracking-wide select-none transition-colors duration-300 ${
                  isBrandWhite
                    ? 'text-zinc-400 group-hover/brand:text-zinc-200'
                    : 'text-zinc-500 group-hover/brand:text-zinc-800'
                }`}
              >
                / アンドラ
              </span>

              {/* Berkas Cahaya Mewah (Luxury Specular Shimmer Beam) - Sweep satu arah, tidak berbalik saat mouse lepas */}
              <div
                className={`brand-shimmer absolute inset-y-0 w-28 pointer-events-none -skew-x-12 opacity-0 ${
                  isBrandWhite
                    ? 'bg-gradient-to-r from-transparent via-white/10 via-35% via-white/45 via-50% via-white/10 via-65% to-transparent'
                    : 'bg-gradient-to-r from-transparent via-black/5 via-35% via-white/60 via-50% via-black/5 via-65% to-transparent'
                }`}
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Hairline Specular Glint Core */}
                <div
                  className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 ${
                    isBrandWhite
                      ? 'bg-white/95 shadow-[0_0_10px_rgba(255,255,255,0.95)]'
                      : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  }`}
                />
              </div>
            </div>
          </a>
        </div>
      </header>

      {/* Floating Sidebar Menu Button: Tetap fixed di pojok kanan atas sepanjang scroll halaman */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-end">
          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={isOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className={`pointer-events-auto group relative p-2 focus:outline-none focus:ring-0 outline-none border-0 cursor-pointer transition-colors duration-300 select-none ${
              isOpen
                ? 'text-white hover:text-red-400'
                : 'text-zinc-950 dark:text-white hover:text-blue-500'
            }`}
          >
            {/* Ikon 3 Garis dengan Animasi Morphing & 90° Spin Halus pada Tombol X saat Hover */}
            <div
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              className={`w-10 sm:w-11 h-6 flex flex-col justify-between items-center relative transition-transform duration-500 ${
                isOpen ? 'group-hover:rotate-90 group-hover:scale-110' : ''
              }`}
            >
              <span
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                className={`block h-[2px] w-full bg-current rounded-full transition-all duration-400 ${
                  isOpen
                    ? 'rotate-45 translate-y-[11px] group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.7)]'
                    : 'group-hover:translate-x-1.5'
                }`}
              />
              <span
                className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'opacity-0 scale-x-0'
                    : 'group-hover:-translate-x-1.5'
                }`}
              />
              <span
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                className={`block h-[2px] w-full bg-current rounded-full transition-all duration-400 ${
                  isOpen
                    ? '-rotate-45 -translate-y-[11px] group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.7)]'
                    : 'group-hover:translate-x-1.5'
                }`}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Fullscreen Menu Overlay - Modern, Sleek & Interaktif */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi Menu"
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#08080a]/98 text-white overflow-y-auto overscroll-contain selection:bg-red-500 selection:text-white"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Area Kanan: Teks Hiragana & Katakana Berjatuhan (Falling Kana Rain) + Kanji Watermark Besar (Fixed Background) */}
            <div className="fixed right-0 top-0 bottom-0 w-full md:w-3/5 pointer-events-none select-none overflow-hidden z-0">
              {/* Animasi Motion: Glif Hiragana & Katakana Berjatuhan secara Halus */}
              <FallingKanaRain />

              {/* Dinamis Kanji Watermark di Background yang Berubah Sesuai Hover */}
              <div className="absolute right-8 sm:right-20 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWatermark}
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 0.045, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="font-serif font-black text-[28vw] sm:text-[22vw] leading-none text-white block select-none"
                  >
                    {activeWatermark}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Inner Content Wrapper: min-h-full menjamin penataan vertikal yang leluasa saat layar tinggi dan scroll penuh tanpa terpotong saat layar pendek */}
            <div className="min-h-full w-full flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-24 sm:pt-28 pb-8 relative z-10">
              {/* Menu Links Utama: Interaktif dengan Motion Spring & Hover Elevation */}
              <div className="max-w-5xl w-full mx-auto my-auto py-6 sm:py-10">
                <motion.ul
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
                  },
                  exit: {
                    opacity: 0,
                    transition: { staggerChildren: 0.03, staggerDirection: -1 },
                  },
                }}
                className="flex flex-col space-y-2 sm:space-y-3"
              >
                {menuItems.map((item, index) => {
                  const isHovered = hoveredIndex === index
                  const isOtherHovered = hoveredIndex !== null && !isHovered

                  return (
                    <motion.li
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, y: 22 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        },
                        exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="relative"
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkClick(item.href)
                        }}
                        className={`group relative flex items-center justify-between py-2 sm:py-3 transition-opacity duration-300 no-underline ${
                          isOtherHovered ? 'opacity-25' : 'opacity-100'
                        }`}
                      >
                        {/* Kiri: Nomor Indeks, Label Menu, Kanji Jepang */}
                        <div className="flex items-baseline gap-4 sm:gap-8">
                          {/* Nomor Indeks Angka Jepang (〇一, 〇二, dst) */}
                          <span
                            className={`font-sans font-medium tracking-wider text-xs sm:text-sm transition-colors duration-200 select-none ${
                              isHovered ? 'text-white font-bold' : 'text-zinc-600'
                            }`}
                          >
                            {item.number}
                          </span>

                          <motion.div
                            animate={{ x: isHovered ? 14 : 0 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                            className="flex items-baseline gap-4 sm:gap-6"
                          >
                            {/* Label Menu Utama: Putih Murni Tanpa Biru */}
                            <span
                              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white transition-all duration-200 ${
                                isHovered
                                  ? 'opacity-100 drop-shadow-[0_0_24px_rgba(255,255,255,0.3)]'
                                  : 'opacity-85'
                              }`}
                            >
                              {item.label}
                            </span>

                            {/* Aksen Kanji Jepang */}
                            <span
                              className={`text-xs sm:text-base font-normal tracking-wider transition-colors duration-200 ${
                                isHovered ? 'text-zinc-300' : 'text-zinc-600'
                              }`}
                            >
                              {item.jp}
                            </span>
                          </motion.div>
                        </div>

                        {/* Kanan: Panah Interaktif Putih Beranimasi Motion Diagonal Halus */}
                        <motion.div
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? [ -10, 2, 0 ] : -10,
                            y: isHovered ? [ 10, -2, 0 ] : 10,
                            scale: isHovered ? 1.05 : 0.6,
                          }}
                          transition={{
                            duration: 0.28,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="text-white flex items-center justify-center"
                        >
                          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </motion.div>
                      </a>

                      {/* Hairline Border Bawah: Putih ke Hitam/Transparan */}
                      <div className="h-[1px] w-full bg-white/[0.06] relative overflow-hidden">
                        {isHovered && (
                          <motion.div
                            layoutId="menuHairline"
                            className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </div>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </div>

            {/* Bottom Controls Bar: Bersih, Frameless (Bendera, Ikon Tema, Email & Sosmed Putih Murni) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="max-w-5xl w-full mx-auto pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5 text-xs font-mono relative z-10"
            >
              {/* Kontrol Kiri: Bendera Bahasa (UK, ID, JP) & Ikon Mode Gelap/Terang Polos (Disembunyikan di Mobile) */}
              <div className="hidden sm:flex items-center gap-4">
                {/* Bendera Bahasa Saja: Inggris, Indonesia, Jepang */}
                <div className="flex items-center gap-2.5">
                  {availableLanguages.map((lang) => {
                    const isActive = lang.code === selectedLocale
                    const FlagComponent = lang.flag

                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setSelectedLocale(lang.code)
                          try {
                            setLocale(lang.code as any)
                          } catch {
                            // Fallback jika locale paraglide sedang di-resolve
                          }
                        }}
                        aria-label={`Switch language to ${lang.name}`}
                        title={lang.name}
                        className={`transition-all duration-200 cursor-pointer p-0.5 rounded focus:outline-none ${
                          isActive
                            ? 'scale-110 opacity-100 ring-1 ring-white/60 shadow-xs'
                            : 'opacity-40 hover:opacity-90 hover:scale-105'
                        }`}
                      >
                        <FlagComponent className="w-5 h-3.5 rounded-[2px] block shadow-xs" />
                      </button>
                    )
                  })}
                </div>

                <span className="text-zinc-800">•</span>

                {/* Tombol Mode Gelap/Terang: Ikon Polos Tanpa Border/Kapsul */}
                <button
                  type="button"
                  onClick={() => setAppTheme(!isDark)}
                  aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
                  className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
                  title={isDark ? 'Mode Terang' : 'Mode Gelap'}
                >
                  <motion.div
                    key={isDark ? 'dark' : 'light'}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-white hover:text-zinc-300 transition-colors" />
                    ) : (
                      <Moon className="w-4 h-4 text-white hover:text-zinc-300 transition-colors" />
                    )}
                  </motion.div>
                </button>
              </div>

              {/* Tautan Kontak Email & Sosmed Berwarna Putih Murni */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-5 text-white">
                <a
                  href="mailto:diandraanursasyabandira@gmail.com"
                  className="!text-white hover:!opacity-80 transition-opacity no-underline font-mono text-xs select-all"
                  style={{ color: '#ffffff' }}
                >
                  diandraanursasyabandira@gmail.com
                </a>

                <span className="text-zinc-700 hidden sm:inline-block">•</span>

                {/* 5 Ikon Sosmed: GitHub, Instagram, Facebook, X, YouTube dalam warna Putih */}
                <div className="flex items-center gap-3.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        title={social.label}
                        className="!text-white hover:!opacity-75 transition-all hover:scale-110 flex items-center justify-center"
                        style={{ color: '#ffffff' }}
                      >
                        <Icon className="w-4 h-4 !text-white" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
