import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/image'

interface PostCardProps {
  post: {
    title: string;
    slug: { current: string };
    mainImage?: any;
    excerpt?: string;
    publishedAt?: string;
    author?: { name: string, image?: any };
    categories?: Array<{ title: string, slug?: string }>;
  }
}

export default function PostCard({ post }: PostCardProps) {
  // Date formatting
  const date = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent'

  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.url() : null;
  const authorImageUrl = post.author?.image ? urlForImage(post.author.image)?.width(100).height(100).url() : null;

  // Estimate reading time
  const wordCount = (post.title + (post.excerpt || '')).split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 30)); 

  return (
    <article className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      {/* Top accent border - matching main site's border-t-4 card pattern */}
      <div className="h-1 bg-gradient-to-r from-blue-900 to-blue-800 w-full" />
      
      {/* Image Container */}
      <Link href={`/post/${post.slug?.current || ''}`} className="relative h-52 w-full bg-gray-50 overflow-hidden block">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={post.title || "Blog post image"} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gradient-to-br from-blue-50 to-gray-50">
            <svg className="w-14 h-14 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
      </Link>
      
      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category & Read Time */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {post.categories?.slice(0, 2).map((cat) => (
            <Link 
              key={cat.title} 
              href={`/category/${cat.slug || ''}`} 
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-100 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors"
            >
              {cat.title}
            </Link>
          ))}
          <span className="text-xs text-gray-400 ml-auto flex items-center gap-1 font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readTime} min read
          </span>
        </div>
        
        {/* Title */}
        <Link href={`/post/${post.slug?.current || ''}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-2 line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3 mb-4 text-sm leading-relaxed">
          {post.excerpt || 'Read the full article for more insights and expert guidelines on this topic.'}
        </p>
        
        {/* Card Footer */}
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100 justify-between">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-gray-100 mr-2.5 overflow-hidden relative border border-gray-200">
              {authorImageUrl ? (
                <Image src={authorImageUrl} alt={post.author?.name || "Author"} fill className="object-cover" />
              ) : (
                <svg className="w-full h-full text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-800 block leading-none">
                {post.author?.name || 'Shalini Arora & Co.'}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5 block">{date}</span>
            </div>
          </div>
          
          <Link href={`/post/${post.slug?.current || ''}`} className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 group/read transition-colors">
            Read More <span className="transform translate-x-0 group-hover/read:translate-x-1 transition-transform duration-200">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
