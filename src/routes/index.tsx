import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })

// Koordinat Bintang Malam Jepang di Mode Gelap (Twinkling Night Sky)
const NIGHT_STARS = [
  { x: 120, y: 140, r: 1.4, dur: 3.2, delay: 0.1 },
  { x: 190, y: 80, r: 1.8, dur: 4.1, delay: 1.5 },
  { x: 260, y: 190, r: 1.2, dur: 2.8, delay: 0.8 },
  { x: 340, y: 110, r: 1.6, dur: 3.7, delay: 2.1 },
  { x: 420, y: 60, r: 1.3, dur: 4.5, delay: 0.4 },
  { x: 510, y: 160, r: 1.5, dur: 3.0, delay: 1.9 },
  { x: 600, y: 90, r: 1.2, dur: 3.9, delay: 0.6 },
  { x: 670, y: 140, r: 1.7, dur: 4.2, delay: 2.4 },
  { x: 770, y: 80, r: 1.3, dur: 3.4, delay: 1.1 },
  { x: 840, y: 150, r: 1.6, dur: 4.6, delay: 0.3 },
  { x: 920, y: 70, r: 1.2, dur: 2.9, delay: 1.7 },
  { x: 1010, y: 120, r: 1.8, dur: 3.8, delay: 2.0 },
  { x: 1090, y: 65, r: 1.4, dur: 4.3, delay: 0.9 },
  { x: 1180, y: 160, r: 1.5, dur: 3.1, delay: 1.3 },
  { x: 1260, y: 95, r: 1.7, dur: 4.0, delay: 2.6 },
  { x: 1330, y: 150, r: 1.2, dur: 3.5, delay: 0.5 },
  { x: 160, y: 240, r: 1.1, dur: 4.4, delay: 2.2 },
  { x: 280, y: 260, r: 1.4, dur: 3.6, delay: 1.0 },
  { x: 1140, y: 240, r: 1.3, dur: 3.3, delay: 0.7 },
  { x: 1280, y: 220, r: 1.6, dur: 4.2, delay: 1.8 },
]

// Pemandangan Lanskap Tradisional Jepang Bersih Tanpa Kanji:
// Siang: Soft watercolor blur | Malam: Bintang-bintang bercahaya & Bintang Jatuh (Shooting Stars)
function JapaneseLandscapeScenery() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-60 blur-[2px] sm:blur-[2.5px] dark:blur-none dark:opacity-45 transition-all duration-700"
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      >
        <defs>
          {/* Pendaran Cahaya Matahari Merah (Lembut di Siang Hari, Berkilau di Malam Hari) */}
          <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E11D48" stopOpacity="0.22" className="dark:stop-opacity-40" />
            <stop offset="50%" stopColor="#DC2626" stopOpacity="0.06" className="dark:stop-opacity-15" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Gradien Bintang Jatuh (Shooting Star Trails) */}
          <linearGradient id="shootingStarGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shootingStarGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </linearGradient>

          {/* Gradien Lautan */}
          <linearGradient id="seaGrad" x1="0" y1="560" x2="0" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.08" className="dark:stop-color-[#090d16] dark:stop-opacity-40" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" className="dark:stop-color-[#04060a] dark:stop-opacity-95" />
          </linearGradient>

          {/* Gradien Batuan Karang Pesisir */}
          <linearGradient id="rockGrad" x1="300" y1="440" x2="300" y2="680" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#27272a" stopOpacity="0.45" className="dark:stop-color-[#18181b] dark:stop-opacity-85" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0.85" className="dark:stop-color-[#09090b] dark:stop-opacity-95" />
          </linearGradient>

          {/* Gradien Pilar Torii (Efek Silinder Kayu Berpernis) */}
          <linearGradient id="pillarGradLeft" x1="590" y1="398" x2="620" y2="398" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="40%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
          <linearGradient id="pillarGradRight" x1="820" y1="398" x2="850" y2="398" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="40%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>

        {/* 1. LANGIT MALAM: BINTANG-BINTANG & BINTANG JATUH (Khusus Mode Gelap) */}
        <g className="hidden dark:block">
          {/* Bintang-Bintang Berkedip Halus (Twinkling Night Stars - GPU CSS Animation) */}
          {NIGHT_STARS.map((star, idx) => (
            <circle
              key={idx}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#ffffff"
              style={{
                animation: `starTwinkle ${star.dur}s ease-in-out ${star.delay}s infinite`,
                transformOrigin: `${star.x}px ${star.y}px`,
              }}
            />
          ))}

          {/* Bintang Jatuh 1: Meluncur dari Kanan Atas ke Arah Kiri Bawah (GPU Composited) */}
          <g
            style={{
              animation: 'shootingStarFly1 7.2s ease-out infinite',
              willChange: 'transform',
            }}
          >
            <line
              x1="1240"
              y1="60"
              x2="1310"
              y2="34"
              stroke="url(#shootingStarGrad1)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="1240" cy="60" r="2.2" fill="#ffffff" />
          </g>

          {/* Bintang Jatuh 2: Meluncur di Sisi Langit Kiri dengan Ritme Berbeda (GPU Composited) */}
          <g
            style={{
              animation: 'shootingStarFly2 9.5s ease-out 3.5s infinite',
              willChange: 'transform',
            }}
          >
            <line
              x1="660"
              y1="40"
              x2="725"
              y2="16"
              stroke="url(#shootingStarGrad2)"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <circle cx="660" cy="40" r="1.9" fill="#ffffff" />
          </g>
        </g>

        {/* 2. MATAHARI MERAH JEPANG (The Radiant Japanese Sun Disc) */}
        {/* Pendaran Cahaya Luar Matahari */}
        <circle cx="720" cy="390" r="240" fill="url(#sunAura)" />

        {/* Piringan Utama Matahari Merah (Merah Lembut di Siang Hari, Berkilau Tegas di Malam Hari - GPU CSS Pulse) */}
        <circle
          cx="720"
          cy="390"
          r="150"
          className="fill-red-500/35 dark:fill-red-600/90 transition-colors duration-500"
          style={{
            animation: 'sunGlowPulse 8s ease-in-out infinite',
            transformOrigin: '720px 390px',
          }}
        />

        {/* 2. AWAN TRADISIONAL JEPANG (Stylized Japanese Kumo Clouds - GPU Composited) */}
        {/* Awan Kiri Atas Melayang */}
        <g
          style={{
            animation: 'cloudDriftLeft 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        >
          <path
            d="M 180 320 C 180 290, 230 280, 260 300 C 280 270, 350 270, 380 300 C 410 285, 460 305, 460 335 C 460 355, 420 370, 380 365 L 200 365 C 180 355, 180 335, 180 320 Z"
            className="fill-zinc-200/60 dark:fill-zinc-800/40"
          />
          <path
            d="M 160 355 L 500 355"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="text-zinc-400/40 dark:text-zinc-600/30"
          />
        </g>

        {/* Awan Kanan Menyeberangi Langit */}
        <g
          style={{
            animation: 'cloudDriftRight 22s ease-in-out infinite',
            willChange: 'transform',
          }}
        >
          <path
            d="M 980 350 C 980 320, 1030 310, 1060 330 C 1090 305, 1160 305, 1190 335 C 1220 320, 1270 340, 1270 370 C 1270 390, 1230 405, 1190 400 L 1000 400 C 980 390, 980 370, 980 350 Z"
            className="fill-zinc-200/60 dark:fill-zinc-800/40"
          />
          <path
            d="M 940 390 L 1310 390"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            className="text-zinc-400/40 dark:text-zinc-600/30"
          />
        </g>

        {/* 3. BEBATUAN BESAR PESISIR (Meoto Iwa - Karang Pasangan di Sisi Kiri) */}
        {/* Karang Besar Utama */}
        <g>
          <polygon
            points="210,680 260,510 310,440 355,475 400,530 430,680"
            className="fill-zinc-300/80 dark:fill-[#121217] stroke-zinc-400/40 dark:stroke-zinc-700/50"
            strokeWidth="1.5"
          />
          <path
            d="M 310 440 L 335 525 L 400 530 M 260 510 L 335 525 L 310 680"
            className="stroke-zinc-400/30 dark:stroke-zinc-700/40"
            strokeWidth="1"
          />
        </g>

        {/* Karang Pendamping */}
        <g>
          <polygon
            points="435,680 460,535 490,498 520,530 545,680"
            className="fill-zinc-300/80 dark:fill-[#121217] stroke-zinc-400/40 dark:stroke-zinc-700/50"
            strokeWidth="1.5"
          />
          <path
            d="M 490 498 L 485 570 L 520 530 M 460 535 L 485 570 L 495 680"
            className="stroke-zinc-400/30 dark:stroke-zinc-700/40"
            strokeWidth="1"
          />
        </g>

        {/* Tali Suci Shimenawa yang Menghubungkan Batuan Karang */}
        <path
          d="M 310 445 Q 400 518 490 500"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          className="text-amber-600/70 dark:text-amber-500/60"
        />
        <path
          d="M 310 449 Q 400 522 490 504"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-amber-700/50 dark:text-amber-400/40"
        />

        {/* 4. GERBANG TORII JEPANG YANG LEBIH BESAR & MEGAH (Prominent Central Torii Gate) */}
        <g className="opacity-40 dark:opacity-95 transition-opacity duration-500">
          {/* Kasagi: Palang Lengkung Paling Atas Torii (Besar, megah dengan ujung atap hitam) */}
          <path
            d="M 480 372 Q 720 338 960 372 L 950 394 Q 720 364 490 394 Z"
            className="fill-zinc-900 dark:fill-zinc-950 stroke-red-600 dark:stroke-red-500"
            strokeWidth="2"
          />

          {/* Shimaki: Palang Lurus Kedua Tepat di Bawah Kasagi */}
          <rect
            x="520"
            y="394"
            width="400"
            height="18"
            rx="1"
            className="fill-red-600 dark:fill-red-600 stroke-zinc-900 dark:stroke-zinc-950"
            strokeWidth="1.5"
          />

          {/* Gakuzuka: Plakat Tengah Bersih (Tanpa Teks Kanji) */}
          <rect
            x="706"
            y="394"
            width="28"
            height="76"
            className="fill-zinc-950 stroke-zinc-400/80 dark:stroke-zinc-600"
            strokeWidth="1.5"
          />
          <rect
            x="711"
            y="400"
            width="18"
            height="64"
            className="fill-zinc-900 dark:fill-zinc-900 stroke-amber-500/50"
            strokeWidth="1"
          />

          {/* Nuki: Palang Pengikat Horisontal Antar Pilar */}
          <rect
            x="535"
            y="470"
            width="370"
            height="18"
            rx="1"
            className="fill-red-600 dark:fill-red-600 stroke-zinc-950"
            strokeWidth="1.5"
          />

          {/* Kusabi: Baji Pengunci Samping di Luar Pilar */}
          <polygon points="570,466 576,466 573,492" className="fill-zinc-950" />
          <polygon points="864,466 870,466 867,492" className="fill-zinc-950" />

          {/* Pilar Kiri (Hashira - Tebal & Kokoh) */}
          <rect
            x="590"
            y="394"
            width="28"
            height="228"
            fill="url(#pillarGradLeft)"
            className="stroke-zinc-950/60 dark:stroke-black"
            strokeWidth="1.5"
          />
          {/* Garis Shading Silinder Pilar Kiri */}
          <line x1="594" y1="394" x2="594" y2="622" className="stroke-white/20" strokeWidth="1.5" />
          <line x1="614" y1="394" x2="614" y2="622" className="stroke-black/30 dark:stroke-black/70" strokeWidth="2" />
          {/* Pondasi Kaki Batu Kiri (Daiishi) */}
          <rect
            x="582"
            y="616"
            width="44"
            height="18"
            rx="2"
            className="fill-zinc-800 dark:fill-zinc-900 stroke-zinc-950"
            strokeWidth="1.5"
          />

          {/* Pilar Kanan (Hashira - Tebal & Kokoh) */}
          <rect
            x="822"
            y="394"
            width="28"
            height="228"
            fill="url(#pillarGradRight)"
            className="stroke-zinc-950/60 dark:stroke-black"
            strokeWidth="1.5"
          />
          {/* Garis Shading Silinder Pilar Kanan */}
          <line x1="826" y1="394" x2="826" y2="622" className="stroke-white/20" strokeWidth="1.5" />
          <line x1="846" y1="394" x2="846" y2="622" className="stroke-black/30 dark:stroke-black/70" strokeWidth="2" />
          {/* Pondasi Kaki Batu Kanan (Daiishi) */}
          <rect
            x="814"
            y="616"
            width="44"
            height="18"
            rx="2"
            className="fill-zinc-800 dark:fill-zinc-900 stroke-zinc-950"
            strokeWidth="1.5"
          />

          {/* Pantulan Bayangan Merah Torii di Permukaan Air */}
          <path
            d="M 604 634 L 608 710 M 836 634 L 832 710"
            stroke="#DC2626"
            strokeWidth="3"
            strokeDasharray="4 6"
            opacity="0.35"
          />
        </g>

        {/* 5. LAUTAN DENGAN OMBAK SEIGAIHA & UKIYO-E BERSIH (Tanpa Teks Kanji) */}
        <g>
          {/* Lapisan Air Laut Dasar */}
          <rect x="0" y="580" width="1440" height="320" fill="url(#seaGrad)" />

          {/* Garis Horizon Lautan */}
          <line
            x1="0"
            y1="580"
            x2="1440"
            y2="580"
            className="stroke-zinc-400/40 dark:stroke-zinc-700/40"
            strokeWidth="1.5"
          />

          {/* Ombak Layer 1 (Midground Waves - GPU Composited) */}
          <path
            d="M 0 620 Q 90 605 180 620 T 360 620 T 540 620 T 720 620 T 900 620 T 1080 620 T 1260 620 T 1440 620"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-zinc-400/50 dark:text-zinc-600/50"
            style={{
              animation: 'waveSway1 6s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* Ombak Layer 2 (Crest Waves - GPU Composited) */}
          <path
            d="M 0 670 Q 120 650 240 670 T 480 670 T 720 670 T 960 670 T 1200 670 T 1440 670"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="16 8"
            className="text-zinc-500/40 dark:text-zinc-500/30"
            style={{
              animation: 'waveSway2 7s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* Ombak Foreground Layer 3 - GPU Composited */}
          <path
            d="M 0 740 Q 150 715 300 740 T 600 740 T 900 740 T 1200 740 T 1440 740"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-zinc-400/60 dark:text-zinc-700/60"
            style={{
              animation: 'waveSway1 8s ease-in-out infinite',
              willChange: 'transform',
            }}
          />
        </g>
      </svg>
    </div>
  )
}

// =============================================================================
// SECTION 2: ABOUT ME SECTION (Profil, Foto Mockup Bersih, Deskripsi, Read More & Roadmap)
// =============================================================================
interface RoadmapItem {
  year: string
  title: string
  description: React.ReactNode
  position: 'top' | 'bottom'
  isCurrentOrFuture?: boolean
  institution: {
    name: string
    url: string
    short: string
    logo?: string
  }
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    year: '2022 — 2023',
    title: 'First Code & Web',
    institution: {
      name: 'SMPN 35 Semarang',
      url: 'https://smpn35.semarangkota.go.id/',
      short: '35',
      logo: 'https://upload.wikimedia.org/wikipedia/id/3/37/Smpn_35_smrg.png?utm_source=id.wikipedia.org&utm_campaign=imageinfo&utm_content=original',
    },
    description: (
      <>
        Mulai koding pertama membuat landing page dengan{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          HTML, CSS, dan JavaScript
        </strong>{' '}
        saat masih bersekolah di{' '}
        <a
          href="https://smpn35.semarangkota.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-2 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>SMPN 35 Semarang</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60 inline" />
        </a>
        .
      </>
    ),
    position: 'top',
  },
  {
    year: '2024',
    title: 'SMK Palapa & Juara 3 LKS',
    institution: {
      name: 'SMK Palapa Semarang',
      url: 'https://smkpalapasemarang.sch.id',
      short: 'PLP',
      logo: 'https://smkpalapasemarang.sch.id/images/logo.jpg',
    },
    description: (
      <>
        Masuk jurusan RPL di{' '}
        <a
          href="https://smkpalapasemarang.sch.id"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-2 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>SMK Palapa Semarang</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60 inline" />
        </a>
        , mendalami dasar pemrograman,{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          PHP & Laravel
        </strong>
        , serta meraih{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          Juara 3 LKS
        </strong>{' '}
        di SMKN 8 Semarang.
      </>
    ),
    position: 'bottom',
  },
  {
    year: '2025',
    title: 'Crocodic & Novarsity',
    institution: {
      name: 'Crocodic Studio',
      url: 'https://crocodic.com',
      short: 'CRD',
      logo: 'https://crocodic.com/wp-content/uploads/2023/07/cropped-fav_icon_crocrocodic-2.png',
    },
    description: (
      <>
        Kelas Industri & magang di{' '}
        <a
          href="https://crocodic.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-2 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Crocodic</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60 inline" />
        </a>{' '}
        Tembalang, raih piagam{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          Bank Jateng Syariah
        </strong>
        , inisiasi Untrustnova, hingga mendirikan{' '}
        <a
          href="https://github.com/untrustnova"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-2 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Novarsity Digital Indonesia</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60 inline" />
        </a>
        .
      </>
    ),
    position: 'top',
  },
  {
    year: '2026',
    title: 'Lulusan Terbaik & Evaluasi',
    institution: {
      name: 'SMK Palapa Semarang',
      url: 'https://smkpalapasemarang.sch.id',
      short: 'PLP',
      logo: 'https://smkpalapasemarang.sch.id/images/logo.jpg',
    },
    description: (
      <>
        Lulus sebagai{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          Lulusan Terbaik
        </strong>{' '}
        dari{' '}
        <a
          href="https://smkpalapasemarang.sch.id"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-2 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>SMK Palapa</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60 inline" />
        </a>{' '}
        & Kelas Industri Crocodic, serta memetik banyak evaluasi dari ajang{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          LKS Terakhir
        </strong>
        .
      </>
    ),
    position: 'bottom',
  },
  {
    year: 'KEDEPANNYA',
    title: 'Continuous Growth',
    institution: {
      name: 'Novarsity Digital Indonesia',
      url: 'https://github.com/untrustnova',
      short: 'NDI',
      logo: 'https://avatars.githubusercontent.com/u/98293031?s=200&v=4',
    },
    description: (
      <>
        <span className="italic text-zinc-700 dark:text-zinc-300">
          &ldquo;I hope that I will become a better person next time :3&rdquo;
        </span>{' '}
        — bertekad terus berkembang sebagai{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          Backend Developer & DevOps Engineer
        </strong>{' '}
        di{' '}
        <a
          href="https://github.com/untrustnova"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-2 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Novarsity</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60 inline" />
        </a>
        .
      </>
    ),
    position: 'top',
    isCurrentOrFuture: true,
  },
]

function AboutMeSection() {
  return (
    <section
      id="about"
      className="relative z-10 w-full py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/30 transition-colors duration-500"
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Kicker / Subheading Monospace */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="h-[1px] w-8 sm:w-12 bg-blue-600 dark:bg-blue-400" />
          <span className="font-jetbrains text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
            // 02 . ABOUT ME / 概要
          </span>
        </div>

        {/* Grid 2 Kolom Asimetris Editorial - Selaras Sempurna dari Atas hingga Bawah */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* Kolom Kiri: Foto Profil Lebih Besar & Selaras Tinggi Penuh */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-stretch">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl transition-all duration-300">
              <img
                src="/aznew.jpg"
                alt="Diandra Anursa Syabandira"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Kolom Kanan: Narasi Diri, Riwayat Pendidikan & Tombol Read More di Dasar */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              {/* Heading Utama */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
                Hi, my name is{' '}
                <span className="font-fraunces italic font-medium text-blue-600 dark:text-blue-400">
                  Andra.
                </span>
              </h2>

              {/* Paragraf Narasi Sesuai Deskripsi Pengguna */}
              <div className="mt-5 sm:mt-6 space-y-3.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
                <p>
                  Namaku{' '}
                  <strong className="font-semibold text-zinc-950 dark:text-white">
                    Diandra Anursa Syabandira
                  </strong>
                  , biasa dipanggil{' '}
                  <strong className="font-semibold text-zinc-950 dark:text-white">
                    Andra
                  </strong>
                  , di dunia online/sosmed mereka mengenalku sebagai{' '}
                  <span className="px-2 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-jetbrains text-xs sm:text-sm font-semibold inline-block">
                    AndraZero121
                  </span>
                  . Aku adalah seorang Programmer di bidang Website khususnya di{' '}
                  <span className="font-semibold text-zinc-950 dark:text-white underline decoration-blue-500/50 decoration-2 underline-offset-4">
                    Backend Developer
                  </span>
                  , aku juga sedang mempelajari khususnya di bidang{' '}
                  <span className="font-semibold text-zinc-950 dark:text-white">
                    Infra dan DevOps
                  </span>{' '}
                  dengan lebih baik.
                </p>

                <p>
                  Aku adalah lulusan dari{' '}
                  <a
                    href="https://smkpalapasemarang.sch.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4 hover:decoration-blue-500 dark:hover:decoration-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group/smk"
                  >
                    <span>SMK Palapa Semarang</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/smk:opacity-100 group-hover/smk:translate-x-0.5 group-hover/smk:-translate-y-0.5 transition-transform" />
                  </a>{' '}
                  dan aku sangat minat terhadap sesuatu yang berhubungan dengan Hardware atau Software, itu yang membuatku menjadi seorang Developer.
                </p>

                <p>
                  Aku juga adalah seorang Founder di{' '}
                  <a
                    href="https://github.com/untrustnova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4 hover:decoration-blue-500 dark:hover:decoration-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group/novarsity"
                  >
                    <span>Novarsity Digital Indonesia</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/novarsity:opacity-100 group-hover/novarsity:translate-x-0.5 group-hover/novarsity:-translate-y-0.5 transition-transform" />
                  </a>{' '}
                  dan menjabat sebagai Backend Developer serta DevOps.
                </p>
              </div>
            </div>

            {/* Tombol Read More Menuju Halaman /about (Tepat Sejajar dengan Dasar Foto) */}
            <div className="mt-6 pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <a
                href="/about"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 no-underline"
              >
                <span>Read More</span>
                <span className="text-xs opacity-75 font-jetbrains">
                  / 詳細を見る
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ROADMAP / MILESTONES (Format Horizontal Persegi Panjang: ------------o----------o------------) */}
        <div className="mt-8 sm:mt-10">
          {/* Kontainer Horizontal Roadmap Persegi Panjang ke Kanan */}
          <div
            data-lenis-prevent
            data-lenis-prevent-horizontal
            className="w-full overflow-x-auto overscroll-x-contain py-4 select-none [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
          >
            <div className="w-[1140px] h-[330px] relative mx-auto">
              {/* Garis Poros Horizontal Pusat: ------------o----------o------------ */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-4 right-4 h-[2px] -translate-y-1/2 bg-gradient-to-r from-blue-500/20 via-zinc-300 dark:via-zinc-700 to-blue-500/20 pointer-events-none z-0"
              />

              {/* 5 Milestone Tersusun Selang-Seling (Interleaved: 3 Atas, 2 Bawah) Sesuai Sketsa */}
              {ROADMAP_ITEMS.map((item, idx) => {
                const isTop = item.position === 'top'
                const isFuture = item.isCurrentOrFuture
                const nodeX = [170, 370, 570, 770, 970][idx]

                return (
                  <div key={idx} className="group">
                    {/* Kartu Konten Milestone (Persegi Panjang Horisontal) */}
                    <div
                      style={{ left: `${nodeX}px` }}
                      className={`absolute -translate-x-1/2 w-[280px] h-[136px] z-10 ${
                        isTop ? 'bottom-[calc(50%+16px)]' : 'top-[calc(50%+16px)]'
                      }`}
                    >
                      <div
                        className={`w-full h-full p-3.5 rounded-2xl transition-all duration-300 border bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between group-hover:shadow-md ${
                          isFuture
                            ? 'border-blue-500/60 dark:border-blue-400/60 ring-1 ring-blue-500/30 bg-blue-50/20 dark:bg-blue-950/20'
                            : 'border-zinc-200/90 dark:border-zinc-800 group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50'
                        }`}
                      >
                        <div>
                          {/* Baris Atas: Badge Tahun di Kiri & Logo Bulat Instansi di Kanan */}
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-jetbrains text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded inline-block ${
                                isFuture
                                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400'
                              }`}
                            >
                              {item.year}
                            </span>

                            {/* Logo Bulat Instansi Terkait */}
                            <a
                              href={item.institution.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Kunjungi website resmi ${item.institution.name}`}
                              aria-label={`Website resmi ${item.institution.name}`}
                              onClick={(e) => e.stopPropagation()}
                              className="relative flex items-center justify-center w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-110 shadow-xs hover:shadow transition-all duration-200 group/inst shrink-0 overflow-hidden"
                            >
                              {item.institution.logo ? (
                                <img
                                  src={item.institution.logo}
                                  alt={item.institution.name}
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-contain p-0.5 rounded-full"
                                />
                              ) : (
                                <span className="font-jetbrains text-[10px] sm:text-[10.5px] font-bold text-zinc-700 dark:text-zinc-200 group-hover/inst:text-blue-600 dark:group-hover/inst:text-blue-400 transition-colors">
                                  {item.institution.short}
                                </span>
                              )}
                              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover/inst:opacity-100 transition-opacity shadow-xs">
                                <ExternalLink className="w-2 h-2" />
                              </span>
                            </a>
                          </div>

                          <h4 className="text-xs sm:text-[13px] font-bold tracking-tight text-zinc-950 dark:text-white mt-1.5 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h4>
                        </div>

                        <p className="text-[10.5px] sm:text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mt-1.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Stem Penghubung Vertikal */}
                    <div
                      style={{ left: `${nodeX}px` }}
                      className={`w-[2px] h-4 absolute -translate-x-1/2 transition-colors duration-300 z-10 ${
                        isTop ? 'bottom-1/2' : 'top-1/2'
                      } ${
                        isFuture
                          ? 'bg-blue-500 dark:bg-blue-400'
                          : 'bg-zinc-300 dark:bg-zinc-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-400'
                      }`}
                    />

                    {/* Titik Node 'o' di Sumbu Poros */}
                    <div
                      style={{ left: `${nodeX}px` }}
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-[2.5px] bg-white dark:bg-zinc-950 flex items-center justify-center transition-all duration-300 ${
                          isFuture
                            ? 'border-blue-600 dark:border-blue-400 scale-110 shadow-[0_0_12px_rgba(37,99,235,0.45)]'
                            : 'border-zinc-400 dark:border-zinc-600 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:scale-125'
                        }`}
                      >
                        <div
                          className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                            isFuture
                              ? 'bg-blue-600 dark:bg-blue-400'
                              : 'bg-transparent group-hover:bg-blue-600 dark:group-hover:bg-blue-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const lenis = useLenis()
  // Mode Switch Interaktif: 'ready' (AI Ready) vs 'included' (AI Included)
  const [aiMode, setAiMode] = useState<'ready' | 'included'>('ready')

  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-[#050507] text-zinc-950 dark:text-white transition-colors duration-500 selection:bg-blue-500 selection:text-white">
      {/* SECTION 1: HERO SECTION */}
      <section
        id="home"
        className="relative h-[100dvh] min-h-[100dvh] w-full flex flex-col justify-center items-center text-center overflow-hidden select-none"
      >
        {/* Background Lanskap Tradisional Jepang (Torii Besar, Matahari Merah, Lautan, Batuan Karang, Awan) */}
        <JapaneseLandscapeScenery />

        {/* Kontainer Utama Hero Section: Semua Rata Tengah (Center Aligned) */}
        <div className="relative z-10 max-w-5xl w-full mx-auto px-6 sm:px-10 flex flex-col justify-center items-center my-auto pt-16 sm:pt-20 pb-8">
          {/* Pencahayaan Latar Alami (Natural Morning Mist & Diffused Backlight - Khusus Light Mode) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center overflow-visible"
          >
            {/* Difusi Cahaya Putih Inti untuk Kontras Teks Maksimal Tanpa Mengorbankan Siluet Lanskap (Zero GPU Filter Overhead) */}
            <div className="w-[110%] max-w-4xl h-[440px] rounded-full [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.82)_28%,rgba(255,255,255,0.45)_55%,rgba(255,255,255,0.1)_75%,transparent_90%)] opacity-90 dark:opacity-0 transition-opacity duration-500" />
          </div>

          {/* Headline Utama: Dua Baris Terstruktur, Seimbang & Profesional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center max-w-5xl mx-auto"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.2] sm:leading-[1.25]">
              {/* Baris 1: Karakter Utama dengan Tiga Tipografi Berbeda & Animasi Hover Khusus */}
              <span className="block">
                Building with a{' '}
                {/* Kata 'secure': Lebih tegas, warna merah, animasi hover cyber-pulse */}
                <motion.span
                  className="font-jetbrains font-black text-red-600 dark:text-red-500 tracking-tight inline-block cursor-default"
                  whileHover={{
                    scale: 1.07,
                    y: -1,
                    textShadow: '0 0 18px rgba(239,68,68,0.7)',
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                >
                  secure
                </motion.span>
                ,{' '}
                {/* Kata 'playful': Hangat amber, animasi hover wobble ceria */}
                <motion.span
                  className="font-bricolage font-extrabold text-amber-500 dark:text-amber-400 inline-block tracking-normal -rotate-2 cursor-default"
                  whileHover={{
                    scale: 1.14,
                    rotate: [-2, 8, -6, 4, 0],
                    y: -3,
                    textShadow: '0 0 16px rgba(245,158,11,0.6)',
                  }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  playful
                </motion.span>
                , and{' '}
                {/* Kata 'creative': Biru, elegan italic, animasi hover artistic skew & glow */}
                <motion.span
                  className="font-fraunces italic font-medium text-blue-600 dark:text-blue-400 inline-block cursor-default"
                  whileHover={{
                    scale: 1.08,
                    skewX: -8,
                    y: -2,
                    textShadow: '0 0 20px rgba(59,130,246,0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                >
                  creative
                </motion.span>
              </span>

              {/* Baris 2: with [AI Ready / AI Included] website. */}
              <span className="mt-2 sm:mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-black text-2xl sm:text-4xl md:text-5xl">
                <span>with</span>{' '}
                {/* Teks Interaktif Murni dengan Garis Bawah Jelas & Tactile Hover */}
                <motion.button
                  type="button"
                  onClick={() => setAiMode(aiMode === 'ready' ? 'included' : 'ready')}
                  aria-label={`Mode saat ini: ${aiMode === 'ready' ? 'AI Ready' : 'AI Included'}. Klik untuk beralih mode.`}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative inline-flex items-center cursor-pointer select-none align-baseline focus:outline-none transition-transform duration-150"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={aiMode}
                      initial={{ y: 10, opacity: 0, filter: 'blur(3px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -10, opacity: 0, filter: 'blur(3px)' }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className={`font-black tracking-tight underline decoration-[2.5px] underline-offset-8 transition-colors duration-200 ${
                        aiMode === 'ready'
                          ? 'text-emerald-500 dark:text-emerald-400 decoration-emerald-500/80 group-hover:decoration-emerald-400'
                          : 'text-purple-600 dark:text-purple-400 decoration-purple-500/80 group-hover:decoration-purple-400'
                      }`}
                    >
                      {aiMode === 'ready' ? 'AI Ready' : 'AI Included'}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>{' '}
                <span>website.</span>
              </span>
            </h1>

            {/* Deskripsi Alami & Elegan Mengenai Efisiensi Pembuatan Website */}
            <motion.div
              key={aiMode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl font-normal leading-relaxed"
            >
              {aiMode === 'ready' ? (
                <p>
                  Membangun website modern dengan arsitektur kode yang bersih, kokoh, dan berkinerja tinggi—dirancang dengan alur kerja efisien dan siap diintegrasikan dengan kapabilitas AI masa kini kapan pun Anda membutuhkannya.
                </p>
              ) : (
                <p>
                  Menghadirkan website interaktif dengan kecerdasan AI terintegrasi langsung—memangkas siklus pengembangan, mengotomatisasi interaksi digital, dan memberikan efisiensi nyata bagi pengalaman pengguna Anda.
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* 2 Tombol Aksi Rata Tengah */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {/* Tombol Utama: Jelajahi Karya */}
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                if (lenis) {
                  lenis.scrollTo('#about', {
                    duration: 1.3,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  })
                } else {
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs sm:text-sm tracking-wide rounded-none hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 no-underline shadow-lg cursor-pointer"
            >
              <span>JELAJAHI KARYA</span>
              <span className="font-sans text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                / 実績を見る
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Tombol Sekunder: Hubungi Saya */}
            <a
              href="mailto:diandraanursasyabandira@gmail.com"
              className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 border border-zinc-400/80 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium text-xs sm:text-sm tracking-wide hover:border-zinc-950 dark:hover:border-white transition-all duration-300 no-underline cursor-pointer bg-white/40 dark:bg-black/30 backdrop-blur-xs"
            >
              <span>HUBUNGI SAYA</span>
              <span className="font-sans text-xs text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                / 連絡
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT ME SECTION */}
      <AboutMeSection />
    </div>
  )
}
