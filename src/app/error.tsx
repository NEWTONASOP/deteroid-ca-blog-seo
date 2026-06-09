'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled runtime error:', error)
  }, [error])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-full border border-red-100 shadow-sm animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">
            Something went wrong!
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mx-auto mb-6 rounded-full" />
          
          <p className="text-gray-650 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer"
            >
              Try Again
            </button>
            
            <Link 
              href="/"
              className="text-sm font-semibold text-blue-900 hover:text-blue-700 flex items-center justify-center gap-1 transition-colors w-full sm:w-auto"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
