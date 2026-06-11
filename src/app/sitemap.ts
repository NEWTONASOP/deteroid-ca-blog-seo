import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import {
  SITEMAP_POSTS_QUERY,
  SITEMAP_CATEGORIES_QUERY,
  SITEMAP_AUTHORS_QUERY,
} from '@/sanity/queries'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://blog.saroracompany.com'

export const revalidate = 3600 // Regenerate at most once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, authors] = await Promise.all([
    client.fetch<{ slug: string; publishedAt?: string; _updatedAt: string }[]>(
      SITEMAP_POSTS_QUERY
    ).catch(() => []),
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      SITEMAP_CATEGORIES_QUERY
    ).catch(() => []),
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      SITEMAP_AUTHORS_QUERY
    ).catch(() => []),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/post/${post.slug}`,
    lastModified: new Date(post._updatedAt ?? post.publishedAt ?? Date.now()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: new Date(cat._updatedAt ?? Date.now()),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${SITE_URL}/author/${author.slug}`,
    lastModified: new Date(author._updatedAt ?? Date.now()),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...authorRoutes]
}
