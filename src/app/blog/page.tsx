import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/mdx'
import { Tag } from '@/components/Tag'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Research notes and writing by Kwesi Adu Cobbina.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  const posts = getBlogPosts()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Blog
        </h1>
        <div className="mt-3 h-px w-12 bg-blue-600 dark:bg-blue-500 rounded" aria-hidden="true" />
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          Research notes, paper summaries, and occasional essays.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.readingTime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} read</span>
                  </>
                )}
              </div>
              {post.excerpt && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Tag key={tag} label={tag} size="sm" />
                  ))}
                </div>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
              >
                Read more →
              </Link>
              <div className="mt-8 border-t border-slate-100 dark:border-slate-800" />
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
