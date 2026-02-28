import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kwesicobbina.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kwesi Adu Cobbina',
    template: '%s | Kwesi Adu Cobbina',
  },
  description:
    'PhD Candidate in Computer Science at the University of Maryland. Research in NLP, multimodal learning, in-context learning, and LLM optimization.',
  authors: [{ name: 'Kwesi Adu Cobbina', url: SITE_URL }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Kwesi Adu Cobbina',
    title: 'Kwesi Adu Cobbina — PhD Candidate, CS @ UMD',
    description:
      'Research in NLP, multimodal learning, in-context learning, and LLM robustness.',
  },
  twitter: {
    card: 'summary',
    title: 'Kwesi Adu Cobbina',
    description:
      'PhD Candidate in Computer Science at the University of Maryland.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// JSON-LD structured data (Person)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kwesi Adu Cobbina',
  url: SITE_URL,
  email: 'kcobbina@umd.edu',
  jobTitle: 'PhD Candidate in Computer Science',
  worksFor: {
    '@type': 'Organization',
    name: 'University of Maryland, College Park',
    url: 'https://www.umd.edu',
  },
  alumniOf: [
    { '@type': 'Organization', name: 'University of Maryland, College Park' },
    {
      '@type': 'Organization',
      name: 'Ghana Institute of Management and Public Administration (GIMPA)',
    },
  ],
  sameAs: [
    'https://github.com/kwesi-cobbina',
    'https://linkedin.com/in/kwesi-cobbina',
  ],
  knowsAbout: [
    'Natural Language Processing',
    'In-Context Learning',
    'Multimodal Learning',
    'Large Language Models',
    'Machine Learning',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          Analytics hook — disabled by default.
          To enable Plausible: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env.local
          and uncomment the script tag below.
        */}
        {/* process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        ) */}
      </head>
      <body className="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
          >
            Skip to content
          </a>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
