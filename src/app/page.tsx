import type { Metadata } from 'next'
import Link from 'next/link'
import { getProfile, getNews, getPublications, getProjects, getTeaching, getService } from '@/lib/content'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { Tag } from '@/components/Tag'
import { PublicationCard } from '@/components/PublicationCard'
import { ProjectCard } from '@/components/ProjectCard'
import { NewsItem } from '@/components/NewsItem'
import { CourseCard } from '@/components/CourseCard'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kwesi Adu Cobbina — PhD Candidate, CS @ UMD',
  description:
    'PhD Candidate in Computer Science at the University of Maryland working on NLP, multimodal learning, and in-context learning.',
}

export default async function HomePage() {
  const profile     = getProfile()
  const news        = getNews()
  const publications = getPublications()
  const projects    = getProjects()
  const teaching    = getTeaching()
  const service     = getService()

  const selectedPubs     = publications.filter((p) => p.selected).slice(0, 5)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const recentCourses    = teaching.slice(0, 3)

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Hero profile={profile} />

      {/* ── Research Interests ──────────────────────────────────────────── */}
      <Section id="research" title="Research Interests" className="bg-slate-50 dark:bg-slate-900/50">
        <div className="flex flex-wrap gap-2">
          {profile.researchInterests.map((interest) => (
            <Tag key={interest} label={interest} size="lg" variant="accent" />
          ))}
        </div>
        {profile.advisors.length > 0 && (
          <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
            Advised by{' '}
            {profile.advisors.map((a, i) => (
              <span key={a.name}>
                {i > 0 && ' and '}
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {a.name}
                </a>
              </span>
            ))}
            {' '}at {profile.affiliation}
          </p>
        )}
      </Section>

      {/* ── News ────────────────────────────────────────────────────────── */}
      <Section id="news" title="News">
        <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
          {news.map((item, i) => (
            <div key={i} className={i > 0 ? 'pt-3' : ''}>
              <NewsItem item={item} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Selected Publications ───────────────────────────────────────── */}
      <Section
        id="publications"
        title="Selected Publications"
        subtitle="* equal contribution"
        className="bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="space-y-7">
          {selectedPubs.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/publications"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
          >
            View all {publications.length} publications →
          </Link>
        </div>
      </Section>

      {/* ── Selected Projects ───────────────────────────────────────────── */}
      <Section id="projects" title="Selected Projects">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            View all projects →
          </Link>
        </div>
      </Section>

      {/* ── Teaching ────────────────────────────────────────────────────── */}
      <Section id="teaching" title="Teaching" className="bg-slate-50 dark:bg-slate-900/50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {teaching.length > recentCourses.length && (
          <div className="mt-6">
            <Link
              href="/teaching"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            >
              View all courses →
            </Link>
          </div>
        )}
      </Section>

      {/* ── Service ─────────────────────────────────────────────────────── */}
      <Section id="service" title="Service">
        <div className="grid sm:grid-cols-3 gap-8">
          {service.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-3">
                {cat.category}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Honors & Awards ─────────────────────────────────────────────── */}
      <Section id="awards" title="Honors &amp; Awards" className="bg-slate-50 dark:bg-slate-900/50">
        <div className="space-y-3">
          {profile.awards.map((award) => (
            <div key={award.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {award.name}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {' — '}{award.org}
                </span>
              </div>
              <span className="text-sm text-slate-400 dark:text-slate-500 shrink-0">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <Section id="contact" title="Contact">
        <div className="grid sm:grid-cols-2 gap-12">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              I am happy to discuss research collaborations, speaking opportunities, or any questions
              about my work. The best way to reach me is by email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
            >
              {profile.email}
            </a>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              University of Maryland, College Park · {profile.location}
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  )
}
