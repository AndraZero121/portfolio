import { useState } from 'react'
import { useLenis } from 'lenis/react'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react'
import {
  siReact,
  siTypescript,
  siTanstack,
  siTailwindcss,
  siBun,
  siVite,
} from 'simple-icons'

// GitHub Brand Icon
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className || 'w-4 h-4 fill-current'} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
    />
  </svg>
)

const TECH_STACK = [
  { name: 'React', icon: siReact },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'TanStack', icon: siTanstack },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Bun', icon: siBun },
  { name: 'Vite', icon: siVite },
]

export default function Footer() {
  const lenis = useLenis()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('diandraanursasyabandira@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.href = 'mailto:diandraanursasyabandira@gmail.com'
    }
  }

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      if (lenis) {
        lenis.scrollTo(href, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="relative w-full border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#07070a] text-zinc-950 dark:text-white transition-colors duration-500 overflow-hidden select-none">
      {/* Pendaran Cahaya Halus di Latar Footer */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 sm:px-10 lg:px-12 pt-16 sm:pt-20 pb-10">
        {/* =================================================================== */}
        {/* 1. HERO CTA ZONE: "LET'S BUILD SOMETHING SOLID & REMARKABLE"        */}
        {/* =================================================================== */}
        <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-14 sm:pb-16 mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
                Let&apos;s build something{' '}
                <motion.span
                  className="font-jetbrains font-extrabold text-red-600 dark:text-red-500 tracking-tight inline-block cursor-default"
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                    textShadow: '0 0 18px rgba(239,68,68,0.7)',
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                >
                  solid
                </motion.span>{' '}
                and{' '}
                <motion.span
                  className="font-black text-blue-600 dark:text-blue-400 inline-block cursor-default"
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                    textShadow: '0 0 20px rgba(59,130,246,0.7)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  remarkable
                </motion.span>
                .
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                Terbuka untuk diskusi proyek rekayasa perangkat lunak, sistem backend & DevOps yang kokoh, kolaborasi tim, atau pertukaran wawasan teknologi.
              </p>
            </div>

            {/* Aksi Kontak Langsung: Salin Email & Tombol Kirim Email dengan Teks Jepang */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* Tombol Salin Email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center justify-center gap-2.5 px-5 py-3.5 border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/60 hover:border-zinc-950 dark:hover:border-white text-zinc-800 dark:text-zinc-200 font-jetbrains text-xs tracking-wide transition-all duration-200 cursor-pointer shadow-2xs"
                title="Salin alamat email ke clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Email Tersalin!</span>
                    <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 font-sans">
                      / コピー完了
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                    <span>Salin Email</span>
                    <span className="text-[11px] text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300 font-sans">
                      / メールをコピー
                    </span>
                  </>
                )}
              </button>

              {/* Tombol Kirim Email */}
              <a
                href="mailto:diandraanursasyabandira@gmail.com"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 shadow-md cursor-pointer no-underline"
              >
                <Mail className="w-4 h-4" />
                <span>KIRIM EMAIL</span>
                <span className="font-sans text-xs opacity-75 group-hover:opacity-100 transition-opacity">
                  / メール送信
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. MAIN FOOTER GRID: IDENTITY, NAVIGATION, SOCIALS, ENVIRONMENT     */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 sm:pb-16 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {/* Kolom 1: Profil & Identitas Menggunakan Logo dari Navbar (5 Kolom di Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Logo Brand Sesuai Navbar */}
              <div className="flex items-center gap-3">
                <img
                  src="/logoandranew.png"
                  alt="Logo Andra"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                />
                <div className="flex items-baseline gap-2">
                  <span className="font-bold tracking-tight text-lg sm:text-xl text-zinc-950 dark:text-white">
                    ANDRA
                  </span>
                  <span className="text-xs sm:text-sm font-normal font-sans tracking-wide text-zinc-500 dark:text-zinc-400">
                    / アンドラ
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                <strong className="font-semibold text-zinc-950 dark:text-white">Diandra Anursa Syabandira</strong> — Full-Stack Developer & DevOps Engineer. Berfokus pada performa sistem, kode yang bersih, serta pengalaman web yang tangguh dan terintegrasi AI.
              </p>
            </div>

            {/* Lokasi dengan Ikon Putih */}
            <div className="pt-2 flex items-center gap-2 text-xs font-jetbrains text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-800 border border-zinc-700/60 shadow-xs shrink-0">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </span>
              <span>Semarang, Jawa Tengah, Indonesia</span>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat (2 Kolom di Desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-jetbrains text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Navigasi <span className="text-zinc-400 dark:text-zinc-600">/ 案内</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#home')
                  }}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150 inline-flex items-center gap-1 no-underline"
                >
                  <span>Home</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-jetbrains">/ 01</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#about')
                  }}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150 inline-flex items-center gap-1 no-underline"
                >
                  <span>About Me</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-jetbrains">/ 02</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150 inline-flex items-center gap-1 no-underline"
                >
                  <span>Biografi Lengkap</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Jejaring & Komunitas (3 Kolom di Desktop) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-jetbrains text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Koneksi <span className="text-zinc-400 dark:text-zinc-600">/ リンク</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://github.com/AndraZero121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 inline-flex items-center gap-2 no-underline"
                >
                  <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>GitHub (@AndraZero121)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/untrustnova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 inline-flex items-center gap-2 no-underline"
                >
                  {/* Icon Bulat Kecil Novarsity Sebenarnya */}
                  <img
                    src="https://avatars.githubusercontent.com/u/98293031?s=200&v=4"
                    alt="Novarsity Digital Indonesia"
                    className="w-3.5 h-3.5 rounded-full object-cover shrink-0"
                  />
                  <span>Novarsity Digital ID</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Colophon Lingkungan Teknologi Berfont Poppins & Simple Icons (2 Kolom di Desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-jetbrains text-[11px] font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Sistem <span className="text-zinc-400 dark:text-zinc-600">/ 構成</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 font-poppins text-[11px] font-medium px-2.5 py-1 rounded-md bg-zinc-200/70 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-300/60 dark:border-zinc-700/60 hover:border-blue-500/50 transition-colors"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-3 h-3 fill-current shrink-0"
                  >
                    <path d={tech.icon.path} />
                  </svg>
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. SUB-FOOTER: COPYRIGHT & KEMBALI KE PUNCAK (BACK TO TOP)          */}
        {/* =================================================================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()}{' '}
              <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                Diandra Anursa Syabandira
              </strong>
              . All rights reserved.
            </span>
          </div>

          {/* Tombol Back to Top dengan Animasi Halus */}
          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all duration-200 cursor-pointer text-xs font-jetbrains"
            title="Kembali ke bagian atas halaman"
          >
            <span>KEMBALI KE ATAS</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">/ 頂点</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
