import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types'

const blogDir = path.join(process.cwd(), 'content/blog')

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return []

  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title:       data.title       ?? slug,
        date:        data.date        ?? '',
        excerpt:     data.excerpt     ?? '',
        tags:        data.tags        ?? [],
        readingTime: data.readingTime ?? undefined,
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): { content: string; data: Record<string, unknown> } {
  const filePath = path.join(blogDir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  return { content, data }
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return []
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
