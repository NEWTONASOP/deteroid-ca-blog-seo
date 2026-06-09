import { groq } from 'next-sanity'

export const ALL_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->{name, image},
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
  "author": author->{name, image, bio},
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
  "author": author->{name, image},
  "categories": categories[]->{title, "slug": slug.current}
}`

export const POSTS_BY_AUTHOR_QUERY = groq`*[_type == "post" && defined(slug.current) && author->slug.current == $authorSlug] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  "author": author->{name, image, bio},
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
  noIndexAll
}`

