import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="relative mb-6 inline-flex items-center justify-center">
            {/* Styled 404 Accent background */}
            <span className="text-9xl font-black text-blue-900/5 select-none tracking-tight">404</span>
            <span className="absolute text-5xl font-extrabold text-blue-900 font-heading">404</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">
            Page Not Found
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto mb-6 rounded-full" />
          
          <p className="text-gray-650 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Back to Insights
            </Link>
            
            <a 
              href="https://saroracompany.com/contact"
              className="text-sm font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 transition-colors group/contact-l"
            >
              Contact Support <span className="transform translate-x-0 group-hover/contact-l:translate-x-1 transition-transform duration-200">&rarr;</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
