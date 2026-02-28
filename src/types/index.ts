// ─── Profile ────────────────────────────────────────────────────────────────

export interface Advisor {
  name: string
  url: string
}

export interface Award {
  name: string
  org: string
  year: string
}

export interface Profile {
  name: string
  title: string
  affiliation: string
  advisors: Advisor[]
  email: string
  location: string
  expectedGraduation: string
  photo: string | null
  researchSummary: string
  researchInterests: string[]
  links: {
    scholar: string
    github: string
    linkedin: string
    twitter: string
    cv: string
  }
  awards: Award[]
}

// ─── News ────────────────────────────────────────────────────────────────────

export interface NewsItem {
  date: string   // "YYYY-MM"
  text: string   // may contain safe HTML (<strong>, <em>, <a>)
}

// ─── Publications ────────────────────────────────────────────────────────────

export type PublicationStatus = 'published' | 'preprint' | 'under-review' | 'in-preparation'
export type PublicationType   = 'conference' | 'journal' | 'workshop' | 'preprint'

export interface Publication {
  id: string
  title: string
  authors: string[]
  equalContribution: string[]
  venue: string
  venueShort: string
  year: number
  status: PublicationStatus
  type: PublicationType
  tags: string[]
  links: {
    pdf?:   string
    arxiv?: string
    code?:  string
    talk?:  string
  }
  bibtex: string
  award:  string | null
  selected: boolean
  note: string | null
}

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectType = 'research' | 'engineering'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  links: {
    paper?:   string | null
    code?:    string | null
    demo?:    string | null
    dataset?: string | null
  }
  featured: boolean
  type: ProjectType
}

// ─── Teaching ────────────────────────────────────────────────────────────────

export interface Course {
  id: string
  code: string
  title: string
  role: string
  institution: string
  semester: string
  year: number
  description: string
  tags: string[]
}

// ─── Service ─────────────────────────────────────────────────────────────────

export interface ServiceCategory {
  category: string
  items: string[]
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readingTime?: string
}
