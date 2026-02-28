import type { Metadata } from 'next'
import { getPublications } from '@/lib/content'
import { PublicationFilters } from '@/components/PublicationFilters'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'All publications and preprints by Kwesi Adu Cobbina — NLP, multimodal learning, in-context learning.',
}

export default async function PublicationsPage() {
  const publications = getPublications()

  // Group by year for the header summary
  const published = publications.filter((p) => p.status === 'published').length
  const inProgress = publications.filter((p) =>
    p.status === 'under-review' || p.status === 'in-preparation'
  ).length

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Publications
        </h1>
        <div className="mt-3 h-px w-12 bg-blue-600 dark:bg-blue-500 rounded" aria-hidden="true" />
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {publications.length} total ·{' '}
          <span className="text-green-600 dark:text-green-400">{published} published</span>
          {inProgress > 0 && (
            <>
              {' '}·{' '}
              <span className="text-orange-500 dark:text-orange-400">
                {inProgress} in progress
              </span>
            </>
          )}
          {' '}· * equal contribution
        </p>
      </header>

      <PublicationFilters publications={publications} />
    </div>
  )
}
