import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  siGo,
  siRust,
  siPhp,
  siJavascript,
  siHtml5,
  siCss,
  siLaravel,
  siExpress,
  siReact,
  siNextdotjs,
  siElectron,
  siNodedotjs,
  siVite,
  siTailwindcss,
  siFramer,
  siPusher,
  siFilament,
  siJsonwebtokens,
  siDocker,
  siPodman,
  siGit,
  siPostman,
  siApache,
  siNginx,
  siNgrok,
  siMysql,
  siPostgresql,
  siMariadb,
  siMongodb,
  siSqlite,
  siRedis,
  siSupabase,
  siArchlinux,
  siHyprland,
  siDebian,
  siUbuntu,
} from 'simple-icons'

// Custom Official SVGs untuk Windows 11 & VS Code
const Windows11Icon = {
  path: 'M0 0h11v11H0zm13 0h11v11H13zM0 13h11v11H0zm13 0h11v11H13z',
  hex: '0078D4',
}

const VsCodeIcon = {
  path: 'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z',
  hex: '007ACC',
}

export interface StackItem {
  name: string
  icon: { path: string; hex?: string }
  color?: string
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
      { name: 'Go', icon: siGo, color: '#00ADD8' },
      { name: 'Rust', icon: siRust, color: '#DEA584' },
      { name: 'PHP', icon: siPhp, color: '#777BB4' },
      { name: 'JavaScript', icon: siJavascript, color: '#F7DF1E' },
      { name: 'HTML5', icon: siHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: siCss, color: '#1572B6' },
      { name: 'Laravel', icon: siLaravel, color: '#FF2D20' },
      { name: 'Express.js', icon: siExpress, color: '#FFFFFF' },
      { name: 'React', icon: siReact, color: '#61DAFB' },
      { name: 'Next.js', icon: siNextdotjs, color: '#FFFFFF' },
      { name: 'Electron', icon: siElectron, color: '#47848F' },
    ],
  },
  {
    id: 'tools-libraries',
    title: 'Tools & Library',
    jp: 'ツールとライブラリ',
    description:
      'Pustaka runtime, utilitas styling, tools pengujian API, containerization, dan web server berkecepatan tinggi.',
    items: [
      { name: 'Node.js', icon: siNodedotjs, color: '#5FA04E' },
      { name: 'Vite', icon: siVite, color: '#646CFF' },
      { name: 'Tailwind CSS', icon: siTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: siFramer, color: '#0055FF' },
      { name: 'Pusher', icon: siPusher, color: '#9065FF' },
      { name: 'Filament', icon: siFilament, color: '#FDAE4B' },
      { name: 'JWT', icon: siJsonwebtokens, color: '#FB015B' },
      { name: 'Docker', icon: siDocker, color: '#2496ED' },
      { name: 'Podman', icon: siPodman, color: '#892CA0' },
      { name: 'Git', icon: siGit, color: '#F03C2E' },
      { name: 'Postman', icon: siPostman, color: '#FF6C37' },
      { name: 'Apache', icon: siApache, color: '#D22128' },
      { name: 'Nginx', icon: siNginx, color: '#009639' },
      { name: 'ngrok', icon: siNgrok, color: '#3B82F6' },
      { name: 'VS Code', icon: VsCodeIcon, color: '#007ACC' },
    ],
  },
  {
    id: 'others',
    title: 'Kategori Lainnya',
    jp: 'データベース・OS環境',
    description:
      'Database relasional & non-relasional, caching, backend-as-a-service, dan sistem operasi Linux & desktop.',
    items: [
      { name: 'MySQL', icon: siMysql, color: '#4479A1' },
      { name: 'PostgreSQL', icon: siPostgresql, color: '#4169E1' },
      { name: 'MariaDB', icon: siMariadb, color: '#003545' },
      { name: 'MongoDB', icon: siMongodb, color: '#47A248' },
      { name: 'SQLite', icon: siSqlite, color: '#38BDF8' },
      { name: 'Redis', icon: siRedis, color: '#FF4438' },
      { name: 'Supabase', icon: siSupabase, color: '#3FCF8E' },
      { name: 'Arch Linux', icon: siArchlinux, color: '#1793D1' },
      { name: 'Hyprland', icon: siHyprland, color: '#58E1FF' },
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
      className="relative z-10 w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center border-t border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-[#07070a] text-zinc-950 dark:text-white transition-colors duration-500 overflow-hidden select-none"
    >
      {/* Pendaran Latar Belakang Halus */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Kicker Monospace */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="h-[1px] w-8 sm:w-12 bg-blue-600 dark:bg-blue-400" />
          <span className="font-jetbrains text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
            // 03 . TECH STACK & TOOLS / 技術スタック
          </span>
        </div>

        {/* Header Judul Utama */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
              Skills & Development Stack
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
              Daftar teknologi, bahasa pemrograman, kerangka kerja, basis data, dan utilitas DevOps yang saya kuasai dan gunakan secara aktif dalam alur kerja rekayasa perangkat lunak.
            </p>
          </div>

          {/* Total Badge */}
          <div className="shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-jetbrains text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{totalItemsCount} Technologies</span>
          </div>
        </div>

        {/* Filter Tabs Interaktif */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`font-jetbrains text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
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
                className={`font-jetbrains text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <span>{cat.title}</span>
                <span className="ml-1.5 text-[10px] opacity-75 font-normal">
                  ({cat.items.length})
                </span>
              </button>
            )
          })}
        </div>

        {/* Konten Kategori Stack: Menggunakan Desain Capsule Pills (Sesuai Mockup UI Image 2) */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {displayedCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Header Kategori */}
                <div className="flex items-baseline justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                      {category.title}
                    </h3>
                    <span className="font-jetbrains text-xs text-zinc-400 dark:text-zinc-500 font-normal">
                      / {category.jp}
                    </span>
                  </div>
                  <span className="font-jetbrains text-xs text-zinc-500 dark:text-zinc-400">
                    {category.items.length} tools
                  </span>
                </div>

                {/* List Capsule Pills Sesuai UI Mockup Gambar 2 */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                  {category.items.map((item) => {
                    const iconFill = item.color || '#61DAFB'

                    return (
                      <div
                        key={item.name}
                        className="group inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#121217] text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-2xs hover:shadow-sm hover:scale-[1.03] transition-all duration-200 cursor-default select-none"
                      >
                        {/* Icon Brand Berwarna dari Simple Icons */}
                        <span
                          className="flex items-center justify-center shrink-0 w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:scale-110"
                          style={{ color: iconFill }}
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            className="w-full h-full fill-current"
                          >
                            <path d={item.icon.path} />
                          </svg>
                        </span>

                        {/* Nama Teknologi Berfont Poppins Sesuai Standar UI Gambar 2 */}
                        <span className="font-poppins text-xs sm:text-sm font-medium tracking-wide">
                          {item.name}
                        </span>
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
