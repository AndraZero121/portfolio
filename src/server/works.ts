import { createServerFn } from '@tanstack/react-start'

export interface WorkRepo {
  id: string
  name: string
  owner: 'untrustnova' | 'AndraZero121'
  repoFullName: string
  title: string
  jpTitle: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
  topics: string[]
  githubUrl: string
  liveUrl?: string | null
  updatedAt: string
}

// Data kurasi awal 9 repositori GitHub pilihan pengguna (Fallback Offline & Snapshot Akurat)
export const DEFAULT_WORKS: WorkRepo[] = [
  // 1. untrustnova/rusters-core
  {
    id: 'rusters-core',
    name: 'rusters-core',
    owner: 'untrustnova',
    repoFullName: 'untrustnova/rusters-core',
    title: 'rusters-core',
    jpTitle: 'コアエンジン',
    description: 'The high-performance core engine and runtime foundation for the Rusters framework ecosystem written in Rust.',
    language: 'Rust',
    languageColor: '#dea584',
    stars: 0,
    forks: 0,
    topics: ['core', 'engine', 'rust', 'system'],
    githubUrl: 'https://github.com/untrustnova/rusters-core',
    liveUrl: null,
    updatedAt: '2026-08-09T10:36:45Z',
  },
  // 2. untrustnova/rusters-cli
  {
    id: 'rusters-cli',
    name: 'rusters-cli',
    owner: 'untrustnova',
    repoFullName: 'untrustnova/rusters-cli',
    title: 'rusters-cli',
    jpTitle: 'CLIフレームワーク',
    description: 'Modern developer CLI tool for the Rusters framework, inspired by Laravel artisan experience for Rust developers.',
    language: 'Rust',
    languageColor: '#dea584',
    stars: 0,
    forks: 0,
    topics: ['cli', 'framework', 'rust', 'rust-cli', 'rusters'],
    githubUrl: 'https://github.com/untrustnova/rusters-cli',
    liveUrl: null,
    updatedAt: '2026-08-09T10:36:50Z',
  },
  // 3. untrustnova/nova
  {
    id: 'nova',
    name: 'nova',
    owner: 'untrustnova',
    repoFullName: 'untrustnova/nova',
    title: 'nova.js',
    jpTitle: 'バックエンドフレームワーク',
    description: 'Nova.js is a lightweight web framework based on JavaScript and Bun, powered by Seishiro runtime core.',
    language: 'JavaScript',
    languageColor: '#f7df1e',
    stars: 0,
    forks: 0,
    topics: ['framework', 'nova', 'novajs', 'seishiro', 'seishiroapi'],
    githubUrl: 'https://github.com/untrustnova/nova',
    liveUrl: 'https://untrustnova.github.io/novaweb',
    updatedAt: '2026-07-22T12:52:30Z',
  },
  // 4. untrustnova/zarman-creative-showcase
  {
    id: 'zarman-creative-showcase',
    name: 'zarman-creative-showcase',
    owner: 'untrustnova',
    repoFullName: 'untrustnova/zarman-creative-showcase',
    title: 'zarman-creative',
    jpTitle: 'クリエイティブポートフォリオ',
    description: 'Interactive high-end showcase website crafted for @AsiffZR with React, Motion, and smooth aesthetic micro-interactions.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 0,
    forks: 0,
    topics: ['motion', 'portfolio', 'portfolio-website', 'react', 'showcase', 'vite'],
    githubUrl: 'https://github.com/untrustnova/zarman-creative-showcase',
    liveUrl: 'https://zarman-creative.vercel.app',
    updatedAt: '2026-09-10T10:12:18Z',
  },
  // 5. AndraZero121/portfolio
  {
    id: 'portfolio',
    name: 'portfolio',
    owner: 'AndraZero121',
    repoFullName: 'AndraZero121/portfolio',
    title: 'andra-portfolio',
    jpTitle: '本ポートフォリオサイト',
    description: 'Production portfolio website built with TanStack Start, Tailwind CSS v4, Motion, Lenis, and Japanese modernist aesthetic.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 0,
    forks: 0,
    topics: ['lenis', 'motion', 'portfolio', 'react', 'tailwindcss', 'tanstack'],
    githubUrl: 'https://github.com/AndraZero121/portfolio',
    liveUrl: 'https://andrazero121.vercel.app',
    updatedAt: '2026-10-21T05:00:20Z',
  },
  // 6. AndraZero121/docs-horizon
  {
    id: 'docs-horizon',
    name: 'docs-horizon',
    owner: 'AndraZero121',
    repoFullName: 'AndraZero121/docs-horizon',
    title: 'docs-horizon',
    jpTitle: '型変換ジェネレーター',
    description: 'Developer utility that converts database model and controller columns into type-safe JavaScript and TypeScript definitions.',
    language: 'PHP',
    languageColor: '#777bb4',
    stars: 0,
    forks: 0,
    topics: ['api', 'converter', 'docs-generator'],
    githubUrl: 'https://github.com/AndraZero121/docs-horizon',
    liveUrl: null,
    updatedAt: '2025-10-02T01:34:51Z',
  },
  // 7. AndraZero121/shiroko-nn-code-php
  {
    id: 'shiroko-nn-code-php',
    name: 'shiroko-nn-code-php',
    owner: 'AndraZero121',
    repoFullName: 'AndraZero121/shiroko-nn-code-php',
    title: 'shiroko-nn-code',
    jpTitle: 'ASCIIエンコードエンジン',
    description: 'String and text conversion engine transforming input into ASCII-based structural representations with custom presets.',
    language: 'PHP',
    languageColor: '#777bb4',
    stars: 3,
    forks: 0,
    topics: ['ascii', 'asciidoc', 'converter', 'php'],
    githubUrl: 'https://github.com/AndraZero121/shiroko-nn-code-php',
    liveUrl: 'https://shiroko-ascii-az.infinityfree.com',
    updatedAt: '2025-11-12T01:57:58Z',
  },
  // 8. AndraZero121/perpustakaan
  {
    id: 'perpustakaan',
    name: 'perpustakaan',
    owner: 'AndraZero121',
    repoFullName: 'AndraZero121/perpustakaan',
    title: 'perpustakaan-online',
    jpTitle: '図書管理システム',
    description: 'Full-featured online library management application with member loans, catalog indexing, and administrative dashboards.',
    language: 'PHP',
    languageColor: '#777bb4',
    stars: 1,
    forks: 0,
    topics: ['library', 'management', 'php', 'web'],
    githubUrl: 'https://github.com/AndraZero121/perpustakaan',
    liveUrl: null,
    updatedAt: '2025-03-24T03:51:43Z',
  },
  // 9. AndraZero121/kasir
  {
    id: 'kasir',
    name: 'kasir',
    owner: 'AndraZero121',
    repoFullName: 'AndraZero121/kasir',
    title: 'kasir-crocodic',
    jpTitle: 'レジ管理システム',
    description: 'Point-of-sale cashier application developed during the Crocodic Industrial Class, handling transactions and inventory.',
    language: 'PHP',
    languageColor: '#777bb4',
    stars: 2,
    forks: 1,
    topics: ['cashier', 'pos', 'php'],
    githubUrl: 'https://github.com/AndraZero121/kasir',
    liveUrl: null,
    updatedAt: '2025-10-02T01:36:37Z',
  },
]

// Server function TanStack Start untuk mengambil repositori terpilih dari GitHub API dengan fallback offline
export const getWorksFn = createServerFn({ method: 'GET' }).handler(
  async (): Promise<WorkRepo[]> => {
    try {
      const headers: Record<string, string> = {
        'User-Agent': 'andra-portfolio-app',
        Accept: 'application/vnd.github.v3+json',
      }

      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
      }

      // Ambil data terbaru secara paralel dengan timeout pendek (3.5s) agar tetap instan
      const updatedWorks = await Promise.all(
        DEFAULT_WORKS.map(async (work) => {
          try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 3500)

            const res = await fetch(`https://api.github.com/repos/${work.repoFullName}`, {
              headers,
              signal: controller.signal,
            })
            clearTimeout(timeoutId)

            if (!res.ok) {
              return work
            }

            const data = await res.json()
            return {
              ...work,
              stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : work.stars,
              forks: typeof data.forks_count === 'number' ? data.forks_count : work.forks,
              description: data.description || work.description,
              topics: Array.isArray(data.topics) && data.topics.length > 0 ? data.topics : work.topics,
              liveUrl: data.homepage ? (data.homepage.startsWith('http') ? data.homepage : `https://${data.homepage}`) : work.liveUrl,
              updatedAt: data.updated_at || work.updatedAt,
            }
          } catch {
            return work
          }
        })
      )

      return updatedWorks
    } catch (err) {
      console.warn('GitHub API fetch fallback to static dataset:', err)
      return DEFAULT_WORKS
    }
  }
)
