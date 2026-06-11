import { portableTextComponents } from '@/components/PortableTextComponents'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { POST_BY_SLUG_QUERY, SITE_SETTINGS_QUERY, SITEMAP_POSTS_QUERY } from '@/sanity/queries'
import { urlForImage } from '@/sanity/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ShareButtons from '@/components/ShareButtons'
import NewsletterForm from '@/components/NewsletterForm'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://blog.sarsaroracompany.com'

export async function generateStaticParams() {
  const posts = await client
    .fetch<{ slug: string }[]>(SITEMAP_POSTS_QUERY)
    .catch(() => [])
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug }).catch(() => null);

  if (!post) {
    return {};
  }

  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null);
  const siteName = siteSettings?.siteName || "Shalini Arora & Company";

  const title = post.seo?.metaTitle
    ? { absolute: post.seo.metaTitle }
    : post.title;

  const description = post.seo?.metaDescription || post.excerpt || `Read ${post.title} on ${siteName}`;

  let ogImageUrl = null;
  if (post.seo?.shareImage) {
    ogImageUrl = urlForImage(post.seo.shareImage)?.width(1200).height(630).url();
  } else if (post.mainImage) {
    ogImageUrl = urlForImage(post.mainImage)?.width(1200).height(630).url();
  } else if (siteSettings?.defaultShareImage) {
    ogImageUrl = urlForImage(siteSettings.defaultShareImage)?.width(1200).height(630).url();
  }

  const keywords = post.seo?.metaKeywords || post.categories?.map((c: any) => c.title) || [];
  const noIndex = siteSettings?.noIndexAll || post.seo?.noIndex;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/post/${slug}`,
    },
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) {
    notFound();
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Unknown Date';

  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : null;
  const authorImageUrl = post.author?.image ? urlForImage(post.author.image)?.width(150).height(150).url() : null;

  // Estimate reading time based on body blocks word count
  let bodyWordCount = 0;
  if (post.body && Array.isArray(post.body)) {
    post.body.forEach((block: any) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child: any) => {
          if (child.text) {
            bodyWordCount += child.text.split(/\s+/).length;
          }
        });
      }
    });
  }
  const readTime = Math.max(3, Math.ceil(bodyWordCount / 180));

  // JSON-LD Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: post.author
      ? [
        {
          '@type': 'Person',
          name: post.author.name,
          url: `${SITE_URL}/author/${post.author.slug?.current || ''}`,
        },
      ]
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Shalini Arora & Company',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/post/${post.slug?.current}`,
    },
  };

  return (
    <article className="bg-gray-50 min-h-screen pb-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Post Header Banner */}
      <header className="bg-white pt-28 pb-16 relative overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center z-0"></div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          {post.categories && post.categories.length > 0 && (
            <div className="flex items-center justify-center gap-2 mb-5">
              {post.categories.map((cat: any) => (
                <Link
                  key={cat.title}
                  href={`/category/${cat.slug || ''}`}
                  className="text-[10px] font-bold px-2.5 py-0.5 bg-blue-50 border border-blue-100 text-blue-900 rounded hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors shadow-xs"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-2xl md:text-4xl font-extrabold mb-5 leading-tight tracking-tight font-heading text-gray-900 max-w-3xl mx-auto">
            {post.title}
          </h1>

          <div className="flex items-center justify-center text-gray-500 text-xs md:text-sm space-x-3.5">
            <div className="flex items-center">
              <div className="w-6.5 h-6.5 rounded-full bg-gray-100 mr-2 overflow-hidden relative flex items-center justify-center border border-gray-200">
                {authorImageUrl ? (
                  <Image src={authorImageUrl} alt={post.author?.name || 'Author'} fill className="object-cover" />
                ) : (
                  <span className="font-bold text-gray-500 text-[10px]">{post.author?.name?.charAt(0) || 'A'}</span>
                )}
              </div>
              <span className="font-bold text-gray-800 hover:text-blue-900 transition-colors">
                {post.author ? (
                  <Link href={`/author/${post.author.slug?.current || ''}`}>
                    {post.author.name}
                  </Link>
                ) : (
                  'Shalini Arora & Co.'
                )}
              </span>
            </div>
            <span>&bull;</span>
            <time dateTime={post.publishedAt} className="font-semibold">{date}</time>
            <span>&bull;</span>
            <span className="flex items-center gap-1 font-semibold">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-20">

        {/* Featured Image */}
        <div className="w-full h-56 md:h-[380px] bg-gray-100 rounded-2xl shadow-md mb-10 overflow-hidden relative border border-gray-200">
          {imageUrl ? (
            <Image src={imageUrl} alt={post.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 80vw" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300">
              <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Article Body */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 md:p-9 border border-gray-200 shadow-md">
            <div className="max-w-none text-gray-800">
              {post.body ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : (
                <p className="text-gray-500 italic text-center py-10">This post has no content yet.</p>
              )}
            </div>

            {/* Bottom tags & Share widgets */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-5">
              {post.categories && post.categories.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-[10px] text-gray-400 mr-1 uppercase tracking-wider">Tags:</span>
                  {post.categories.map((cat: any) => (
                    <span
                      key={cat.title}
                      className="text-xs bg-gray-50 text-gray-700 px-2.5 py-0.5 rounded border border-gray-100 font-semibold"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}

              <ShareButtons title={post.title} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Author Widget */}
            {post.author && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md text-center">
                <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-gray-400 mb-4 border-b border-gray-100 pb-2.5">
                  Author Spotlight
                </h3>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-50 overflow-hidden relative border border-gray-200 shadow-xs mb-3">
                    {authorImageUrl ? (
                      <Image src={authorImageUrl} alt={post.author.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700 text-lg font-bold">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <h4 className="font-bold text-blue-900 text-base hover:underline">
                    <Link href={`/author/${post.author.slug?.current || ''}`}>
                      {post.author.name}
                    </Link>
                  </h4>

                  {post.author.bio && (
                    <div className="text-gray-600 text-xs leading-relaxed max-w-xs mt-3.5 border-t border-gray-100 pt-3.5 flex flex-col items-center">
                      <PortableText value={post.author.bio} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Newsletter Widget */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white text-center border border-blue-950 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

              <h3 className="font-bold text-base mb-1.5 text-white font-heading">Direct Updates</h3>
              <p className="text-xs text-blue-100/80 mb-5 leading-relaxed">Get compliance changes and advisory columns directly in your mail.</p>
              <NewsletterForm layout="stacked" />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
