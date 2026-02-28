'use client'

import { useState } from 'react'
import type { Publication } from '@/types'
import { Tag } from './Tag'

// ─── Author list with name highlighting ─────────────────────────────────────

function AuthorList({
  authors,
  equalContribution,
}: {
  authors: string[]
  equalContribution: string[]
}) {
  return (
    <>
      {authors.map((author, i) => {
        const isMine = author.includes('Cobbina')
        const isEqual = equalContribution.includes(author)
        return (
          <span key={i}>
            {i > 0 && ', '}
            <span className={isMine ? 'font-semibold text-slate-900 dark:text-slate-100' : ''}>
              {author}
              {isEqual ? '*' : ''}
            </span>
          </span>
        )
      })}
    </>
  )
}

// ─── Status badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Publication['status'] }) {
  const styles: Record<Publication['status'], string> = {
    'published':       'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    'preprint':        'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
    'under-review':    'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    'in-preparation':  'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  }
  const labels: Record<Publication['status'], string> = {
    'published':       'Published',
    'preprint':        'Preprint',
    'under-review':    'Under Review',
    'in-preparation':  'In Preparation',
  }
  return (
    <span className={`inline-flex items-center rounded-full text-xs font-medium px-2 py-0.5 ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

// ─── Link row ────────────────────────────────────────────────────────────────

function PubLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
    >
      [{label}]
    </a>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

interface PublicationCardProps {
  pub: Publication
  showFullVenue?: boolean
}

export function PublicationCard({ pub, showFullVenue = false }: PublicationCardProps) {
  const [showBibtex, setShowBibtex] = useState(false)
  const hasLinks = Object.values(pub.links).some(Boolean)
  const hasBibtex = !!pub.bibtex

  return (
    <article className="group border-l-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 pl-4 py-1 transition-colors">
      {/* Title */}
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
        {pub.title}
      </h3>

      {/* Authors */}
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        <AuthorList authors={pub.authors} equalContribution={pub.equalContribution} />
      </p>

      {/* Venue + year */}
      <p className="mt-1 text-sm">
        <span className="italic text-slate-700 dark:text-slate-300">
          {showFullVenue ? pub.venue : pub.venueShort}
        </span>
        {' '}
        <span className="text-slate-500 dark:text-slate-400">{pub.year}</span>
        {pub.note && (
          <span className="ml-2 text-slate-400 dark:text-slate-500 text-xs">
            — {pub.note}
          </span>
        )}
      </p>

      {/* Status + award */}
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <StatusBadge status={pub.status} />
        {pub.award && (
          <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
            🏆 {pub.award}
          </span>
        )}
      </div>

      {/* Tags */}
      {pub.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {pub.tags.map((tag) => (
            <Tag key={tag} label={tag} size="sm" />
          ))}
        </div>
      )}

      {/* Links */}
      {(hasLinks || hasBibtex) && (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {pub.links.pdf    && <PubLink href={pub.links.pdf}    label="PDF"   />}
          {pub.links.arxiv  && <PubLink href={pub.links.arxiv}  label="arXiv" />}
          {pub.links.code   && <PubLink href={pub.links.code}   label="Code"  />}
          {pub.links.talk   && <PubLink href={pub.links.talk}   label="Talk"  />}
          {hasBibtex && (
            <button
              onClick={() => setShowBibtex((v) => !v)}
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:underline transition-colors"
              aria-expanded={showBibtex}
            >
              {showBibtex ? '[Hide BibTeX]' : '[BibTeX]'}
            </button>
          )}
        </div>
      )}

      {/* BibTeX block */}
      {showBibtex && hasBibtex && (
        <pre className="mt-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-3 overflow-x-auto leading-relaxed text-slate-700 dark:text-slate-300 font-mono">
          {pub.bibtex}
        </pre>
      )}
    </article>
  )
}
