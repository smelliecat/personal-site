import type { Metadata } from 'next'
import { getProfile } from '@/lib/content'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Kwesi Adu Cobbina.',
}

export default async function ContactPage() {
  const profile = getProfile()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Contact
        </h1>
        <div className="mt-3 h-px w-12 bg-blue-600 dark:bg-blue-500 rounded" aria-hidden="true" />
      </header>

      <div className="grid sm:grid-cols-2 gap-12 max-w-3xl">
        {/* Info */}
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            I am always happy to chat about research, potential collaborations,
            or questions about my work. Feel free to reach out!
          </p>

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-medium text-slate-700 dark:text-slate-300 mb-0.5">Email</dt>
              <dd>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700 dark:text-slate-300 mb-0.5">Location</dt>
              <dd className="text-slate-600 dark:text-slate-400">
                {profile.affiliation}<br />
                {profile.location}
              </dd>
            </div>
            {profile.links.github && (
              <div>
                <dt className="font-medium text-slate-700 dark:text-slate-300 mb-0.5">GitHub</dt>
                <dd>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {profile.links.github.replace('https://', '')}
                  </a>
                </dd>
              </div>
            )}
            {profile.links.linkedin && (
              <div>
                <dt className="font-medium text-slate-700 dark:text-slate-300 mb-0.5">LinkedIn</dt>
                <dd>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {profile.links.linkedin.replace('https://', '')}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Send a message
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
