import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { getBlogPost, getBlogSlugs } from '@/lib/mdx'
import { Tag } from '@/components/Tag'
import { Figure } from '@/components/Figure'

// Custom MDX components available in every blog post
const mdxComponents = {
  Figure,
  // Plain markdown images (![alt](src)) get the same styled wrapper automatically
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-8 not-prose">
      <span className="block rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...props} alt={props.alt ?? ''} className="w-full h-auto block" />
      </span>
      {props.alt && (
        <span className="block mt-2.5 text-sm text-center text-slate-500 dark:text-slate-400 italic">
          {props.alt}
        </span>
      )}
    </span>
  ),
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const { data } = getBlogPost(slug)
    return {
      title:       String(data.title ?? slug),
      description: String(data.excerpt ?? ''),
    }
  } catch {
    return { title: 'Post not found' }
  }
}

// ─── MDX options ─────────────────────────────────────────────────────────────

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark:  'github-dark-dimmed',
          },
          keepBackground: false,
        },
      ],
    ],
  },
} as const

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let content: string
  let data: Record<string, unknown>

  try {
    ;({ content, data } = getBlogPost(slug))
  } catch {
    notFound()
  }

  const title       = String(data.title       ?? slug)
  const date        = String(data.date        ?? '')
  const readingTime = data.readingTime ? String(data.readingTime) : null
  const tags        = Array.isArray(data.tags) ? (data.tags as string[]) : []

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        ← All posts
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          {date && (
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingTime} read</span>
            </>
          )}
        </div>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} size="sm" />
            ))}
          </div>
        )}
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800" />
      </header>

      {/* MDX content */}
      <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-sm">
        {/* @ts-expect-error — rehypePrettyCode options type mismatch is benign */}
        <MDXRemote source={content} options={mdxOptions} components={mdxComponents} />
      </article>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  )
}
