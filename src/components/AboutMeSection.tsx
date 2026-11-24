import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ExternalLink, Terminal, MapPin, Award } from 'lucide-react'

export interface RoadmapItem {
  year: string
  title: string
  institution: {
    name: string
    url: string
    short: string
    logo: string
  }
  description: ReactNode
  badge: string
  tag: string
  isCurrentOrFuture?: boolean
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    year: '2022 - 2023',
    title: 'First Code & Web Architecture',
    badge: 'LOG.01 // FOUNDATION',
    tag: 'Web Fundamentals',
    institution: {
      name: 'SMPN 35 Semarang',
      url: 'https://smpn35.semarangkota.go.id/',
      short: '35',
      logo: 'https://upload.wikimedia.org/wikipedia/id/3/37/Smpn_35_smrg.png?utm_source=id.wikipedia.org&utm_campaign=imageinfo&utm_content=original',
    },
    description: (
      <>
        Awal mula perjalanan koding dengan membangun landing page interaktif berbasis{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          HTML, CSS, dan JavaScript
        </strong>{' '}
        saat masih menempuh pendidikan di{' '}
        <a
          href="https://smpn35.semarangkota.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 underline decoration-blue-500/40 underline-offset-2 hover:decoration-blue-500 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>SMPN 35 Semarang</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70 inline" />
        </a>
        .
      </>
    ),
  },
  {
    year: '2024',
    title: 'SMK Palapa & Juara 3 LKS Web Tech',
    badge: 'LOG.02 // COMPETITION',
    tag: 'PHP & Laravel Core',
    institution: {
      name: 'SMK Palapa Semarang',
      url: 'https://smkpalapasemarang.sch.id',
      short: 'PLP',
      logo: 'https://smkpalapasemarang.sch.id/images/logo.jpg',
    },
    description: (
      <>
        Menempuh jurusan Rekayasa Perangkat Lunak (RPL) di{' '}
        <a
          href="https://smkpalapasemarang.sch.id"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 underline decoration-blue-500/40 underline-offset-2 hover:decoration-blue-500 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>SMK Palapa Semarang</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70 inline" />
        </a>
        , memperdalam fondasi arsitektur database,{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          PHP & Laravel
        </strong>
        , serta menorehkan prestasi{' '}
        <strong className="font-semibold text-amber-600 dark:text-amber-400">
          Juara 3 LKS Web Technologies
        </strong>{' '}
        tingkat kota di SMKN 8 Semarang.
      </>
    ),
  },
  {
    year: '2025',
    title: 'Crocodic Studio & Inisiasi Novarsity',
    badge: 'LOG.03 // INDUSTRY',
    tag: 'Enterprise & Organization',
    institution: {
      name: 'Crocodic Studio',
      url: 'https://crocodic.com',
      short: 'CRD',
      logo: 'https://crocodic.com/wp-content/uploads/2023/07/cropped-fav_icon_crocrocodic-2.png',
    },
    description: (
      <>
        Menjalani Kelas Industri & magang intensif di{' '}
        <a
          href="https://crocodic.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 underline decoration-blue-500/40 underline-offset-2 hover:decoration-blue-500 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Crocodic</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70 inline" />
        </a>{' '}
        Tembalang, meraih piagam apresiasi{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          Bank Jateng Syariah
        </strong>
        , menginisiasi ekosistem open-source Untrustnova, hingga mendirikan{' '}
        <a
          href="https://github.com/untrustnova"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 underline decoration-blue-500/40 underline-offset-2 hover:decoration-blue-500 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Novarsity Digital Indonesia</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70 inline" />
        </a>
        .
      </>
    ),
  },
  {
    year: '2026',
    title: 'Lulusan Terbaik & Evaluasi Ketekunan',
    badge: 'LOG.04 // GRADUATION',
    tag: 'Academic Milestone',
    institution: {
      name: 'SMK Palapa Semarang',
      url: 'https://smkpalapasemarang.sch.id',
      short: 'PLP',
      logo: 'https://smkpalapasemarang.sch.id/images/logo.jpg',
    },
    description: (
      <>
        Menyelesaikan studi kejuruan sebagai{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          Lulusan Terbaik
        </strong>{' '}
        dari SMK Palapa & Kelas Industri Crocodic, serta memetik banyak evaluasi berharga dari ajang kompetisi kejuruan terakhir untuk mematangkan kedisiplinan rekayasa sistem.
      </>
    ),
  },
  {
    year: 'KEDEPANNYA',
    title: 'Continuous Growth & System Evolution',
    badge: 'LOG.05 // HORIZON',
    tag: 'Future Directive',
    institution: {
      name: 'Novarsity Digital Indonesia',
      url: 'https://github.com/untrustnova',
      short: 'NDI',
      logo: 'https://avatars.githubusercontent.com/u/98293031?s=200&v=4',
    },
    description: (
      <>
        <span className="italic text-zinc-600 dark:text-zinc-300">
          &ldquo;I hope that I will become a better person next time :3&rdquo;
        </span>{' '}
        : bertekad untuk terus berkembang sebagai{' '}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          Backend Developer & DevOps Engineer
        </strong>{' '}
        andal, memperluas kapabilitas arsitektur distributed systems dan automasi cloud di{' '}
        <a
          href="https://github.com/untrustnova"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 underline decoration-blue-500/40 underline-offset-2 hover:decoration-blue-500 transition-colors inline-flex items-center gap-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Novarsity</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70 inline" />
        </a>
        .
      </>
    ),
    isCurrentOrFuture: true,
  },
]

export default function AboutMeSection() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const activeItem = ROADMAP_ITEMS[activeTab]

  return (
    <section
      id="about"
      className="relative z-10 w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-[#07070a]/70 backdrop-blur-xs text-zinc-950 dark:text-white transition-colors duration-500"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Kicker Header Monospace */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 sm:w-12 bg-blue-600 dark:bg-blue-400" />
            <span className="font-jetbrains text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
              // 02 . ARCHITECT DOSSIER / 開発者概要
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-jetbrains text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ID: AZ-2026 // READY</span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* DOSSIER HERO GRID: Foto Berbingkai Cyber + Narasi Identitas Personal */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 sm:mb-20">
          {/* Kolom Kiri: Foto Profil dengan Cyber HUD Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="group relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-300 dark:border-zinc-700/80 bg-zinc-100 dark:bg-zinc-900 shadow-xl transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
              {/* Foto Profil Asli */}
              <img
                src="/aznew.jpg"
                alt="Diandra Anursa Syabandira (AndraZero121)"
                className="w-full h-full object-cover object-center grayscale-15 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-102"
              />

              {/* Cyber Frame Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-500 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-500 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-blue-500 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-blue-500 pointer-events-none" />

              {/* Watermark Tipografi Katakana Jepang */}
              <div
                aria-hidden="true"
                className="absolute top-4 right-4 text-xs font-zen font-black tracking-widest text-white/80 bg-black/60 px-2 py-0.5 rounded-sm backdrop-blur-xs pointer-events-none"
              >
                ディランドラ
              </div>

              {/* Status Bar Bawah */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between text-xs font-jetbrains">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>Semarang, Indonesia</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-medium">UTC+7 // WIB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Narasi Diri & Kapabilitas Teknis */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-jetbrains font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>BACKEND ENGINEER · CLOUD & INFRA OPS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.12]">
                Hi, I am{' '}
                <span className="font-fraunces italic font-medium text-blue-600 dark:text-blue-400">
                  Andra.
                </span>
              </h2>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
                <p>
                  Namaku{' '}
                  <strong className="font-semibold text-zinc-950 dark:text-white">
                    Diandra Anursa Syabandira
                  </strong>
                  , akrab disapa{' '}
                  <strong className="font-semibold text-zinc-950 dark:text-white">
                    Andra
                  </strong>
                  . Di ekosistem internet dan komunitas open-source, aku berkarya di bawah nama pegangan{' '}
                  <span className="px-2 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-jetbrains text-xs sm:text-sm font-semibold inline-block">
                    AndraZero121
                  </span>
                  . Fokus utamaku adalah merekayasa arsitektur sisi server (
                  <span className="font-semibold text-zinc-950 dark:text-white underline decoration-blue-500/50 decoration-2 underline-offset-4">
                    Backend Development
                  </span>
                  ), integrasi API tingkat tinggi, serta orkestrasi{' '}
                  <span className="font-semibold text-zinc-950 dark:text-white">
                    DevOps & Cloud Infrastructure
                  </span>
                  .
                </p>

                <p>
                  Latar belakang pendidikanku berasal dari{' '}
                  <a
                    href="https://smkpalapasemarang.sch.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group/smk"
                  >
                    <span>SMK Palapa Semarang</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/smk:opacity-100 group-hover/smk:translate-x-0.5 group-hover/smk:-translate-y-0.5 transition-transform" />
                  </a>
                  . Ketertarikanku terhadap rekayasa komputasi hardware dan arsitektur software mendorongku untuk membangun solusi perangkat lunak yang berorientasi pada stabilitas, keamanan, dan efisiensi memori.
                </p>

                <p>
                  Saat ini, aku juga mengemban peran sebagai Founder di{' '}
                  <a
                    href="https://github.com/untrustnova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-zinc-950 dark:text-white underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4 hover:decoration-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group/novarsity"
                  >
                    <span>Novarsity Digital Indonesia</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/novarsity:opacity-100 group-hover/novarsity:translate-x-0.5 group-hover/novarsity:-translate-y-0.5 transition-transform" />
                  </a>
                  , sebuah wadah kolaborasi teknologi yang berfokus melahirkan perkakas rekayasa CLI, framework backend, dan pengalaman web mutakhir.
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="block font-jetbrains text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Specialization
                </span>
                <span className="font-jetbrains font-bold text-sm text-zinc-900 dark:text-white">
                  Server & Cloud Ops
                </span>
              </div>
              <div>
                <span className="block font-jetbrains text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Organization
                </span>
                <span className="font-jetbrains font-bold text-sm text-blue-600 dark:text-blue-400">
                  @untrustnova
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-jetbrains text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Philosophy
                </span>
                <span className="font-jetbrains font-bold text-sm text-emerald-600 dark:text-emerald-400">
                  Clean & Scalable
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE EVENT LOG / MILESTONE HORIZON (Modern Non-Template)     */}
        {/* =================================================================== */}
        <div className="mt-8 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-jetbrains text-blue-600 dark:text-blue-400 font-semibold mb-1">
                <Award className="w-4 h-4" />
                <span>CHRONOLOGICAL EVENT LOG / 軌跡</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
                Milestones & Education Journey
              </h3>
            </div>
            <span className="font-jetbrains text-xs text-zinc-500">
              5 Key Chapters // 2022 - Future
            </span>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {ROADMAP_ITEMS.map((item, idx) => (
              <button
                key={item.badge}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`shrink-0 px-4 py-2 rounded-lg font-jetbrains text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md'
                    : 'bg-zinc-200/70 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <span>{item.year}</span>
                <span className="opacity-60 text-[10px]">({item.institution.short})</span>
              </button>
            ))}
          </div>

          {/* Active Milestone Card Deck with Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.badge}
              initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-8 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-[#0c0c11]/90 shadow-lg backdrop-blur-md"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 dark:bg-blue-600/10 rounded-bl-full pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2 font-jetbrains text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    <span>{activeItem.badge}</span>
                    <span>·</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{activeItem.tag}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    {activeItem.title}
                  </h4>
                </div>

                <a
                  href={activeItem.institution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/70 font-jetbrains text-xs text-zinc-700 dark:text-zinc-300 hover:border-blue-500 dark:hover:border-blue-400 transition-colors w-fit"
                >
                  <img
                    src={activeItem.institution.logo}
                    alt={activeItem.institution.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{activeItem.institution.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>

              <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {activeItem.description}
              </div>

              {/* Navigation Arrows for Event Log */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <button
                  type="button"
                  disabled={activeTab === 0}
                  onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-1.5 font-jetbrains text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <span>&larr; PREVIOUS CHAPTER</span>
                </button>

                <span className="font-jetbrains text-xs text-zinc-400">
                  {activeTab + 1} / {ROADMAP_ITEMS.length}
                </span>

                <button
                  type="button"
                  disabled={activeTab === ROADMAP_ITEMS.length - 1}
                  onClick={() => setActiveTab((prev) => Math.min(ROADMAP_ITEMS.length - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 font-jetbrains text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <span>NEXT CHAPTER &rarr;</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
