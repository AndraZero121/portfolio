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
  siGithub,
  siBun,
  siZedindustries,
  siClaude,
  siGooglegemini,
  siOpencode,
  siComposer,
  siTypescript,
} from 'simple-icons'

// Custom Official SVGs untuk Windows 11, VS Code, ChatGPT, dan Antigravity
const Windows11Icon = {
  path: 'M0 0h11v11H0zm13 0h11v11H13zM0 13h11v11H0zm13 0h11v11H13z',
  hex: '0078D4',
}

const VsCodeIcon = {
  path: 'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z',
  hex: '007ACC',
}

const ChatGptIcon = {
  path: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
  hex: '10A37F',
  viewBox: '0 0 24 24',
}

const AntigravityIcon = {
  path: 'M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z',
  hex: '4285F4',
  viewBox: '0 0 16 15',
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
      { name: 'Go', icon: siGo, color: '#00ADD8', isMain: true },
      { name: 'Rust', icon: siRust, color: '#DEA584' },
      { name: 'PHP', icon: siPhp, color: '#777BB4', isMain: true },
      { name: 'JavaScript', icon: siJavascript, color: '#F7DF1E', isMain: true },
      { name: 'TypeScript', icon: siTypescript, color: '#3178C6', isMain: true },
      { name: 'HTML5', icon: siHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: siCss, color: '#1572B6' },
      { name: 'Laravel', icon: siLaravel, color: '#FF2D20', isMain: true },
      { name: 'Express.js', icon: siExpress, color: '#000000' },
      { name: 'React', icon: siReact, color: '#61DAFB' },
      { name: 'Next.js', icon: siNextdotjs, color: '#000000' },
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
      { name: 'Node.js', icon: siNodedotjs, color: '#5FA04E' },
      { name: 'Bun', icon: siBun, color: '#000000', isMain: true },
      { name: 'Composer', icon: siComposer, color: '#885630', isMain: true },
      { name: 'Vite', icon: siVite, color: '#646CFF', isMain: true },
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
      { name: 'Zed', icon: siZedindustries, color: '#084CCF', isMain: true },
    ],
  },
  {
    id: 'ai-assistants',
    title: 'AI & Intelligent Assistants',
    jp: '人工知能・AIツール',
    description:
      'Model bahasa cerdas (LLM), asisten koding otonom berbasis agen cerdas, dan utilitas AI untuk akselerasi alur kerja rekayasa perangkat lunak.',
    items: [
      { name: 'ChatGPT', icon: ChatGptIcon, color: '#10A37F' },
      { name: 'Claude', icon: siClaude, color: '#D97757' },
      { name: 'Gemini', icon: siGooglegemini, color: '#8E75B2' },
      {
        name: 'Antigravity',
        icon: AntigravityIcon,
        color: '#4285F4',
        isMain: true,
      },
      {
        name: 'OpenCode',
        icon: siOpencode,
        color: '#000000',
      },
    ],
  },
  {
    id: 'databases-storage',
    title: 'Database & Storage',
    jp: 'データベースとストレージ',
    description:
      'Sistem manajemen basis data relasional, document store noSQL, in-memory cache, dan backend database terdistribusi.',
    items: [
      { name: 'MySQL', icon: siMysql, color: '#4479A1' },
      { name: 'PostgreSQL', icon: siPostgresql, color: '#4169E1' },
      { name: 'MariaDB', icon: siMariadb, color: '#003545' },
      { name: 'MongoDB', icon: siMongodb, color: '#47A248' },
      { name: 'SQLite', icon: siSqlite, color: '#38BDF8' },
      { name: 'Redis', icon: siRedis, color: '#FF4438' },
      { name: 'Supabase', icon: siSupabase, color: '#3FCF8E' },
    ],
  },
  {
    id: 'os-environment',
    title: 'Sistem Operasi & Environment',
    jp: 'オペレーティングシステムと環境',
    description:
      'Distribusi Linux harian, window manager, serta sistem operasi yang digunakan untuk development dan server.',
    items: [
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
      },
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

                {/* Highlight Callout Khusus untuk OS Environment */}
                {category.id === 'os-environment' && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 p-4 rounded-2xl border border-sky-500/25 bg-gradient-to-r from-sky-500/5 via-sky-500/10 to-transparent dark:from-sky-500/10 dark:via-sky-500/5 dark:to-transparent backdrop-blur-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/15 dark:bg-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-500 dark:text-sky-400">
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
                            Main OS
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
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-jetbrains font-medium text-sky-600 dark:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 dark:bg-sky-500/15 dark:hover:bg-sky-500/25 border border-sky-500/30 transition-all shrink-0 group/link shadow-2xs hover:shadow-sm"
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

                {/* List Capsule Pills Sesuai UI Mockup Gambar 2 */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
                  {category.items.map((item) => {
                    const iconFill = item.color || '#61DAFB'
                    const isMonochrome = item.color === '#000000'
                    const isLinked = Boolean(item.link)

                    const pillContent = (
                      <>
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

                        {/* Nama Teknologi Berfont Poppins Sesuai Standar UI Gambar 2 */}
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

                    const isMain = Boolean(item.isMain)

                    const containerClasses = `group inline-flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full border transition-all duration-200 select-none ${
                      isMain
                        ? 'border-blue-500 dark:border-blue-400 bg-white dark:bg-[#121217] text-zinc-950 dark:text-white shadow-2xs hover:border-blue-600 dark:hover:border-blue-300 ring-1 ring-blue-500/25 dark:ring-blue-400/25'
                        : 'border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#121217] text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-2xs'
                    } ${
                      isLinked
                        ? 'cursor-pointer hover:shadow-sm hover:scale-[1.03]'
                        : 'cursor-default hover:shadow-sm hover:scale-[1.03]'
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
