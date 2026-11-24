import { useState, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ExternalLink, Download, Sparkles, ArrowUpRight } from 'lucide-react'
import TechStackSection from '#/components/TechStackSection'
import HeroMusicPlayer from '#/components/HeroMusicPlayer'
import WorksSection from '#/components/WorksSection'

export const Route = createFileRoute('/')({ component: Home })

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonInfo {
  id: Season
  name: string
  kanji: string
  romaji: string
  desc: string
  icon: string
  color: string
}

export const SEASONS_DATA: SeasonInfo[] = [
  {
    id: 'spring',
    name: 'Musim Semi',
    kanji: '春',
    romaji: 'Haru',
    desc: 'Bunga Sakura Mekar & Semilir Hangat',
    icon: '🌸',
    color: '#f472b6',
  },
  {
    id: 'summer',
    name: 'Musim Panas',
    kanji: '夏',
    romaji: 'Natsu',
    desc: 'Lautan Seigaiha & Bintang Malam',
    icon: '🌊',
    color: '#38bdf8',
  },
  {
    id: 'autumn',
    name: 'Musim Gugur',
    kanji: '秋',
    romaji: 'Aki',
    desc: 'Guguran Daun Momiji & Senja Emas',
    icon: '🍁',
    color: '#f97316',
  },
  {
    id: 'winter',
    name: 'Musim Dingin',
    kanji: '冬',
    romaji: 'Fuyu',
    desc: 'Hujan Salju & Malam Sunyi Hening',
    icon: '❄️',
    color: '#93c5fd',
  },
]

// 18 Sakura Petals for Spring
const SAKURA_PETALS = [
  { left: '4%', dur: 9.2, delay: 0.2, size: 16, rotate: 15 },
  { left: '11%', dur: 11.5, delay: 2.1, size: 14, rotate: 45 },
  { left: '19%', dur: 8.4, delay: 4.3, size: 18, rotate: -25 },
  { left: '26%', dur: 10.1, delay: 1.1, size: 15, rotate: 30 },
  { left: '33%', dur: 12.0, delay: 3.5, size: 20, rotate: -40 },
  { left: '41%', dur: 9.0, delay: 0.8, size: 14, rotate: 60 },
  { left: '49%', dur: 10.8, delay: 5.2, size: 17, rotate: 20 },
  { left: '56%', dur: 8.6, delay: 2.8, size: 15, rotate: -35 },
  { left: '63%', dur: 11.2, delay: 1.6, size: 19, rotate: 50 },
  { left: '71%', dur: 9.8, delay: 4.0, size: 16, rotate: -15 },
  { left: '78%', dur: 12.4, delay: 0.5, size: 14, rotate: 35 },
  { left: '85%', dur: 8.9, delay: 3.1, size: 18, rotate: -55 },
  { left: '92%', dur: 10.4, delay: 1.9, size: 15, rotate: 25 },
  { left: '15%', dur: 9.6, delay: 6.0, size: 17, rotate: -20 },
  { left: '38%', dur: 11.0, delay: 7.2, size: 16, rotate: 40 },
  { left: '60%', dur: 8.8, delay: 6.5, size: 15, rotate: -30 },
  { left: '82%', dur: 10.5, delay: 5.8, size: 18, rotate: 10 },
  { left: '96%', dur: 9.3, delay: 7.0, size: 14, rotate: -45 },
]

// 18 Momiji (Maple Leaves) for Autumn
const MOMIJI_LEAVES = [
  { left: '6%', dur: 9.8, delay: 0.4, size: 22, color: '#ef4444' },
  { left: '14%', dur: 12.2, delay: 2.5, size: 18, color: '#f97316' },
  { left: '22%', dur: 8.9, delay: 4.8, size: 24, color: '#ea580c' },
  { left: '30%', dur: 10.6, delay: 1.3, size: 19, color: '#f59e0b' },
  { left: '37%', dur: 13.0, delay: 3.9, size: 26, color: '#dc2626' },
  { left: '45%', dur: 9.4, delay: 0.9, size: 17, color: '#f97316' },
  { left: '53%', dur: 11.4, delay: 5.5, size: 23, color: '#b91c1c' },
  { left: '61%', dur: 9.0, delay: 3.2, size: 20, color: '#ea580c' },
  { left: '69%', dur: 11.8, delay: 1.8, size: 25, color: '#d97706' },
  { left: '76%', dur: 10.2, delay: 4.2, size: 18, color: '#ef4444' },
  { left: '84%', dur: 12.8, delay: 0.7, size: 22, color: '#f97316' },
  { left: '91%', dur: 9.2, delay: 3.5, size: 21, color: '#c2410c' },
  { left: '12%', dur: 10.0, delay: 6.2, size: 19, color: '#f59e0b' },
  { left: '34%', dur: 11.6, delay: 7.5, size: 24, color: '#dc2626' },
  { left: '58%', dur: 9.1, delay: 6.8, size: 18, color: '#ea580c' },
  { left: '79%', dur: 10.9, delay: 6.0, size: 22, color: '#ef4444' },
  { left: '95%', dur: 9.7, delay: 7.2, size: 20, color: '#f97316' },
  { left: '48%', dur: 12.0, delay: 8.0, size: 25, color: '#b91c1c' },
]

// 26 Snowflakes for Winter
const SNOW_FLAKES = [
  { left: '3%', dur: 6.8, delay: 0.1, size: 4.5, opacity: 0.8 },
  { left: '9%', dur: 8.5, delay: 1.7, size: 3.0, opacity: 0.6 },
  { left: '16%', dur: 6.2, delay: 3.4, size: 5.5, opacity: 0.9 },
  { left: '23%', dur: 7.9, delay: 0.8, size: 3.5, opacity: 0.7 },
  { left: '31%', dur: 9.2, delay: 2.6, size: 6.0, opacity: 0.85 },
  { left: '39%', dur: 6.6, delay: 0.5, size: 3.2, opacity: 0.65 },
  { left: '46%', dur: 8.1, delay: 4.1, size: 5.0, opacity: 0.9 },
  { left: '54%', dur: 6.4, delay: 2.1, size: 4.0, opacity: 0.75 },
  { left: '61%', dur: 8.8, delay: 1.2, size: 5.8, opacity: 0.85 },
  { left: '68%', dur: 7.3, delay: 3.0, size: 3.6, opacity: 0.7 },
  { left: '75%', dur: 9.5, delay: 0.3, size: 6.2, opacity: 0.95 },
  { left: '82%', dur: 6.7, delay: 2.4, size: 4.2, opacity: 0.8 },
  { left: '89%', dur: 8.3, delay: 1.5, size: 3.4, opacity: 0.65 },
  { left: '96%', dur: 7.1, delay: 3.8, size: 5.2, opacity: 0.9 },
  { left: '12%', dur: 7.5, delay: 4.8, size: 4.8, opacity: 0.8 },
  { left: '27%', dur: 8.7, delay: 5.6, size: 3.8, opacity: 0.7 },
  { left: '43%', dur: 6.9, delay: 5.1, size: 5.4, opacity: 0.85 },
  { left: '58%', dur: 8.4, delay: 5.9, size: 3.2, opacity: 0.6 },
  { left: '72%', dur: 7.0, delay: 4.5, size: 5.0, opacity: 0.9 },
  { left: '86%', dur: 9.0, delay: 5.3, size: 4.4, opacity: 0.75 },
  { left: '94%', dur: 6.5, delay: 5.7, size: 3.6, opacity: 0.7 },
  { left: '7%', dur: 8.0, delay: 6.3, size: 5.6, opacity: 0.9 },
  { left: '35%', dur: 7.2, delay: 6.7, size: 4.0, opacity: 0.8 },
  { left: '65%', dur: 8.6, delay: 6.1, size: 3.5, opacity: 0.65 },
  { left: '80%', dur: 6.8, delay: 6.9, size: 5.2, opacity: 0.85 },
  { left: '50%', dur: 7.6, delay: 7.1, size: 4.6, opacity: 0.8 },
]

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

// Full Background Pemandangan Tradisional Jepang dengan Sistem Empat Musim (四季)
function FullBackgroundScenery({
  season,
  onCycleSeason,
}: {
  season: Season
  onCycleSeason: () => void
}) {
  return (
    <div
      onClick={onCycleSeason}
      aria-label={`Pemandangan latar belakang: ${season}. Klik untuk mengganti musim.`}
      className="absolute inset-0 cursor-pointer select-none overflow-hidden z-0 flex items-center justify-center group/scenery"
    >
      {/* 1. EFEK PARTIKEL MUSIM (Sakura, Momiji, atau Salju) */}
      {season === 'spring' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          {SAKURA_PETALS.map((petal, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: petal.left,
                top: '-30px',
                animation: `sakuraFall ${petal.dur}s linear -${petal.delay}s infinite`,
              }}
              className="pointer-events-none"
            >
              <svg
                width={petal.size}
                height={petal.size}
                viewBox="0 0 32 32"
                fill="none"
                style={{ transform: `rotate(${petal.rotate}deg)` }}
              >
                <path
                  d="M16 2 C19 8, 28 10, 27 18 C26 26, 18 29, 16 30 C14 29, 6 26, 5 18 C4 10, 13 8, 16 2 Z"
                  fill="url(#sakuraGrad)"
                  opacity="0.88"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {season === 'autumn' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          {MOMIJI_LEAVES.map((leaf, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: leaf.left,
                top: '-35px',
                animation: `momijiFall ${leaf.dur}s ease-in-out -${leaf.delay}s infinite`,
              }}
              className="pointer-events-none"
            >
              <svg width={leaf.size} height={leaf.size} viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2 L18 10 L26 8 L22 15 L29 19 L21 21 L22 28 L16 23 L10 28 L11 21 L3 19 L10 15 L6 8 L14 10 Z"
                  fill={leaf.color}
                  opacity="0.85"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {season === 'winter' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
          {SNOW_FLAKES.map((snow, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: snow.left,
                top: '-20px',
                animation: `snowFall ${snow.dur}s linear -${snow.delay}s infinite`,
              }}
              className="pointer-events-none"
            >
              <div
                style={{
                  width: `${snow.size}px`,
                  height: `${snow.size}px`,
                  opacity: snow.opacity,
                }}
                className="rounded-full bg-sky-200/90 dark:bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            </div>
          ))}
        </div>
      )}

      {/* 2. SVG SCENERY UTAMA */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-80 dark:opacity-60 transition-opacity duration-700 pointer-events-none"
      >
        <defs>
          {/* Gradien Bunga Sakura */}
          <linearGradient id="sakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#f472b6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.75" />
          </linearGradient>

          {/* Gradien Bintang Jatuh Langit Malam */}
          <linearGradient id="fullShootingStar1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fullShootingStar2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#60A5FA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </linearGradient>

          {/* Gradien Lautan Luas */}
          <linearGradient id="seaGradFull" x1="0" y1="560" x2="0" y2="840" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.08" className="dark:stop-color-[#0b1220] dark:stop-opacity-50" />
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.22" className="dark:stop-color-[#060a12] dark:stop-opacity-80" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.35" className="dark:stop-color-[#04060a] dark:stop-opacity-95" />
          </linearGradient>

          {/* Gradien Transisi Pesisir Pantai Pasir Hitam Vulkanik di Mode Gelap */}
          <linearGradient id="coastlineGradDark" x1="0" y1="780" x2="0" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#181822" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#101016" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#050507" stopOpacity="1" />
          </linearGradient>

          {/* Gradien Transisi Pesisir Pantai Pasir Putih Bersih di Mode Terang (Light Mode) */}
          <linearGradient id="coastlineGradLight" x1="0" y1="760" x2="0" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#f8fafc" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 1. LANGIT MALAM: BINTANG-BINTANG BERKEDIP & BINTANG JATUH (Mode Gelap) */}
        <g className="hidden dark:block">
          {NIGHT_STARS.map((star, idx) => (
            <circle
              key={idx}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#ffffff"
              style={{
                animation: `starTwinkle ${star.dur}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}

          {/* Bintang Jatuh (Ditampilkan pada Musim Panas & Dingin) */}
          {(season === 'summer' || season === 'winter') && (
            <>
              <g style={{ animation: 'shootingStarFly1 7.2s ease-out infinite' }}>
                <line
                  x1="1260"
                  y1="55"
                  x2="1330"
                  y2="28"
                  stroke="url(#fullShootingStar1)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="1260" cy="55" r="2.2" fill="#ffffff" />
              </g>

              <g style={{ animation: 'shootingStarFly2 9.5s ease-out 3s infinite' }}>
                <line
                  x1="580"
                  y1="45"
                  x2="645"
                  y2="20"
                  stroke="url(#fullShootingStar2)"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
                <circle cx="580" cy="45" r="1.9" fill="#ffffff" />
              </g>
            </>
          )}
        </g>

        {/* 2. AWAN TRADISIONAL JEPANG MELAYANG (Stylized Japanese Kumo Clouds) */}
        {/* Awan Kiri */}
        <g style={{ animation: 'cloudDriftLeft 18s ease-in-out infinite' }}>
          <path
            d="M 140 260 C 140 230, 190 220, 220 240 C 240 210, 310 210, 340 240 C 370 225, 420 245, 420 275 C 420 295, 380 310, 340 305 L 160 305 C 140 295, 140 275, 140 260 Z"
            className="fill-zinc-200/70 dark:fill-zinc-800/40"
          />
          <path
            d="M 120 295 L 460 295"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="text-zinc-400/40 dark:text-zinc-600/30"
          />
        </g>

        {/* Awan Tengah Langit */}
        <g style={{ animation: 'cloudDriftRight 24s ease-in-out 2s infinite' }}>
          <path
            d="M 640 180 C 640 155, 680 145, 705 162 C 725 140, 780 140, 805 165 C 828 152, 868 168, 868 194 C 868 212, 835 224, 805 220 L 655 220 C 640 212, 640 195, 640 180 Z"
            className="fill-zinc-200/50 dark:fill-zinc-800/30"
          />
        </g>

        {/* Awan Kanan */}
        <g style={{ animation: 'cloudDriftRight 22s ease-in-out infinite' }}>
          <path
            d="M 980 270 C 980 240, 1030 230, 1060 250 C 1090 225, 1160 225, 1190 255 C 1220 240, 1270 260, 1270 290 C 1270 310, 1230 325, 1190 320 L 1000 320 C 980 310, 980 290, 980 270 Z"
            className="fill-zinc-200/70 dark:fill-zinc-800/40"
          />
          <path
            d="M 940 310 L 1310 310"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            className="text-zinc-400/40 dark:text-zinc-600/30"
          />
        </g>

        {/* 3. LAUTAN AIR DENGAN OMBAK SEIGAIHA MELINTANG PENUH */}
        <g>
          <rect x="0" y="550" width="1440" height="350" fill="url(#seaGradFull)" />

          <line
            x1="0"
            y1="550"
            x2="1440"
            y2="550"
            className="stroke-zinc-400/40 dark:stroke-zinc-700/40"
            strokeWidth="1.5"
          />

          {/* Ombak Layer 1 */}
          <path
            d="M 0 595 Q 90 580 180 595 T 360 595 T 540 595 T 720 595 T 900 595 T 1080 595 T 1260 595 T 1440 595"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={
              season === 'autumn'
                ? 'text-amber-500/30 dark:text-amber-600/30'
                : season === 'spring'
                ? 'text-pink-400/30 dark:text-pink-500/30'
                : 'text-zinc-400/50 dark:text-zinc-600/50'
            }
            style={{ animation: 'waveSway1 6s ease-in-out infinite' }}
          />

          {/* Ombak Layer 2 */}
          <path
            d="M 0 655 Q 120 635 240 655 T 480 655 T 720 655 T 960 655 T 1200 655 T 1440 655"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="16 8"
            className="text-zinc-500/40 dark:text-zinc-500/30"
            style={{ animation: 'waveSway2 7s ease-in-out infinite' }}
          />

          {/* Ombak Layer 3 */}
          <path
            d="M 0 725 Q 150 700 300 725 T 600 725 T 900 725 T 1200 725 T 1440 725"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-zinc-400/60 dark:text-zinc-700/60"
            style={{ animation: 'waveSway1 8s ease-in-out infinite' }}
          />
        </g>

        {/* 4. TRANSISI ANTARA LAUT DAN DARATAN */}
        <g>
          <path
            d="M 0 790 Q 240 760 480 795 T 960 775 T 1440 800 L 1440 900 L 0 900 Z"
            fill="url(#coastlineGradLight)"
            className="block dark:hidden"
          />

          <path
            d="M 0 790 Q 240 760 480 795 T 960 775 T 1440 800 L 1440 900 L 0 900 Z"
            fill="url(#coastlineGradDark)"
            className="hidden dark:block"
          />

          <path
            d="M 0 788 Q 240 758 480 793 T 960 773 T 1440 798"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="14 7"
            className="text-blue-300/80 dark:text-zinc-500/70 opacity-80"
          />
          <path
            d="M 0 806 Q 260 780 520 812 T 1020 794 T 1440 816"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeDasharray="8 8"
            className="text-blue-200/70 dark:text-zinc-600/60 opacity-70"
          />
          <path
            d="M 0 830 Q 300 810 600 835 T 1200 825 T 1440 840"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="text-blue-200/50 dark:text-zinc-700/40 opacity-60"
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

        {/* ROADMAP / MILESTONES (Responsif: Fluid Staggered di Desktop & Vertical Timeline di Mobile - Bebas Scroll Horizontal) */}
        <div className="mt-10 sm:mt-12">
          {/* ========================================================================= */}
          {/* 1. TAMPILAN DESKTOP (md:block): Fluid Staggered Timeline, 100% Pas, No Scroll */}
          {/* ========================================================================= */}
          <div className="hidden md:block w-full relative h-[340px] select-none">
            {/* Garis Poros Horizontal Pusat: ------------o----------o------------ */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-2 right-2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-blue-500/20 via-zinc-300 dark:via-zinc-700 to-blue-500/20 pointer-events-none z-0"
            />

            {/* 5 Milestone Selang-Seling Sesuai Sketsa (3 Atas, 2 Bawah) Berbasis Persentase Dinamis */}
            {ROADMAP_ITEMS.map((item, idx) => {
              const isTop = item.position === 'top'
              const isFuture = item.isCurrentOrFuture
              const nodePercent = ['11.5%', '30.75%', '50%', '69.25%', '88.5%'][idx]

              return (
                <div key={idx} className="group">
                  {/* Kartu Konten Milestone (Persegi Panjang Horisontal Pas Lebar) */}
                  <div
                    style={{ left: nodePercent }}
                    className={`absolute -translate-x-1/2 w-[195px] lg:w-[215px] xl:w-[225px] h-[142px] lg:h-[146px] z-10 ${
                      isTop ? 'bottom-[calc(50%+16px)]' : 'top-[calc(50%+16px)]'
                    }`}
                  >
                    <div
                      className={`w-full h-full p-3 lg:p-3.5 rounded-2xl transition-all duration-300 border bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between group-hover:shadow-md ${
                        isFuture
                          ? 'border-blue-500/60 dark:border-blue-400/60 ring-1 ring-blue-500/30 bg-blue-50/20 dark:bg-blue-950/20'
                          : 'border-zinc-200/90 dark:border-zinc-800 group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50'
                      }`}
                    >
                      <div>
                        {/* Baris Atas: Badge Tahun di Kiri & Logo Bulat Instansi di Kanan */}
                        <div className="flex items-center justify-between gap-1.5">
                          <span
                            className={`font-jetbrains text-[9px] lg:text-[9.5px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded inline-block ${
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
                            className="relative flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-110 shadow-xs hover:shadow transition-all duration-200 group/inst shrink-0 overflow-hidden"
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
                              <span className="font-jetbrains text-[9.5px] lg:text-[10px] font-bold text-zinc-700 dark:text-zinc-200 group-hover/inst:text-blue-600 dark:group-hover/inst:text-blue-400 transition-colors">
                                {item.institution.short}
                              </span>
                            )}
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover/inst:opacity-100 transition-opacity shadow-xs">
                              <ExternalLink className="w-1.5 h-1.5" />
                            </span>
                          </a>
                        </div>

                        <h4 className="text-[11px] lg:text-xs font-bold tracking-tight text-zinc-950 dark:text-white mt-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      <p className="text-[10px] lg:text-[10.5px] text-zinc-600 dark:text-zinc-400 leading-snug font-normal mt-1 line-clamp-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Stem Penghubung Vertikal */}
                  <div
                    style={{ left: nodePercent }}
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
                    style={{ left: nodePercent }}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                  >
                    <div
                      className={`w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full border-[2.5px] bg-white dark:bg-zinc-950 flex items-center justify-center transition-all duration-300 ${
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

          {/* ========================================================================= */}
          {/* 2. TAMPILAN MOBILE (md:hidden): Vertical Timeline Elegan, 100% Full Width */}
          {/* ========================================================================= */}
          <div className="md:hidden relative pl-6 sm:pl-8 space-y-5 pt-1">
            {/* Garis Poros Vertikal Pusat */}
            <div
              aria-hidden="true"
              className="absolute left-2 sm:left-3 top-3 bottom-3 w-[2px] bg-gradient-to-b from-blue-500/20 via-zinc-300 dark:via-zinc-700 to-blue-500/20 pointer-events-none"
            />

            {ROADMAP_ITEMS.map((item, idx) => {
              const isFuture = item.isCurrentOrFuture

              return (
                <div key={idx} className="relative group">
                  {/* Titik Node 'o' di Sumbu Vertikal */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-5 -translate-x-1/2 w-4 h-4 rounded-full border-[2.5px] bg-white dark:bg-zinc-950 flex items-center justify-center transition-all duration-300 z-10 ${
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

                  {/* Stem Horisontal Menghubungkan Node ke Atap Kartu */}
                  <div
                    className={`absolute -left-4 sm:-left-6 top-7 w-4 sm:w-6 h-[2px] -translate-y-1/2 transition-colors duration-300 ${
                      isFuture
                        ? 'bg-blue-500 dark:bg-blue-400'
                        : 'bg-zinc-300 dark:bg-zinc-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-400'
                    }`}
                  />

                  {/* Kartu Konten Milestone Mobile (Full Width Nyaman & Rapi) */}
                  <div
                    className={`w-full p-4 rounded-2xl transition-all duration-300 border bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between group-hover:shadow-md ${
                      isFuture
                        ? 'border-blue-500/60 dark:border-blue-400/60 ring-1 ring-blue-500/30 bg-blue-50/20 dark:bg-blue-950/20'
                        : 'border-zinc-200/90 dark:border-zinc-800 group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50'
                    }`}
                  >
                    <div>
                      {/* Baris Atas: Badge Tahun di Kiri & Logo Bulat Instansi di Kanan */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-jetbrains text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded inline-block ${
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

                      <h4 className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white mt-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  // Sistem Empat Musim Jepang: 'spring' | 'summer' | 'autumn' | 'winter'
  const [season, setSeason] = useState<Season>('spring')

  const cycleSeason = useCallback(() => {
    setSeason((prev) => {
      const order: Season[] = ['spring', 'summer', 'autumn', 'winter']
      const nextIdx = (order.indexOf(prev) + 1) % order.length
      return order[nextIdx]
    })
  }, [])

  const currentSeasonConfig =
    SEASONS_DATA.find((s) => s.id === season) || SEASONS_DATA[0]

  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-[#050507] text-zinc-950 dark:text-white transition-colors duration-500 selection:bg-blue-500 selection:text-white">
      {/* SECTION 1: HERO SECTION */}
      <section
        id="home"
        className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden select-none pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-0"
      >
        {/* Background Tradisional Jepang Penuh dengan Sistem 4 Musim Interaktif */}
        <FullBackgroundScenery season={season} onCycleSeason={cycleSeason} />

        {/* Floating Season Indicator Badge (Klik untuk Ganti Musim) */}
        <div className="absolute top-24 sm:top-28 right-6 sm:right-10 lg:right-14 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={cycleSeason}
            aria-label={`Musim saat ini: ${currentSeasonConfig.name}. Klik untuk mengganti musim.`}
            title="Klik untuk ganti musim (Musim Semi, Panas, Gugur, Dingin)"
            className="group inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-zinc-200/90 dark:border-white/10 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none text-xs font-mono"
          >
            <span className="text-sm select-none">{currentSeasonConfig.icon}</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {currentSeasonConfig.kanji} · {currentSeasonConfig.name}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 hidden sm:inline flex items-center gap-1 font-sans">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
              Klik background
            </span>
          </button>
        </div>

        {/* Kontainer Utama Hero Section: Split Layout (Kiri: Teks & Buttons, Kanan: Music Player) */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* =================================================================== */}
            {/* KOLOM KIRI: TEKS & TOMBOL AKSI (Rata Kiri, Tipografi Tegas & Ramah) */}
            {/* =================================================================== */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Headline Utama: Meet me, Diandra Anursa Syabandira... */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-[3.3rem] xl:text-[3.8rem] font-black tracking-tight text-zinc-950 dark:text-white leading-[1.18] sm:leading-[1.14]">
                  {/* Baris 1: Meet me, */}
                  <span className="block text-lg sm:text-2xl lg:text-3xl font-medium text-zinc-500 dark:text-zinc-400 mb-1 sm:mb-2 font-mono">
                    Meet me,
                  </span>

                  {/* Baris 2: Diandra Anursa Syabandira */}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-300 font-black">
                    Diandra Anursa Syabandira
                  </span>

                  {/* Baris 3: your friendliest Programmer you ever meet. */}
                  <span className="mt-2 sm:mt-3 block text-2xl sm:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] font-extrabold text-zinc-800 dark:text-zinc-200">
                    your{' '}
                    <motion.span
                      className="font-fredoka font-semibold text-amber-500 dark:text-amber-400 inline-block cursor-default tracking-wide"
                      whileHover={{ scale: 1.12, rotate: -3 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 14 }}
                    >
                      friendliest
                    </motion.span>{' '}
                    <motion.span
                      className="font-jetbrains font-bold text-sky-500 dark:text-sky-400 inline-block cursor-default tracking-tight"
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                    >
                      Programmer
                    </motion.span>{' '}
                    you ever meet.
                  </span>
                </h1>

                {/* Deskripsi Alami & Lugas Mengenai Kapabilitas */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mt-5 sm:mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl font-normal leading-relaxed"
                >
                  <p>
                    Full-Stack Developer & DevOps Engineer yang berfokus pada arsitektur sistem yang bersih, performa web tinggi, serta pengalaman digital yang intuitif dan terintegrasi AI.
                  </p>
                </motion.div>
              </motion.div>

              {/* 2 Tombol Aksi Rata Kiri */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center justify-start gap-4 sm:gap-5"
              >
                {/* Tombol Utama: DOWNLOAD CV */}
                <a
                  href="/cv.pdf"
                  download="CV-Diandra-Anursa-Syabandira.pdf"
                  className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs sm:text-sm tracking-wider uppercase rounded-none hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 no-underline shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span>DOWNLOAD CV</span>
                  <span className="font-sans text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                    / 履歴書
                  </span>
                </a>

                {/* Tombol Sekunder: Hubungi Saya */}
                <a
                  href="mailto:diandraanursasyabandira@gmail.com"
                  className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold text-xs sm:text-sm tracking-wider uppercase hover:border-zinc-950 dark:hover:border-white transition-all duration-300 no-underline cursor-pointer bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xs"
                >
                  <span>HUBUNGI SAYA</span>
                  <span className="font-sans text-xs text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                    / 連絡
                  </span>
                </a>
              </motion.div>
            </div>

            {/* =================================================================== */}
            {/* KOLOM KANAN: MUSIC PLAYER MODERN & UNIK (YouTube Interactive Audio) */}
            {/* =================================================================== */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
              <HeroMusicPlayer />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT ME SECTION */}
      <AboutMeSection />

      {/* SECTION 3: WORKS / SELECTED REPOSITORIES SECTION */}
      <WorksSection />

      {/* SECTION 4: TECH STACK & TOOLS SECTION */}
      <TechStackSection />
    </div>
  )
}
