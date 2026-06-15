'use client'

import Script from 'next/script'
import { useState } from 'react'

export default function BotpressChat() {
  const configUrl = process.env.NEXT_PUBLIC_BOTPRESS_CONFIG_URL || ''

  const isDev = process.env.NODE_ENV === 'development'
  const [showHelper, setShowHelper] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [injectLoaded, setInjectLoaded] = useState(false)

  // If configUrl is set, load the Botpress Scripts sequentially
  if (configUrl) {
    return (
      <>
        {/* Main Inject Script */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
          strategy="lazyOnload"
          onLoad={() => setInjectLoaded(true)}
        />
        {/* Configuration Script - loads only after Inject Script is ready */}
        {injectLoaded && (
          <Script
            src={configUrl}
            strategy="lazyOnload"
            defer
          />
        )}
      </>
    )
  }

  // If credentials are NOT set and we are in development, show the sleek setup helper
  if (isDev && showHelper) {
    return (
      <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
        {isExpanded ? (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 p-6 max-w-sm w-80 text-gray-800 animate-in fade-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-base font-bold text-blue-900 tracking-tight flex items-center gap-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  Configure Botpress Chat
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Integrate your Botpress Assistant</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-50 cursor-pointer"
                title="Collapse"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50">
                <span className="font-semibold text-blue-900">Step 1: Copy your script tag</span>
                <p className="text-gray-600 mt-1">
                  Locate the script tag URLs in your Botpress Dashboard under the **Webchat** deploy settings.
                </p>
              </div>

              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50">
                <span className="font-semibold text-blue-900">Step 2: Add to .env.local</span>
                <p className="text-gray-600 mt-1 mb-2">
                  Extract the second script&apos;s `src` URL and add it to your local environment file:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-2.5 rounded text-[10px] font-mono overflow-x-auto select-all leading-normal whitespace-pre">
{`NEXT_PUBLIC_BOTPRESS_CONFIG_URL="https://files.bpcontent.cloud/...js"`}
                </pre>
              </div>

              <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50">
                <span className="font-semibold text-blue-900">Step 3: Restart dev server</span>
                <p className="text-gray-600 mt-1">
                  Restart your server (`npm run dev`) to apply the changes.
                </p>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="mt-5 flex gap-2 justify-end border-t border-gray-100 pt-3">
              <button
                onClick={() => {
                  setShowHelper(false)
                  setIsExpanded(false)
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-transparent transition-all cursor-pointer"
              >
                Hide Permanent
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="bg-blue-900 hover:bg-blue-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-blue-900/20 transform hover:-translate-y-0.5 transition-all duration-300 border border-blue-950/20 group cursor-pointer"
            title="Configure Botpress Chatbot"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <svg
              className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-bold tracking-tight">Setup Botpress Chat</span>
          </button>
        )}
      </div>
    )
  }

  return null
}
