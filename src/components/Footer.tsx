import Link from 'next/link'

const LAST_UPDATED = 'February 2026'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>© {new Date().getFullYear()} Kwesi Adu Cobbina</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
          <span>Last updated: {LAST_UPDATED}</span>
        </div>

        <nav className="flex items-center gap-4" aria-label="Footer navigation">
          <a
            href="https://github.com/kwesi-cobbina"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/kwesi-cobbina"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="mailto:kcobbina@umd.edu"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Email
          </a>
          <Link
            href="/contact"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
