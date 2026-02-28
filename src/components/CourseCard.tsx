import type { Course } from '@/types'
import { Tag } from './Tag'

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
            {course.code}
          </span>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
            {course.title}
          </h3>
        </div>
        <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
          {course.semester} {course.year}
        </span>
      </div>

      {/* Role + institution */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
        <span className="font-medium">{course.role}</span>
        {' · '}
        {course.institution}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
        {course.description}
      </p>

      {/* Tags */}
      {course.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {course.tags.map((tag) => (
            <Tag key={tag} label={tag} size="sm" />
          ))}
        </div>
      )}
    </article>
  )
}
