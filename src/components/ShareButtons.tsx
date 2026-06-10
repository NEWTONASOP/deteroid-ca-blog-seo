'use client'

interface ShareButtonsProps {
  title: string
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const handleShareClick = (platform: 'linkedin' | 'whatsapp' | 'twitter') => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href
      const encodedUrl = encodeURIComponent(currentUrl)
      const encodedTitle = encodeURIComponent(title)

      const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      }

      window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }

  return (
    <div className="flex items-center gap-2.5 ml-auto">
      <span className="font-bold text-[10px] text-gray-400 mr-1 uppercase tracking-wider">Share:</span>
      
      {/* LinkedIn Share */}
      <button 
        onClick={() => handleShareClick('linkedin')}
        title="Share on LinkedIn"
        className="w-7.5 h-7.5 rounded bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-300 border border-gray-200 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </button>
      
      {/* WhatsApp Share */}
      <button 
        onClick={() => handleShareClick('whatsapp')}
        title="Share on WhatsApp"
        className="w-7.5 h-7.5 rounded bg-gray-50 hover:bg-emerald-600 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-300 border border-gray-200 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.208-3.8c1.678.995 3.327 1.545 5.231 1.545 5.513 0 9.998-4.486 10.001-10.002.002-2.671-1.03-5.184-2.909-7.065S14.686 1.83 12.019 1.83C6.505 1.83 2.02 6.316 2.017 11.83c-.001 2.005.535 3.565 1.562 5.345l-.988 3.61 3.674-.955z"/>
        </svg>
      </button>
      
      {/* Twitter Share */}
      <button 
        onClick={() => handleShareClick('twitter')}
        title="Share on Twitter"
        className="w-7.5 h-7.5 rounded bg-gray-50 hover:bg-black hover:text-white text-gray-600 flex items-center justify-center transition-all duration-300 border border-gray-200 cursor-pointer"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
    </div>
  )
}
