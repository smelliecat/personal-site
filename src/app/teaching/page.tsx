import type { Metadata } from 'next'
import { getTeaching } from '@/lib/content'
import { CourseCard } from '@/components/CourseCard'

export const metadata: Metadata = {
  title: 'Teaching',
  description: 'Teaching and mentoring experience of Kwesi Adu Cobbina at the University of Maryland.',
}

export default async function TeachingPage() {
  const teaching = getTeaching()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Teaching
        </h1>
        <div className="mt-3 h-px w-12 bg-blue-600 dark:bg-blue-500 rounded" aria-hidden="true" />
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          I have served as a teaching assistant and curriculum designer for graduate and undergraduate
          courses in machine learning and NLP. I am also involved in outreach and education initiatives
          to broaden participation in AI.
        </p>
      </header>

      {teaching.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-sm">No courses listed yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teaching.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
