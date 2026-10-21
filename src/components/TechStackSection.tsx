import { motion } from 'motion/react'
import {
  siGo,
  siRust,
  siPhp,
  siJavascript,
  siTypescript,
  siPython,
  siHtml5,
  siCss,
  siLaravel,
  siReact,
  siNextdotjs,
  siExpress,
  siNodedotjs,
  siAstro,
  siElectron,
  siPusher,
  siFilament,
  siTailwindcss,
  siVite,
  siFramer,
  siGit,
  siDocker,
  siPodman,
  siPostman,
  siNginx,
  siApache,
  siJsonwebtokens,
  siNgrok,
  siFigma,
  siMysql,
  siPostgresql,
  siMariadb,
  siMongodb,
  siSqlite,
  siRedis,
  siSupabase,
  siArchlinux,
  siDebian,
  siUbuntu,
  siLinux,
  siHyprland,
  siCisco,
  siMikrotik,
  siVmware,
  siVirtualbox,
} from 'simple-icons'

interface StackItem {
  name: string
  bg: string
  darkText?: boolean
  path: string
}

interface StackCategory {
  title: string
  subtitle: string
  icon: string
  items: StackItem[]
}

// Custom SVG path untuk icon yang tidak disertakan dalam versi simple-icons saat ini
const VS_CODE_PATH =
  'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z'

const WINDOWS_11_PATH =
  'M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z'

const TECH_CATEGORIES: StackCategory[] = [
  // =========================================================================
  // KATEGORI 1: BAHASA PEMROGRAMAN DAN FRAMEWORKS
  // =========================================================================
  {
    title: 'Bahasa Pemrograman & Frameworks',
    subtitle: 'Languages & Frameworks / 言語とフレームワーク',
    icon: '⚡',
    items: [
      { name: 'Go', bg: '#00ADD8', path: siGo.path },
      { name: 'Rust', bg: '#000000', path: siRust.path },
      { name: 'PHP', bg: '#777BB4', path: siPhp.path },
      { name: 'JavaScript', bg: '#F7DF1E', darkText: true, path: siJavascript.path },
      { name: 'TypeScript', bg: '#3178C6', path: siTypescript.path },
      { name: 'Python', bg: '#3776AB', path: siPython.path },
      { name: 'HTML5', bg: '#E34F26', path: siHtml5.path },
      { name: 'CSS3', bg: '#1572B6', path: siCss.path },
      { name: 'Laravel', bg: '#FF2D20', path: siLaravel.path },
      { name: 'React', bg: '#61DAFB', darkText: true, path: siReact.path },
      { name: 'Next.js', bg: '#000000', path: siNextdotjs.path },
      { name: 'Express.js', bg: '#000000', path: siExpress.path },
      { name: 'Node.js', bg: '#339933', path: siNodedotjs.path },
      { name: 'Astro', bg: '#BC52EE', path: siAstro.path },
      { name: 'Electron', bg: '#47848F', path: siElectron.path },
      { name: 'Filament', bg: '#D97706', path: siFilament.path },
    ],
  },

  // =========================================================================
  // KATEGORI 2: TOOLS DAN LIBRARY
  // =========================================================================
  {
    title: 'Tools & Library',
    subtitle: 'Tools & Libraries / ツールとライブラリ',
    icon: '🛠️',
    items: [
      { name: 'Tailwind CSS', bg: '#06B6D4', path: siTailwindcss.path },
      { name: 'Vite', bg: '#646CFF', path: siVite.path },
      { name: 'Framer Motion', bg: '#0055FF', path: siFramer.path },
      { name: 'Pusher', bg: '#300D4F', path: siPusher.path },
      { name: 'Git', bg: '#F05032', path: siGit.path },
      { name: 'Docker', bg: '#2496ED', path: siDocker.path },
      { name: 'Podman', bg: '#892CA0', path: siPodman.path },
      { name: 'Postman', bg: '#FF6C37', path: siPostman.path },
      { name: 'Apache', bg: '#D22128', path: siApache.path },
      { name: 'Nginx', bg: '#009639', path: siNginx.path },
      { name: 'JWT', bg: '#000000', path: siJsonwebtokens.path },
      { name: 'Ngrok', bg: '#1F1E24', path: siNgrok.path },
      { name: 'VSCode', bg: '#007ACC', path: VS_CODE_PATH },
      { name: 'Figma', bg: '#F24E1E', path: siFigma.path },
    ],
  },

  // =========================================================================
  // KATEGORI 3: KATEGORI LAINNYA (DATABASES, OS & ENVIRONMENT)
  // =========================================================================
  {
    title: 'Kategori Lainnya',
    subtitle: 'Databases, OS & Environment / データベース・環境・インフラ',
    icon: '🗄️',
    items: [
      { name: 'MySQL', bg: '#4479A1', path: siMysql.path },
      { name: 'PostgreSQL', bg: '#4169E1', path: siPostgresql.path },
      { name: 'MariaDB', bg: '#003545', path: siMariadb.path },
      { name: 'MongoDB', bg: '#47A248', path: siMongodb.path },
      { name: 'SQLite', bg: '#003B57', path: siSqlite.path },
      { name: 'Redis', bg: '#DC382D', path: siRedis.path },
      { name: 'Supabase', bg: '#3ECF8E', darkText: true, path: siSupabase.path },
      { name: 'Arch Linux', bg: '#1793D1', path: siArchlinux.path },
      { name: 'Hyprland', bg: '#00ACC1', path: siHyprland.path },
      { name: 'Debian', bg: '#A80030', path: siDebian.path },
      { name: 'Ubuntu', bg: '#E95420', path: siUbuntu.path },
      { name: 'Windows 11', bg: '#0078D4', path: WINDOWS_11_PATH },
      { name: 'Linux', bg: '#FCC624', darkText: true, path: siLinux.path },
      { name: 'Cisco', bg: '#1BA0D7', path: siCisco.path },
      { name: 'MikroTik', bg: '#222222', path: siMikrotik.path },
      { name: 'VMware', bg: '#607078', path: siVmware.path },
      { name: 'VirtualBox', bg: '#183A61', path: siVirtualbox.path },
    ],
  },
]

export default function TechStackSection() {
  return (
    <section
      id="stack"
      className="relative z-10 w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#050507] text-zinc-950 dark:text-white transition-colors duration-500 overflow-hidden select-none"
    >
      {/* Anchor pendukung untuk navigasi navbar (#skills & #stack) */}
      <span id="skills" className="absolute -top-24 opacity-0 pointer-events-none" />

      {/* Pendaran Cahaya Halus di Latar Belakang Section */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-5xl w-full mx-auto">
        {/* Kicker / Subheading Monospace */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="h-[1px] w-8 sm:w-12 bg-blue-600 dark:bg-blue-400" />
          <span className="font-jetbrains text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
            // 03 . TECH STACK & TOOLS / 技術スタック
          </span>
        </div>

        {/* Section Header: Laptop Icon + Tech Stack Title */}
        <div className="mb-10 sm:mb-14 pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">💻</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white font-sans">
              Tech Stack
            </h2>
          </div>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Daftar lengkap bahasa pemrograman, framework, pustaka, basis data, dan alat sistem yang saya gunakan dalam membangun aplikasi modern berkinerja tinggi.
          </p>
        </div>

        {/* 3 Blok Kategori Tech Stack */}
        <div className="space-y-10 sm:space-y-12">
          {TECH_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3.5 sm:space-y-4"
            >
              {/* Category Subtitle & Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">{category.icon}</span>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <span className="hidden sm:inline-block font-jetbrains text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {category.subtitle}
                </span>
              </div>

              {/* Flexbox Badges Sesuai UI Desain: Solid Brand Background, Sharp Icon & Bold Text */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {category.items.map((item) => {
                  const isDarkColor = !item.darkText
                  const textColor = isDarkColor ? '#ffffff' : '#000000'
                  const isBlackBg = item.bg === '#000000' || item.bg === '#1F1E24' || item.bg === '#222222'

                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                      style={{
                        backgroundColor: item.bg,
                        color: textColor,
                      }}
                      className={`inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded shadow-xs transition-shadow duration-200 hover:shadow-md cursor-default select-none ${
                        isBlackBg
                          ? 'border border-zinc-700/60 dark:border-zinc-700/80'
                          : 'border border-black/10 dark:border-white/10'
                      }`}
                    >
                      {/* SVG Brand Icon dari Simple Icons */}
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0"
                      >
                        <path d={item.path} />
                      </svg>

                      {/* Brand Label Name: Bold, Uppercase, Monospace Modern */}
                      <span className="font-jetbrains text-[11px] sm:text-xs font-bold tracking-wider uppercase leading-none">
                        {item.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
