'use client'

import { useState } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

export default function FloatingContact() {
  const whatsappNumber = '919873709194'
  const prefilledText = 'Hello! I would like to know more about your CA services.'
  const [showLabels, setShowLabels] = useState(false)

  const handleWhatsAppClick = () => {
    sendGAEvent('event', 'whatsapp_click', { event_category: 'contact' })
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handlePhoneClick = () => {
    sendGAEvent('event', 'call_click', { event_category: 'contact' })
    window.location.href = `tel:${whatsappNumber}`
  }

  return (
    <div className="fixed bottom-6 left-6 flex flex-col items-start gap-4 z-50">
      {showLabels && (
        <div className="flex flex-col items-start gap-5 mb-1 ml-1">
          <div className="bg-white rounded-lg shadow-lg px-3 py-1.5 border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <p className="text-xs font-bold text-gray-700">Chat with us</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg px-3 py-1.5 border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <p className="text-xs font-bold text-gray-700">Call us</p>
          </div>
        </div>
      )}
      
      {/* Call button */}
      <button
        onClick={handlePhoneClick}
        onMouseEnter={() => setShowLabels(true)}
        onMouseLeave={() => setShowLabels(false)}
        className="bg-blue-900 text-white p-3.5 rounded-full shadow-2xl hover:bg-blue-800 transform hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center border border-blue-950"
        aria-label="Call Us"
      >
        <svg className="w-6.5 h-6.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </button>

      {/* WhatsApp button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowLabels(true)}
        onMouseLeave={() => setShowLabels(false)}
        className="bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:bg-emerald-600 transform hover:scale-110 transition-all duration-300 animate-bounce cursor-pointer flex items-center justify-center border border-emerald-600"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-6.5 h-6.5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.466L0 24zm6.59-4.846c1.62.962 3.21 1.463 4.957 1.464 5.485.002 9.948-4.463 9.952-9.952.002-2.66-1.033-5.161-2.91-7.04-1.876-1.879-4.374-2.914-7.036-2.915-5.492 0-9.955 4.463-9.959 9.952-.001 1.849.5 3.655 1.453 5.247l-1.019 3.717 3.824-1.004-.337-.172zm11.305-6.852c-.295-.148-1.748-.863-2.019-.961-.272-.099-.47-.148-.667.148-.198.297-.768.961-.941 1.159-.173.197-.346.222-.642.074-.296-.148-1.25-.461-2.38-1.469-.88-.785-1.474-1.755-1.647-2.052-.172-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.371-.025-.52-.075-.148-.667-1.608-.914-2.202-.24-.579-.485-.502-.667-.51l-.57-.008c-.197 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.748-.715 1.995-1.407.247-.692.247-1.288.173-1.407-.074-.118-.27-.197-.567-.346z" />
        </svg>
      </button>
    </div>
  )
}
