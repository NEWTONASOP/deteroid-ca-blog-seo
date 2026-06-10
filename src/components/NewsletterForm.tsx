'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  layout?: 'inline' | 'stacked'
}

export default function NewsletterForm({ layout = 'inline' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    
    // Simulate subscription process
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1200)
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white/10 rounded-xl border border-white/20 text-center animate-pulse">
        <svg className="w-8 h-8 text-emerald-400 mb-2" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-bold text-white">Thank you for subscribing!</p>
        <p className="text-xs text-blue-100 mt-1">You will now receive compliance updates directly.</p>
      </div>
    )
  }

  if (layout === 'inline') {
    return (
      <div className="w-full">
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder="Your professional email" 
            required
            className="flex-grow px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm focus:ring-2 focus:ring-blue-700"
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-lg transition-all shadow-lg text-sm uppercase tracking-wider disabled:opacity-70 cursor-pointer flex items-center justify-center min-w-[120px]"
          >
            {status === 'loading' ? (
              <svg className="animate-spin h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Subscribe'}
          </button>
        </form>
        {status === 'error' && (
          <p className="text-red-300 text-xs mt-2 text-left font-semibold">{errorMessage}</p>
        )}
      </div>
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubscribe} className="space-y-2.5 relative z-10">
        <input 
          type="email" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="Professional Email Address" 
          required
          className="w-full px-3.5 py-2.5 rounded bg-white/10 border border-white/10 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-blue-750 focus:bg-white focus:text-gray-900 transition-all font-bold" 
        />
        <button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-2.5 bg-white text-blue-900 font-extrabold rounded hover:bg-gray-100 transition-colors text-xs uppercase tracking-wider disabled:opacity-70 cursor-pointer flex items-center justify-center"
        >
          {status === 'loading' ? (
            <svg className="animate-spin h-4 w-4 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Subscribe Now'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-300 text-xs mt-2 text-center font-semibold">{errorMessage}</p>
      )}
    </div>
  )
}
