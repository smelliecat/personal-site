import type { Project } from '@/types'
import { Tag } from './Tag'

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors"
    >
      {label} ↗
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const links = Object.entries(project.links).filter(
    ([, v]) => typeof v === 'string' && v
  ) as [string, string][]

  const linkLabels: Record<string, string> = {
    paper:   'Paper',
    code:    'Code',
    demo:    'Demo',
    dataset: 'Dataset',
  }

  return (
    <article className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all">
      {/* Type badge */}
      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${
        project.type === 'research'
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
          : 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
      }`}>
        {project.type === 'research' ? 'Research' : 'Engineering'}
      </span>

      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug mb-2">
        {project.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
        {project.description}
      </p>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} size="sm" />
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {links.map(([key, href]) => (
            <ExternalLink key={key} href={href} label={linkLabels[key] ?? key} />
          ))}
        </div>
      )}
    </article>
  )
}
