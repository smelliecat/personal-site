'use client'

import { useState, useMemo } from 'react'
import type { Publication } from '@/types'
import { PublicationCard } from './PublicationCard'

const ALL = 'All'

interface Props {
  publications: Publication[]
}

export function PublicationFilters({ publications }: Props) {
  const [yearFilter, setYearFilter] = useState(ALL)
  const [typeFilter, setTypeFilter] = useState(ALL)
  const [tagFilter,  setTagFilter]  = useState(ALL)
  const [search,     setSearch]     = useState('')

  // Derived filter options
  const years = useMemo(() => {
    const ys = [...new Set(publications.map((p) => String(p.year)))].sort(
      (a, b) => Number(b) - Number(a)
    )
    return [ALL, ...ys]
  }, [publications])

  const types = useMemo(() => {
    const ts = [...new Set(publications.map((p) => p.type))]
    const labels: Record<string, string> = {
      conference: 'Conference',
      journal:    'Journal',
      workshop:   'Workshop',
      preprint:   'Preprint',
    }
    return [ALL, ...ts.map((t) => labels[t] ?? t)]
  }, [publications])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    publications.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return [ALL, ...Array.from(set).sort()]
  }, [publications])

  // Filtered list
  const filtered = useMemo(() => {
    const typeMap: Record<string, string> = {
      Conference: 'conference',
      Journal:    'journal',
      Workshop:   'workshop',
      Preprint:   'preprint',
    }
    return publications.filter((p) => {
      if (yearFilter !== ALL && String(p.year) !== yearFilter) return false
      if (typeFilter !== ALL && p.type !== typeMap[typeFilter]) return false
      if (tagFilter  !== ALL && !p.tags.includes(tagFilter))   return false
      if (search) {
        const q = search.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q)) ||
          p.venueShort.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [publications, yearFilter, typeFilter, tagFilter, search])

  const selectClass =
    'rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        <input
          type="search"
          placeholder="Search title, author, venue…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 px-3 py-1.5 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          aria-label="Search publications"
        />

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by year"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y === ALL ? 'All years' : y}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by type"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === ALL ? 'All types' : t}
            </option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className={selectClass}
          aria-label="Filter by topic"
        >
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t === ALL ? 'All topics' : t}
            </option>
          ))}
        </select>

        {(yearFilter !== ALL || typeFilter !== ALL || tagFilter !== ALL || search) && (
          <button
            onClick={() => {
              setYearFilter(ALL)
              setTypeFilter(ALL)
              setTagFilter(ALL)
              setSearch('')
            }}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results summary */}
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Showing{' '}
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {filtered.length}
        </span>{' '}
        of {publications.length} publication{publications.length !== 1 ? 's' : ''}
      </p>

      {/* Publication list */}
      {filtered.length > 0 ? (
        <div className="space-y-7">
          {filtered.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} showFullVenue />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 text-sm py-8 text-center">
          No publications match your filters.
        </p>
      )}
    </div>
  )
}
