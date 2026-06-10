'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(currentSearch)
  const [isPending, startTransition] = useTransition()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search)
    if (term.trim()) {
      params.set('q', term.trim())
    } else {
      params.delete('q')
    }
    
    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch(searchTerm)
      }}
      className="max-w-lg mx-auto relative"
    >
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tax rules, compliance calendars..." 
        className="w-full pl-5 pr-14 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm shadow-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
      />
      <button 
        type="submit"
        disabled={isPending}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isPending ? (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        )}
      </button>
    </form>
  )
}
