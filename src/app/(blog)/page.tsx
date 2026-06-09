import PostCard from '@/components/PostCard'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { ALL_POSTS_QUERY, ALL_CATEGORIES_QUERY } from '@/sanity/queries'
import { urlForImage } from '@/sanity/image'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const [posts, categories] = await Promise.all([
    client.fetch(ALL_POSTS_QUERY),
    client.fetch(ALL_CATEGORIES_QUERY)
  ]);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts.length > 1 ? posts.slice(1) : [];

  const featuredImageUrl = featuredPost?.mainImage ? urlForImage(featuredPost.mainImage)?.url() : null;
  const featuredDate = featuredPost?.publishedAt 
    ? new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  const featuredWordCount = featuredPost 
    ? (featuredPost.title + (featuredPost.excerpt || '')).split(/\s+/).length 
    : 0;
  const featuredReadTime = Math.max(3, Math.ceil(featuredWordCount / 30));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - matching main site's clean light style */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-28 pb-20 overflow-hidden">
        {/* Background image overlay like main site */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Expert Financial Insights &{' '}
            <span className="text-blue-900">Tax Updates</span>
          </h1>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stay compliant and make informed business choices with regulatory analyses, GST updates, and tax guidelines curated by the experts at Shalini Arora & Company.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <input 
              type="text" 
              placeholder="Search tax rules, compliance calendars..." 
              className="w-full pl-5 pr-14 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm shadow-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 min-w-max items-center justify-center">
            <Link 
              href="/" 
              className="px-5 py-2 bg-blue-900 text-white font-semibold rounded-lg text-sm transition-all shadow-sm"
            >
              All Insights
            </Link>
            {categories.map((cat: any) => (
              <Link 
                key={cat._id} 
                href={`/category/${cat.slug}`} 
                className="px-5 py-2 hover:bg-gray-100 text-gray-600 hover:text-blue-900 font-medium rounded-lg text-sm transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 flex-grow bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Spotlight */}
          {featuredPost && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Featured Insight
                </h2>
                <div className="section-divider mx-auto" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="lg:col-span-7 relative h-64 lg:h-[400px] w-full bg-gray-50 overflow-hidden">
                  {featuredImageUrl ? (
                    <Image 
                      src={featuredImageUrl} 
                      alt={featuredPost.title} 
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gradient-to-br from-blue-50 to-gray-50">
                      <svg className="w-20 h-20 opacity-30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {featuredPost.categories?.slice(0, 1).map((cat: any) => (
                      <span key={cat.title} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-100 text-blue-900">
                        {cat.title}
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredReadTime} min read
                    </span>
                  </div>
                  
                  <Link href={`/post/${featuredPost.slug?.current || ''}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-900 transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                    {featuredPost.excerpt || 'Read the full article for detailed compliance updates and expert analysis.'}
                  </p>
                  
                  <div className="flex items-center mt-auto pt-6 border-t border-gray-100 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200">
                        {featuredPost.author?.image ? (
                          <Image src={urlForImage(featuredPost.author.image)?.width(100).height(100).url() || ''} alt={featuredPost.author.name} fill className="object-cover" />
                        ) : (
                          <svg className="w-full h-full text-gray-400 mt-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800 leading-none">{featuredPost.author?.name || 'Shalini Arora & Co.'}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{featuredDate}</p>
                      </div>
                    </div>
                    
                    <Link href={`/post/${featuredPost.slug?.current || ''}`} className="text-sm font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 group/read-f transition-colors">
                      Read Article <span className="transform translate-x-0 group-hover/read-f:translate-x-1 transition-transform duration-200">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Latest Insights Grid */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Insights
            </h2>
            <div className="section-divider mx-auto" />
          </div>
          
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : !featuredPost ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No insights yet</h3>
              <p className="text-gray-500 text-sm">Our experts are preparing new compliance reports. Stay tuned!</p>
              <Link href="/studio" className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
                Open Sanity Studio
              </Link>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400 text-sm">
              More updates will be posted soon.
            </div>
          )}
          
          {recentPosts.length > 9 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section - matching main site CTA style */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-blue-900 to-blue-800 text-white p-10 md:p-14 shadow-2xl overflow-hidden text-center md:text-left md:flex md:items-center md:justify-between gap-10">
            <div className="relative z-10 md:max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Never Miss a Tax Update</h2>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                Subscribe to our newsletter for the latest compliance alerts, tax calendars, and business advisory articles directly in your inbox.
              </p>
            </div>
            
            <div className="relative z-10 mt-8 md:mt-0 flex-grow max-w-md">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your professional email" 
                  className="flex-grow px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-2 focus:ring-blue-700"
                />
                <button type="submit" className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-lg transition-all shadow-lg text-sm uppercase tracking-wider">
                  Subscribe
                </button>
              </form>
              <p className="text-blue-200/50 text-xs mt-3 text-center md:text-left">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
