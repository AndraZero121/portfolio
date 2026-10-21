import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ExternalLink,
  ArrowUpRight,
  Star,
  GitFork,
  Globe,
  FolderGit2,
  ChevronDown,
} from 'lucide-react'
import { siGithub } from 'simple-icons'
import { DEFAULT_WORKS, getWorksFn, type WorkRepo } from '#/server/works'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" className={className || 'w-3.5 h-3.5 fill-current'}>
    <path d={siGithub.path} />
  </svg>
)

export default function WorksSection() {
  const [works, setWorks] = useState<WorkRepo[]>(DEFAULT_WORKS)
  const [accountFilter, setAccountFilter] = useState<'all' | 'untrustnova' | 'AndraZero121'>('all')
  const [languageFilter, setLanguageFilter] = useState<string>('all')
  const [isExpanded, setIsExpanded] = useState(false)

  // Ambil data terbaru secara asinkron via server function TanStack Start
  useEffect(() => {
    let isMounted = true
    getWorksFn()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setWorks(data)
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat repositori GitHub terbaru, menggunakan data statis:', err)
      })
    return () => {
      isMounted = false
    }
  }, [])

  // Daftar bahasa yang unik dari karya yang tersedia
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>()
    works.forEach((w) => {
      if (w.language) langs.add(w.language)
    })
    return Array.from(langs)
  }, [works])

  // Filter karya berdasarkan akun GitHub dan bahasa
  const filteredWorks = useMemo(() => {
    return works.filter((w) => {
      const matchAccount = accountFilter === 'all' || w.owner === accountFilter
      const matchLang = languageFilter === 'all' || w.language === languageFilter
      return matchAccount && matchLang
    })
  }, [works, accountFilter, languageFilter])

  // Total hitungan per akun
  const countUntrustnova = useMemo(() => works.filter((w) => w.owner === 'untrustnova').length, [works])
  const countAndraZero121 = useMemo(() => works.filter((w) => w.owner === 'AndraZero121').length, [works])

  // Batasi karya yang ditampilkan menjadi 3 item (berlaku untuk desktop & mobile)
  const visibleWorks = useMemo(() => {
    return isExpanded ? filteredWorks : filteredWorks.slice(0, 3)
  }, [filteredWorks, isExpanded])

  // Fungsi toggle ekspansi karya dengan scroll mulus jika ditutup
  const handleToggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false)
      const section = document.getElementById('works')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <section
      id="works"
      className="relative z-10 w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center border-t border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-[#050507] text-zinc-950 dark:text-white transition-colors duration-500 overflow-hidden"
    >
      {/* Anchor pendukung untuk link `#projects` agar kompatibel dengan menu navbar */}
      <span id="projects" className="absolute -top-24 opacity-0 pointer-events-none" aria-hidden="true" />

      {/* Pendaran Latar Belakang Halus */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-1/4 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-600/8 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Kicker Monospace */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="h-[1px] w-8 sm:w-12 bg-blue-600 dark:bg-blue-400" />
          <span className="font-jetbrains text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
            // 03 . FEATURED WORKS / 実績
          </span>
        </div>

        {/* Header Judul Utama */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
              Selected Works & Open Source
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
              Kompilasi proyek open source, framework, perkakas CLI, dan aplikasi terpilih yang saya kembangkan di organisasi{' '}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-200">untrustnova</strong>{' '}
              dan profil personal{' '}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-200">AndraZero121</strong>.
            </p>
          </div>

          {/* Badge Total Repositori */}
          <div className="shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-jetbrains text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-xs">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
            <span>{works.length} Curated Repositories</span>
          </div>
        </div>

        {/* Filter Bar: Tab Organisasi & Filter Bahasa */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {/* Akun Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setAccountFilter('all')
                setIsExpanded(false)
              }}
              className={`font-jetbrains text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                accountFilter === 'all'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                  : 'bg-zinc-200/70 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              Semua ({works.length})
            </button>

            <button
              type="button"
              onClick={() => {
                setAccountFilter('untrustnova')
                setIsExpanded(false)
              }}
              className={`font-jetbrains text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                accountFilter === 'untrustnova'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                  : 'bg-zinc-200/70 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>untrustnova</span>
              <span className="opacity-70 text-[10px]">({countUntrustnova})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAccountFilter('AndraZero121')
                setIsExpanded(false)
              }}
              className={`font-jetbrains text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                accountFilter === 'AndraZero121'
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                  : 'bg-zinc-200/70 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>AndraZero121</span>
              <span className="opacity-70 text-[10px]">({countAndraZero121})</span>
            </button>
          </div>

          {/* Bahasa Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-500 font-jetbrains mr-1 hidden lg:inline-block">
              Bahasa:
            </span>
            <button
              type="button"
              onClick={() => {
                setLanguageFilter('all')
                setIsExpanded(false)
              }}
              className={`font-jetbrains text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                languageFilter === 'all'
                  ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-950 dark:text-white font-bold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              All
            </button>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setLanguageFilter(lang)
                  setIsExpanded(false)
                }}
                className={`font-jetbrains text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  languageFilter === lang
                    ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-950 dark:text-white font-bold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Kartu Karya: 1 Kolom Mobile, 2 Kolom Tablet, 3 Kolom Desktop */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleWorks.map((work) => {
              const isUntrustnova = work.owner === 'untrustnova'

              return (
                <motion.div
                  layout
                  key={work.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-[#0c0c10]/80 p-5 sm:p-6 backdrop-blur-xs transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/50"
                >
                  {/* Watermark Tipografi Halus di Sudut Kartu */}
                  <div
                    aria-hidden="true"
                    className="absolute top-2 right-4 text-6xl font-black text-zinc-200/30 dark:text-zinc-800/20 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:text-zinc-300/40 dark:group-hover:text-zinc-700/30 font-jetbrains"
                  >
                    {isUntrustnova ? 'NV' : 'AZ'}
                  </div>

                  <div>
                    {/* Baris Atas: Akun Badge & GitHub Stats (Stars / Forks) */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-jetbrains font-semibold tracking-wide border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isUntrustnova ? 'bg-purple-500' : 'bg-blue-500'
                          }`}
                        />
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {work.owner}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs text-zinc-500 font-jetbrains">
                        {work.stars > 0 && (
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{work.stars}</span>
                          </span>
                        )}
                        {work.forks > 0 && (
                          <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                            <GitFork className="w-3.5 h-3.5" />
                            <span>{work.forks}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Judul Repositori & Subtitle Jepang */}
                    <div className="mb-2 relative z-10">
                      <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title inline-flex items-center gap-1.5 font-jetbrains font-extrabold text-base sm:text-lg text-zinc-950 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <span className="break-all">{work.name}</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                      </a>
                      <div className="font-sans text-[11px] text-zinc-400 dark:text-zinc-500 font-normal mt-0.5">
                        / {work.jpTitle}
                      </div>
                    </div>

                    {/* Deskripsi Alami & Jujur */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed mb-4 min-h-[3.6rem] relative z-10">
                      {work.description}
                    </p>

                    {/* Bahasa Pemrograman & Tags Topik */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-5 relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-jetbrains font-semibold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700/60">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: work.languageColor }}
                        />
                        <span>{work.language}</span>
                      </span>

                      {work.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded-md text-[10px] font-jetbrains font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tombol Aksi Bawah: Link GitHub & Link Demo/Website jika tersedia */}
                  <div className="pt-3.5 border-t border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between gap-2 relative z-10">
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-jetbrains font-bold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>

                    {work.liveUrl ? (
                      <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-jetbrains font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                      >
                        <Globe className="w-3 h-3" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-jetbrains text-zinc-400 dark:text-zinc-600">
                        Library / Core
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Tombol Tampilkan Lebih Banyak / Lebih Sedikit (Berlaku untuk Desktop & Mobile) */}
        {filteredWorks.length > 3 && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleToggleExpand}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Tampilkan lebih sedikit karya' : 'Tampilkan semua karya'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white font-jetbrains text-xs font-semibold shadow-xs hover:border-zinc-950 dark:hover:border-white transition-all cursor-pointer select-none active:scale-95"
            >
              <span>
                {isExpanded
                  ? 'Tampilkan Lebih Sedikit'
                  : `Lihat Lebih Banyak (+${filteredWorks.length - 3})`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}

        {/* Footer Section: Hubungan ke Profil GitHub */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-normal text-center sm:text-left">
            Ingin melihat seluruh ekosistem repositori, arsitektur, dan kode lainnya?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/untrustnova"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-jetbrains text-xs font-semibold hover:border-zinc-950 dark:hover:border-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/untrustnova</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://github.com/AndraZero121"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-jetbrains text-xs font-semibold hover:border-zinc-950 dark:hover:border-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/AndraZero121</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
