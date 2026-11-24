import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowUpRight, Terminal, Cpu, Disc3 } from 'lucide-react'
import CyberCanvas from '#/components/CyberCanvas'
import AboutMeSection from '#/components/AboutMeSection'
import WorksSection from '#/components/WorksSection'
import TechStackSection from '#/components/TechStackSection'
import HeroMusicPlayer from '#/components/HeroMusicPlayer'

export const Route = createFileRoute('/')({ component: Home })

export default function Home() {
  const lenis = useLenis()
  // Interactive mode toggle: 'ready' (AI Ready) vs 'included' (AI Included)
  const [aiMode, setAiMode] = useState<'ready' | 'included'>('ready')

  const handleScrollTo = (targetId: string) => {
    if (lenis) {
      lenis.scrollTo(targetId, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-[#050507] text-zinc-950 dark:text-white transition-colors duration-500 selection:bg-blue-500 selection:text-white">
      {/* FULLPAGE INTERACTIVE WEBGL CANVAS (Glitch, Chromatic Aberration, Speed Lines, Matrix Grid) */}
      <CyberCanvas />

      {/* =================================================================== */}
      {/* SECTION 1: HERO SECTION - NEO-TOKYO CYBER-EDITORIAL LAYOUT         */}
      {/* =================================================================== */}
      <section
        id="home"
        className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden select-none pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-0"
      >
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* =================================================================== */}
            {/* KOLOM KIRI: TEKS, TIPOGRAFI TEGAS & ACTION CONTROLS                */}
            {/* =================================================================== */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Kicker Header dengan glif Jepang */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 sm:mb-6"
              >
                <span className="h-[2px] w-8 sm:w-12 bg-blue-600 dark:bg-blue-400" />
                <span className="font-jetbrains text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
                  // 01 ARCHITECTURE & SYSTEMS // システム設計
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-jetbrains font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                  ONLINE
                </span>
              </motion.div>

              {/* Headline Utama: Tegas, Modern, dan Presisi */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.14] sm:leading-[1.12]">
                  <span className="block">
                    Building with a{' '}
                    {/* Kata 'secure': Font monospaced tegas teknis, aksen merah neon */}
                    <motion.span
                      className="font-jetbrains font-extrabold text-red-600 dark:text-red-500 tracking-tight inline-block cursor-default"
                      whileHover={{
                        scale: 1.06,
                        y: -1,
                        textShadow: '0 0 16px rgba(239,68,68,0.6)',
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                    >
                      secure
                    </motion.span>
                    ,{' '}
                    {/* Kata 'playful': Font bubbly bulat ceria (Fredoka), hangat amber */}
                    <motion.span
                      className="font-fredoka font-extrabold text-amber-500 dark:text-amber-400 inline-block cursor-default tracking-wide"
                      whileHover={{
                        scale: 1.14,
                        rotate: -4,
                        y: -3,
                        textShadow: '0 0 16px rgba(245,158,11,0.6)',
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 14 }}
                    >
                      playful
                    </motion.span>
                    , and{' '}
                    {/* Kata 'creative': Font editorial italic berseni (Instrument Serif), biru artistik */}
                    <motion.span
                      className="font-instrument italic font-normal text-blue-600 dark:text-blue-400 inline-block cursor-default text-[1.12em] tracking-normal"
                      whileHover={{
                        scale: 1.08,
                        y: -2,
                        textShadow: '0 0 18px rgba(59,130,246,0.6)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    >
                      creative
                    </motion.span>
                  </span>

                  {/* Baris 2: with [AI Ready / AI Included] website. */}
                  <span className="mt-2 sm:mt-3 flex flex-wrap items-center justify-start gap-x-2.5 sm:gap-x-3 gap-y-1.5 font-black text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
                    <span>with</span>{' '}
                    {/* Tombol Switch Mode Interaktif */}
                    <motion.button
                      type="button"
                      onClick={() => setAiMode(aiMode === 'ready' ? 'included' : 'ready')}
                      aria-label={`Mode saat ini: ${aiMode === 'ready' ? 'AI Ready' : 'AI Included'}. Klik untuk beralih mode.`}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative inline-flex items-center cursor-pointer select-none align-baseline focus:outline-none transition-transform duration-150"
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={aiMode}
                          initial={{ y: 8, opacity: 0, filter: 'blur(2px)' }}
                          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                          exit={{ y: -8, opacity: 0, filter: 'blur(2px)' }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`font-black tracking-tight underline decoration-[3px] underline-offset-6 transition-colors duration-200 ${
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

                {/* Deskripsi Alami & Lugas Mengenai Kapabilitas & Efisiensi */}
                <motion.div
                  key={aiMode}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 sm:mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl font-normal leading-relaxed"
                >
                  {aiMode === 'ready' ? (
                    <p>
                      Membangun website modern dengan arsitektur kode yang bersih, kokoh, dan berkinerja tinggi. Dirancang dengan alur kerja efisien dan siap diintegrasikan dengan kapabilitas AI masa kini kapan pun Anda membutuhkannya.
                    </p>
                  ) : (
                    <p>
                      Menghadirkan website interaktif dengan kecerdasan AI terintegrasi langsung. Memangkas siklus pengembangan, mengotomatisasi interaksi digital, dan memberikan efisiensi nyata bagi pengalaman pengguna Anda.
                    </p>
                  )}
                </motion.div>
              </motion.div>

              {/* Status Bar Telemetri Cyberpunk */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] font-jetbrains text-zinc-500 dark:text-zinc-400">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xs">
                  <Terminal className="w-3 h-3 text-blue-500" />
                  <span>CORE: TS · RUST · GO · PHP</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xs">
                  <Cpu className="w-3 h-3 text-emerald-500" />
                  <span>SYSTEM: HYPRLAND / ARCH</span>
                </div>
              </div>

              {/* 2 Tombol Aksi Rata Kiri */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center justify-start gap-4 sm:gap-5"
              >
                {/* Tombol Utama: Jelajahi Karya */}
                <a
                  href="#works"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScrollTo('#works')
                  }}
                  className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 no-underline shadow-md hover:shadow-lg cursor-pointer border border-zinc-950 dark:border-white"
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
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center w-full">
              {/* Cyber Frame Container untuk Music Player */}
              <div className="relative w-full max-w-lg">
                {/* Header Tag Deck */}
                <div className="flex items-center justify-between px-3 py-1.5 mb-2 font-jetbrains text-[11px] text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Disc3 className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                      SOUND DECK // 音響システム
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400">YT · STREAMING</span>
                </div>

                {/* Komponen Music Player Asli (Reused & Elevated) */}
                <HeroMusicPlayer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT ME SECTION (Komponen Terpisah Modular & Non-Template) */}
      <AboutMeSection />

      {/* SECTION 3: WORKS / SELECTED REPOSITORIES SECTION */}
      <WorksSection />

      {/* SECTION 4: TECH STACK & TOOLS SECTION */}
      <TechStackSection />
    </div>
  )
}
