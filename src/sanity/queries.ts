import { groq } from 'next-sanity'

export const ALL_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && (!defined($search) || title match $search || excerpt match $search || body[].children[].text match $search)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->{name, image, slug},
  "categories": categories[]->{title, "slug": slug.current}
}`

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  excerpt,
  "author": author->{name, image, bio, slug},
  "categories": categories[]->{title, "slug": slug.current},
  seo
}`

export const POSTS_BY_CATEGORY_QUERY = groq`*[_type == "post" && defined(slug.current) && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->{name, image, slug},
  "categories": categories[]->{title, "slug": slug.current}
}`

export const POSTS_BY_AUTHOR_QUERY = groq`*[_type == "post" && defined(slug.current) && author->slug.current == $authorSlug] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->{name, image, bio, slug},
  "categories": categories[]->{title, "slug": slug.current}
}`

export const AUTHOR_BY_SLUG_QUERY = groq`*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  image,
  bio,
  seo
}`

export const CATEGORY_BY_SLUG_QUERY = groq`*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  seo
}`

export const ALL_CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  siteName,
  title,
  description,
  defaultShareImage,
  noIndexAll,
  heroTitle,
  heroTitleHighlight,
  heroSubtitle
}`

// ─── Sitemap queries (lightweight — slug + dates only) ──────────────────────

export const SITEMAP_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`

export const SITEMAP_CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`

export const SITEMAP_AUTHORS_QUERY = groq`*[_type == "author" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`
