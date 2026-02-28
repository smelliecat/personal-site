import type { MetadataRoute } from 'next'
import { getBlogSlugs } from '@/lib/mdx'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kwesicobbina.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getBlogSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                       lastModified: new Date(), changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${SITE_URL}/publications`,     lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${SITE_URL}/projects`,         lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${SITE_URL}/teaching`,         lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${SITE_URL}/blog`,             lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.8 },
    { url: `${SITE_URL}/contact`,          lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.5 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url:             `${SITE_URL}/blog/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
