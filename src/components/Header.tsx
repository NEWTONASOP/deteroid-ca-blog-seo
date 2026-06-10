'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const mainSiteUrl = 'https://saroracompany.com';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo - matching main site exactly */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.jpg" 
            alt="Shalini Arora & Co. Logo" 
            width={240} 
            height={60} 
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>
        
        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href={mainSiteUrl}
            className="text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Home
          </a>
          <a 
            href={`${mainSiteUrl}/about`}
            className="text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            About Us
          </a>
          <a 
            href={`${mainSiteUrl}/services`}
            className="text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Services
          </a>
          <Link 
            href="/"
            className="text-sm font-medium text-blue-900 transition-colors"
          >
            Blog
          </Link>
          <a 
            href={`${mainSiteUrl}/#clients`}
            className="text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Our Clients
          </a>
          <a 
            href={`${mainSiteUrl}/contact`}
            className="text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
          >
            Contact Us
          </a>
          
          {/* Book Appointment Button */}
          <a 
            href={`${mainSiteUrl}/contact`}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg border-2 border-blue-900 hover:border-blue-800"
          >
            Book Appointment
          </a>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-900 p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3 flex flex-col">
            <a 
              href={mainSiteUrl}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-900 py-2 border-b border-gray-50 transition-colors"
            >
              Home
            </a>
            <a 
              href={`${mainSiteUrl}/about`}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-900 py-2 border-b border-gray-50 transition-colors"
            >
              About Us
            </a>
            <a 
              href={`${mainSiteUrl}/services`}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-900 py-2 border-b border-gray-50 transition-colors"
            >
              Services
            </a>
            <Link 
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-blue-900 py-2 border-b border-gray-50 transition-colors"
            >
              Blog
            </Link>
            <a 
              href={`${mainSiteUrl}/#clients`}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-900 py-2 border-b border-gray-50 transition-colors"
            >
              Our Clients
            </a>
            <a 
              href={`${mainSiteUrl}/contact`}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-blue-900 py-2 border-b border-gray-50 transition-colors"
            >
              Contact Us
            </a>
            
            <a 
              href={`${mainSiteUrl}/contact`}
              onClick={() => setIsOpen(false)}
              className="mt-2 text-center px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-md"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
