import Image from 'next/image'
import type { Profile } from '@/types'
import { Button } from './Button'

// ─── Icon primitives ─────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function ScholarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  )
}

// ─── Hero component ──────────────────────────────────────────────────────────

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="hero"
      className="py-20 sm:py-28 bg-white dark:bg-slate-950"
      aria-label="Introduction"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Two-column on desktop when photo present; single column otherwise */}
        <div className={`flex ${profile.photo ? 'flex-col-reverse sm:flex-row sm:items-start sm:gap-12' : ''}`}>

          {/* ── Text column ── */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              {profile.name}
            </h1>

            {/* Title + affiliation */}
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
              {profile.title} ·{' '}
              <span className="text-blue-600 dark:text-blue-400">
                {profile.affiliation}
              </span>
            </p>

            {/* Advisors */}
            {profile.advisors.length > 0 && (
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-500">
                Advised by{' '}
                {profile.advisors.map((a, i) => (
                  <span key={a.name}>
                    {i > 0 && ' and '}
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                    >
                      {a.name}
                    </a>
                  </span>
                ))}
              </p>
            )}

            {/* Research summary */}
            <p className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              {profile.researchSummary}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={profile.links.cv} external variant="primary" icon={<DownloadIcon />}>
                Download CV
              </Button>
              <Button href={`mailto:${profile.email}`} external variant="secondary" icon={<MailIcon />}>
                Email
              </Button>
              {profile.links.scholar && (
                <Button href={profile.links.scholar} external variant="secondary" icon={<ScholarIcon />}>
                  Scholar
                </Button>
              )}
              {profile.links.github && (
                <Button href={profile.links.github} external variant="secondary" icon={<GithubIcon />}>
                  GitHub
                </Button>
              )}
              {profile.links.linkedin && (
                <Button href={profile.links.linkedin} external variant="secondary" icon={<LinkedinIcon />}>
                  LinkedIn
                </Button>
              )}
            </div>

            {/* Location line */}
            <p className="mt-6 text-xs text-slate-400 dark:text-slate-600 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {profile.location} · PhD expected {profile.expectedGraduation}
            </p>
          </div>

          {/* ── Photo column (only rendered when profile.photo is set) ── */}
          {profile.photo && (
            <div className="shrink-0 mb-8 sm:mb-0 sm:mt-2">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} profile photo`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
