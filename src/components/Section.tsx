import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  prose?: boolean
}

export function Section({ id, title, subtitle, children, className = '', prose = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-14 sm:py-16 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>
          )}
          <div className="mt-3 h-px w-12 bg-blue-600 dark:bg-blue-500 rounded" aria-hidden="true" />
        </div>
        <div className={prose ? 'prose prose-slate dark:prose-invert max-w-none' : ''}>
          {children}
        </div>
      </div>
    </section>
  )
}
