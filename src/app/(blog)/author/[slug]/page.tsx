import PostCard from '@/components/PostCard'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { POSTS_BY_AUTHOR_QUERY, AUTHOR_BY_SLUG_QUERY, SITE_SETTINGS_QUERY, SITEMAP_AUTHORS_QUERY } from '@/sanity/queries'
import { urlForImage } from '@/sanity/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const authors = await client
    .fetch<{ slug: string }[]>(SITEMAP_AUTHORS_QUERY)
    .catch(() => [])
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = await client.fetch(AUTHOR_BY_SLUG_QUERY, { slug }).catch(() => null);

  if (!author) {
    return {};
  }

  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null);
  const siteName = siteSettings?.siteName || "Shalini Arora & Company";

  const title = author.seo?.metaTitle 
    ? { absolute: author.seo.metaTitle } 
    : `Articles by ${author.name}`;
  
  const bioText = author.bio && Array.isArray(author.bio)
    ? author.bio.map((block: any) => block.children?.map((c: any) => c.text).join('')).join(' ')
    : '';
  const description = author.seo?.metaDescription || bioText || `Read compliance guidelines and updates written by ${author.name} at ${siteName}`;

  let ogImageUrl = null;
  if (author.seo?.shareImage) {
    ogImageUrl = urlForImage(author.seo.shareImage)?.width(1200).height(630).url();
  } else if (author.image) {
    ogImageUrl = urlForImage(author.image)?.width(1200).height(630).url();
  } else if (siteSettings?.defaultShareImage) {
    ogImageUrl = urlForImage(siteSettings.defaultShareImage)?.width(1200).height(630).url();
  }

  const keywords = author.seo?.metaKeywords || [author.name, 'author', 'compliance insights'];
  const noIndex = siteSettings?.noIndexAll || author.seo?.noIndex;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/author/${slug}`,
    },
    openGraph: {
      title: author.seo?.metaTitle || author.name,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: author.seo?.metaTitle || author.name,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
    },
  };
}


export const revalidate = 60

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await client.fetch(AUTHOR_BY_SLUG_QUERY, { slug });

  if (!author) {
    notFound();
  }

  const posts = await client.fetch(POSTS_BY_AUTHOR_QUERY, { authorSlug: slug });
  const authorImageUrl = author.image ? urlForImage(author.image)?.width(200).height(200).url() : null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-28 pb-20 relative overflow-hidden border-b border-blue-900/50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0"></div>
        <div className="absolute top-[-25%] left-[-10%] w-[50%] h-[70%] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none z-0"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-xs font-bold uppercase tracking-wider mb-6 transition-colors group">
            <span className="transform translate-x-0 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to all insights
          </Link>
          
          <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto flex items-center justify-center text-3xl font-bold text-white mb-6 overflow-hidden relative border-2 border-blue-900 shadow-md">
            {authorImageUrl ? (
              <Image src={authorImageUrl} alt={author.name} fill className="object-cover" />
            ) : (
              author.name.charAt(0)
            )}
          </div>
          
          <div className="inline-block px-3 py-0.5 bg-blue-900/20 border border-blue-900/35 rounded text-blue-200 text-[10px] font-bold uppercase tracking-wide mb-3">
            Author Spotlight
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-heading">{author.name}</h1>
          <div className="text-blue-100/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {author.bio ? (
              <PortableText value={author.bio} />
            ) : (
              <p>Contributing expert at Shalini Arora & Company.</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-8 bg-blue-900 rounded-full"></div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Articles by {author.name}
            </h2>
          </div>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-md max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500 text-sm">This author hasn&apos;t published any articles yet.</p>
              <Link href="/" className="mt-6 inline-block px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-xs font-bold">
                Return to home page
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

