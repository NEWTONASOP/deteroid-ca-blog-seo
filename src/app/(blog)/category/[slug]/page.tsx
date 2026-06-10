import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { POSTS_BY_CATEGORY_QUERY, CATEGORY_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import { urlForImage } from '@/sanity/image'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug }).catch(() => null);

  if (!category) {
    return {};
  }

  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null);
  const siteName = siteSettings?.siteName || "Shalini Arora & Company";

  const title = category.seo?.metaTitle 
    ? { absolute: category.seo.metaTitle } 
    : `${category.title} Insights`;
    
  const description = category.seo?.metaDescription || category.description || `Read compliance and tax insights on ${category.title} from ${siteName}`;

  let ogImageUrl = null;
  if (category.seo?.shareImage) {
    ogImageUrl = urlForImage(category.seo.shareImage)?.width(1200).height(630).url();
  } else if (siteSettings?.defaultShareImage) {
    ogImageUrl = urlForImage(siteSettings.defaultShareImage)?.width(1200).height(630).url();
  }

  const keywords = category.seo?.metaKeywords || [category.title, 'compliance', 'updates'];
  const noIndex = siteSettings?.noIndexAll || category.seo?.noIndex;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: category.seo?.metaTitle || category.title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.seo?.metaTitle || category.title,
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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await client.fetch(CATEGORY_BY_SLUG_QUERY, { slug });
  
  if (!category) {
    notFound();
  }

  const posts = await client.fetch(POSTS_BY_CATEGORY_QUERY, { categorySlug: slug });

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
          
          <div className="inline-block px-3 py-1 bg-blue-900/20 border border-blue-900/35 rounded-md text-blue-200 text-xs font-bold uppercase tracking-wide mb-3">
            Topic Overview
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-heading">{category.title}</h1>
          <p className="text-blue-100/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {category.description || `Browse all our latest articles, insights, and updates related to ${category.title}.`}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-8 bg-blue-900 rounded-full"></div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Articles in {category.title}
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">No posts in this category</h3>
              <p className="text-gray-500 text-sm">We haven&apos;t published any articles about {category.title} yet.</p>
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

