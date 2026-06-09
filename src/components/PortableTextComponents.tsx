import { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value ? urlForImage(value)?.url() : null;
      
      if (!imageUrl) {
        return (
          <div className="my-6 bg-gray-50 rounded-xl h-48 flex flex-col items-center justify-center text-gray-400 border border-gray-200">
            <svg className="w-8 h-8 opacity-45 mb-1.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-xs font-semibold">Image unavailable</span>
          </div>
        )
      }
      return (
        <figure className="my-8 relative w-full h-[18rem] md:h-[24rem] rounded-xl overflow-hidden shadow-sm border border-gray-200 group">
          <Image 
            src={imageUrl} 
            alt={value.alt || "Article illustration"} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            className="object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
          />
          {value.caption && (
            <figcaption className="absolute bottom-0 inset-x-0 bg-gray-900/85 text-gray-200 text-xs px-4 py-2 backdrop-blur-xs">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    normal: ({ children }) => <p className="mb-5 text-gray-700 leading-relaxed text-[15px] md:text-[16px]">{children}</p>,
    h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold mt-10 mb-4 text-blue-900 relative pb-2 border-b border-gray-100">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg md:text-xl font-bold mt-8 mb-3.5 text-blue-900">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base md:text-lg font-bold mt-6 mb-3 text-gray-800">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-900 pl-5 py-3 my-6 italic text-gray-700 bg-blue-50/25 rounded-r border-y border-r border-gray-100 shadow-xs relative">
        <span className="absolute left-2 top-0.5 text-2xl text-blue-900/10 font-serif leading-none select-none">&#8220;</span>
        <div className="relative z-10">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-5 space-y-2 text-gray-700 text-[15px] md:text-[16px]">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-5 space-y-2 text-gray-700 text-[15px] md:text-[16px]">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          target={!value.href.startsWith('/') ? '_blank' : undefined}
          className="text-blue-900 font-bold underline decoration-blue-900/30 decoration-2 underline-offset-4 hover:decoration-blue-900 transition-all duration-200"
        >
          {children}
        </Link>
      )
    },
  },
}


