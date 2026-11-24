import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  siGo,
  siPhp,
  siJavascript,
  siTypescript,
  siLaravel,
  siReact,
  siNextdotjs,
  siRust,
  siExpress,
  siHtml5,
  siCss,
  siElectron,
  siNodedotjs,
  siBun,
  siVite,
  siTailwindcss,
  siFramer,
  siPodman,
  siGit,
  siPostman,
  siNgrok,
  siZedindustries,
  siDocker,
  siPusher,
  siFilament,
  siJsonwebtokens,
  siApache,
  siNginx,
  siClaude,
  siGooglegemini,
  siMysql,
  siPostgresql,
  siMariadb,
  siSupabase,
  siMongodb,
  siSqlite,
  siRedis,
  siArchlinux,
  siHyprland,
  siDebian,
  siUbuntu,
  siGithub,
  siOpencode,
  siComposer,
  siThreedotjs,
  siGreensock,
} from 'simple-icons'

// Custom Official SVGs untuk Windows 11, VS Code, ChatGPT, Antigravity, Lenis, dan ElysiaJS
const Windows11Icon = {
  path: 'M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801',
  viewBox: '0 0 24 24',
}

const VsCodeIcon = {
  path: 'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z',
  viewBox: '0 0 24 24',
}

const ChatGptIcon = {
  path: 'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 9.496a4.482 4.482 0 0 1 2.366-1.973V13.1a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 9.496zm16.597 3.855l-5.833-3.387L15.119 8.8a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.674a.79.79 0 0 0-.409-.667zM20.25 10.42l-.142-.085-4.773-2.782a.776.776 0 0 0-.785 0L8.706 10.92V8.593a.08.08 0 0 1 .033-.062l4.84-2.796a4.5 4.5 0 0 1 6.67 4.685zM11.002 12l2.97-1.714 2.97 1.714v3.429L13.97 17.143l-2.97-1.714z',
  viewBox: '0 0 24 24',
}

const AntigravityIcon = {
  path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  viewBox: '0 0 24 24',
}

const LenisIcon = {
  path: 'M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-7a7 7 0 100 14 7 7 0 000-14z',
  viewBox: '0 0 24 24',
}

const ElysiaIcon = {
  path: 'M69.585 180.693c-4.591-4.721-12.691-17.586-12.691-20.099c0-.433-.26-1.559-.607-2.556c-1.386-3.941-1.69-6.67-1.43-12.128c.477-9.227 2.296-16.331 6.238-24.344c3.162-6.454 7.104-10.613 13.732-14.598c2.599-1.559 2.599-1.559-2.08-1.559c-4.721 0-4.721 0-3.552-1.43c.607-.736 1.777-2.339 2.556-3.552c3.552-5.328 11.133-11.609 14.728-12.215c.866-.13 1.603-.347 1.603-.52c0-.13-.433-.823-.997-1.516c-.996-1.256-.996-1.256.737-3.162c2.122-2.34 2.945-2.816 5.371-3.162c1.82-.217 1.82-.217-.563-3.25c-4.722-5.934-9.443-13.644-8.793-14.337c.173-.13 2.295.693 4.764 1.82c3.942 1.862 4.809 2.122 7.278 2.122c2.079 0 3.205-.217 4.115-.823c1.126-.737 1.776-.78 7.32-.52c9.92.477 13.385.953 17.457 2.469c9.66 3.552 13.342 7.234 16.547 16.59c.953 2.73 1.949 5.458 2.252 5.978c1.56 3.076 8.317 7.884 14.382 10.31c1.342.519 2.599 1.169 2.729 1.386c.866 1.386-8.534 6.8-14.555 8.36c-4.375 1.126-11.392 1.343-14.987.433c-1.646-.39-3.552-1.04-4.289-1.429c-.996-.52-2.599-.694-7.147-.65c-7.234.043-12.302 1.213-19.016 4.461c-6.108 2.989-9.963 5.588-14.511 9.963c-9.097 8.707-15.768 20.316-18.063 31.405c-1.04 4.895-1.083 13.515-.174 17.543c.737 3.162 2.6 8.404 3.509 9.877c.996 1.516.087 1.126-1.863-.867m66.665-89.492c.217-.217-1.04-1.083-3.379-2.21c-4.375-2.079-7.797-4.461-8.187-5.674c-.346-1.04-.996-1.126-1.342-.217c-.953 2.383 2.902 6.585 7.58 8.317c1.646.607 4.635.477 5.328-.216',
  hex: 'F43F5E',
  viewBox: '0 0 256 256',
}

export interface StackItem {
  name: string
  icon: { path: string; hex?: string; viewBox?: string }
  color?: string
  isMain?: boolean
  link?: string
}

export interface StackCategory {
  id: string
  title: string
  jp: string
  description: string
  items: StackItem[]
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    id: 'languages-frameworks',
    title: 'Bahasa Pemrograman & Frameworks',
    jp: '言語とフレームワーク',
    description:
      'Bahasa inti dan kerangka kerja tingkat lanjut yang digunakan untuk rekayasa perangkat lunak modern.',
    items: [
      // Main Technologies (Outline Biru)
      { name: 'Go', icon: siGo, color: '#00ADD8', isMain: true },
      { name: 'PHP', icon: siPhp, color: '#777BB4', isMain: true },
      { name: 'JavaScript', icon: siJavascript, color: '#F7DF1E', isMain: true },
      { name: 'TypeScript', icon: siTypescript, color: '#3178C6', isMain: true },
      { name: 'Laravel', icon: siLaravel, color: '#FF2D20', isMain: true },
      { name: 'React', icon: siReact, color: '#61DAFB', isMain: true },
      { name: 'Next.js', icon: siNextdotjs, color: '#000000', isMain: true },
      // Regular Technologies
      { name: 'Rust', icon: siRust, color: '#DEA584' },
      { name: 'Elysia.js', icon: ElysiaIcon, color: '#F43F5E' },
      { name: 'Express.js', icon: siExpress, color: '#000000' },
      { name: 'HTML5', icon: siHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: siCss, color: '#1572B6' },
      { name: 'Electron', icon: siElectron, color: '#47848F' },
    ],
  },
  {
    id: 'tools-libraries',
    title: 'Tools & Library',
    jp: 'ツールとライブラリ',
    description:
      'Pustaka runtime, utilitas styling, editor koding modern, containerization, dan web server berkecepatan tinggi.',
    items: [
      // Main Technologies (Outline Biru)
      { name: 'Node.js', icon: siNodedotjs, color: '#5FA04E', isMain: true },
      { name: 'Bun', icon: siBun, color: '#000000', isMain: true },
      { name: 'Composer', icon: siComposer, color: '#885630', isMain: true },
      { name: 'Vite', icon: siVite, color: '#646CFF', isMain: true },
      { name: 'Tailwind CSS', icon: siTailwindcss, color: '#06B6D4', isMain: true },
      { name: 'Framer Motion', icon: siFramer, color: '#0055FF', isMain: true },
      { name: 'Lenis', icon: LenisIcon, color: '#000000', isMain: true },
      { name: 'Podman', icon: siPodman, color: '#892CA0', isMain: true },
      { name: 'Git', icon: siGit, color: '#F03C2E', isMain: true },
      { name: 'Postman', icon: siPostman, color: '#FF6C37', isMain: true },
      { name: 'ngrok', icon: siNgrok, color: '#3B82F6', isMain: true },
      { name: 'Zed', icon: siZedindustries, color: '#084CCF', isMain: true },
      // Regular Technologies
      { name: 'Docker', icon: siDocker, color: '#2496ED' },
      { name: 'Three.js', icon: siThreedotjs, color: '#000000' },
      { name: 'GSAP', icon: siGreensock, color: '#88CE02' },
      { name: 'Pusher', icon: siPusher, color: '#9065FF' },
      { name: 'Filament', icon: siFilament, color: '#FDAE4B' },
      { name: 'JWT', icon: siJsonwebtokens, color: '#FB015B' },
      { name: 'Apache', icon: siApache, color: '#D22128' },
      { name: 'Nginx', icon: siNginx, color: '#009639' },
      { name: 'VS Code', icon: VsCodeIcon, color: '#007ACC' },
    ],
  },
  {
    id: 'ai-assistants',
    title: 'AI & Intelligent Assistants',
    jp: '人工知能・AIツール',
    description:
      'Model bahasa cerdas (LLM), asisten koding otonom berbasis agen cerdas, dan utilitas AI untuk akselerasi alur kerja rekayasa perangkat lunak.',
    items: [
      // Main Technologies (Outline Biru)
      {
        name: 'Antigravity',
        icon: AntigravityIcon,
        color: '#4285F4',
        isMain: true,
      },
      { name: 'Claude', icon: siClaude, color: '#D97757', isMain: true },
      { name: 'Gemini', icon: siGooglegemini, color: '#8E75B2', isMain: true },
      // Regular Technologies
      { name: 'ChatGPT', icon: ChatGptIcon, color: '#10A37F' },
      { name: 'OpenCode', icon: siOpencode, color: '#000000' },
    ],
  },
  {
    id: 'databases-storage',
    title: 'Database & Storage',
    jp: 'データベースとストレージ',
    description:
      'Sistem manajemen basis data relasional, document store noSQL, in-memory cache, dan backend database terdistribusi.',
    items: [
      // Main Technologies (Outline Biru)
      { name: 'MySQL', icon: siMysql, color: '#4479A1', isMain: true },
      { name: 'PostgreSQL', icon: siPostgresql, color: '#4169E1', isMain: true },
      { name: 'MariaDB', icon: siMariadb, color: '#003545', isMain: true },
      { name: 'Supabase', icon: siSupabase, color: '#3FCF8E', isMain: true },
      // Regular Technologies
      { name: 'MongoDB', icon: siMongodb, color: '#47A248' },
      { name: 'SQLite', icon: siSqlite, color: '#38BDF8' },
      { name: 'Redis', icon: siRedis, color: '#FF4438' },
    ],
  },
  {
    id: 'os-environment',
    title: 'Sistem Operasi & Environment',
    jp: 'オペレーティングシステムと環境',
    description:
      'Distribusi Linux harian, window manager, serta sistem operasi yang digunakan untuk development dan server.',
    items: [
      // Main Technologies (Outline Biru)
      {
        name: 'Arch Linux',
        icon: siArchlinux,
        color: '#1793D1',
        isMain: true,
      },
      {
        name: 'Hyprland',
        icon: siHyprland,
        color: '#58E1FF',
        isMain: true,
      },
      {
        name: 'Caelestia Shell',
        icon: siGithub,
        color: '#A855F7',
        link: 'https://github.com/caelestia-dots/caelestia',
        isMain: true,
      },
      // Regular Technologies
      { name: 'Debian', icon: siDebian, color: '#A81D33' },
      { name: 'Ubuntu', icon: siUbuntu, color: '#E95420' },
      { name: 'Windows 11', icon: Windows11Icon, color: '#0078D4' },
    ],
  },
]

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const totalItemsCount = STACK_CATEGORIES.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  )

  const displayedCategories =
    activeCategory === 'all'
      ? STACK_CATEGORIES
      : STACK_CATEGORIES.filter((cat) => cat.id === activeCategory)

  return (
    <section
      id="skills"
      className="relative z-10 w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-[#07070a]/70 text-zinc-950 dark:text-white transition-colors duration-500 overflow-hidden select-none"
    >
      {/* Pendaran Latar Belakang Halus */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Kicker Monospace */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 sm:w-12 bg-blue-600 dark:bg-blue-400" />
            <span className="font-jetbrains text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
              // 04 . TECH STACK & TOOLS / 技術スタック
            </span>
          </div>

          <div className="shrink-0 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-jetbrains text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{totalItemsCount} Verified Technologies</span>
          </div>
        </div>

        {/* Header Judul Utama */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.12]">
              Skills & Development Stack
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
              Daftar teknologi, bahasa pemrograman, kerangka kerja, basis data, dan utilitas DevOps yang saya kuasai dan gunakan secara aktif dalam alur kerja rekayasa perangkat lunak.
            </p>
          </div>
        </div>

        {/* Segmented Filter Tabs Interaktif */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`font-jetbrains text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            Semua ({totalItemsCount})
          </button>

          {STACK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`font-jetbrains text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <span>{cat.title.split('&')[0].trim()}</span>
                <span className="opacity-60 text-[10px]">({cat.items.length})</span>
              </button>
            )
          })}
        </div>

        {/* Categories Stack Showcase */}
        <div className="space-y-10 sm:space-y-12">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category) => (
              <motion.div
                layout
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0c0c11]/80 backdrop-blur-sm shadow-sm space-y-6"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="font-jetbrains font-extrabold text-base sm:text-lg text-zinc-950 dark:text-white">
                      {category.title}
                    </h3>
                    <span className="font-zen text-xs text-zinc-400 dark:text-zinc-500">
                      / {category.jp}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal max-w-xl">
                    {category.description}
                  </p>
                </div>

                {/* Banner Khusus OS & Environment (Arch Linux + Hyprland + Caelestia) */}
                {category.id === 'os-environment' && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 p-4 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent backdrop-blur-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center shrink-0 text-sky-500 dark:text-sky-400">
                        <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                          <path d={siArchlinux.path} />
                        </svg>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-poppins text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                            Daily Driver: Arch Linux + Hyprland
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-jetbrains font-bold uppercase tracking-wider bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                            PRIMARY SYSTEM
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal mt-0.5">
                          Konfigurasi desktop harian dinamis menggunakan{' '}
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Caelestia Shell
                          </span>
                          .
                        </p>
                      </div>
                    </div>

                    <a
                      href="https://github.com/caelestia-dots/caelestia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-jetbrains font-medium text-sky-600 dark:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-all shrink-0 group/link"
                    >
                      <svg role="img" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                        <path d={siGithub.path} />
                      </svg>
                      <span>caelestia-dots/caelestia</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* List Capsule Pills (Dipertahankan bentuk kapsul & diimprovisasi micro-interaction) */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                  {[...category.items]
                    .sort((a, b) => {
                      if (a.isMain && !b.isMain) return -1
                      if (!a.isMain && b.isMain) return 1
                      return 0
                    })
                    .map((item) => {
                      const iconFill = item.color || '#61DAFB'
                      const isMonochrome = item.color === '#000000'
                      const isLinked = Boolean(item.link)
                      const isMain = Boolean(item.isMain)

                      const pillContent = (
                        <>
                          {/* Indicator dot untuk teknologi utama */}
                          {isMain && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                          )}

                          {/* Icon Brand Berwarna dari Simple Icons / Custom SVG */}
                          <span
                            className={`flex items-center justify-center shrink-0 w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:scale-110 ${
                              isMonochrome ? 'text-zinc-950 dark:text-white' : ''
                            }`}
                            style={isMonochrome ? undefined : { color: iconFill }}
                          >
                            <svg
                              role="img"
                              viewBox={item.icon.viewBox || '0 0 24 24'}
                              className="w-full h-full fill-current"
                            >
                              <path d={item.icon.path} />
                            </svg>
                          </span>

                          {/* Nama Teknologi */}
                          <span className="font-poppins text-xs sm:text-sm font-medium tracking-wide">
                            {item.name}
                          </span>

                          {/* Icon External Link jika memiliki tautan repo */}
                          {isLinked && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                            >
                              <path d="M15 3h6v6" />
                              <path d="M10 14L21 3" />
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            </svg>
                          )}
                        </>
                      )

                      const containerClasses = `group inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full border transition-all duration-200 select-none ${
                        isMain
                          ? 'border-blue-500/80 dark:border-blue-400/80 bg-white/90 dark:bg-[#121217]/95 text-zinc-950 dark:text-white shadow-xs hover:border-blue-600 dark:hover:border-blue-300 ring-1 ring-blue-500/30 dark:ring-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.18)]'
                          : 'border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-[#121217]/80 text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-2xs hover:shadow-xs'
                      } ${
                        isLinked
                          ? 'cursor-pointer hover:scale-[1.03]'
                          : 'cursor-default hover:scale-[1.03]'
                      }`

                      if (isLinked && item.link) {
                        return (
                          <a
                            key={item.name}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={containerClasses}
                          >
                            {pillContent}
                          </a>
                        )
                      }

                      return (
                        <div key={item.name} className={containerClasses}>
                          {pillContent}
                        </div>
                      )
                    })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
