import type { Metadata } from 'next'
import { getProjects } from '@/lib/content'
import { ProjectCard } from '@/components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Research and engineering projects by Kwesi Adu Cobbina.',
}

export default async function ProjectsPage() {
  const projects = getProjects()
  const research    = projects.filter((p) => p.type === 'research')
  const engineering = projects.filter((p) => p.type === 'engineering')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Projects
        </h1>
        <div className="mt-3 h-px w-12 bg-blue-600 dark:bg-blue-500 rounded" aria-hidden="true" />
      </header>

      {/* Research projects */}
      {research.length > 0 && (
        <section aria-labelledby="research-projects-heading" className="mb-12">
          <h2 id="research-projects-heading" className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-5">
            Research Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {research.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Engineering projects */}
      {engineering.length > 0 && (
        <section aria-labelledby="engineering-projects-heading">
          <h2 id="engineering-projects-heading" className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-5">
            Engineering Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {engineering.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
