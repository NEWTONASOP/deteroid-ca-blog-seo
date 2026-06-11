import type { Metadata } from 'next'
import FloatingContact from '@/components/FloatingContact'
import ContactForm from '@/components/ContactForm'
import { client } from '@/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { urlForImage } from '@/sanity/image'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://saroracompany.com'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null)
  const seo = siteSettings?.contactSeo
  const siteName = siteSettings?.siteName || 'Shalini Arora & Company'

  const title = seo?.metaTitle || `Contact Us | ${siteName} - CA in Noida`
  const description = seo?.metaDescription || `Contact ${siteName} in Noida. Reach out for taxation, GST, audit, or corporate advisory consultations. Available Mon-Fri 10AM–6:30PM.`
  const keywords = seo?.metaKeywords || ['CA contact Noida', 'Chartered Accountant consultation', 'tax advisory contact', 'GST expert Noida']
  const noIndex = siteSettings?.noIndexAll || seo?.noIndex || false

  let ogImageUrl: string | null = null
  if (seo?.shareImage) {
    ogImageUrl = urlForImage(seo.shareImage)?.width(1200).height(630).url() ?? null
  } else if (siteSettings?.defaultShareImage) {
    ogImageUrl = urlForImage(siteSettings.defaultShareImage)?.width(1200).height(630).url() ?? null
  }

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: {
      title: seo?.metaTitle || `Contact Us | ${siteName}`,
      description,
      url: `${SITE_URL}/contact`,
      siteName,
      type: 'website',
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || `Contact Us | ${siteName}`,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-28 pb-20 relative overflow-hidden border-b border-blue-950">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0"></div>
        <div className="absolute top-[-25%] left-[-10%] w-[50%] h-[70%] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 bg-blue-900/20 border border-blue-900/35 rounded-md text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Contact Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Reach out to our experts for consultation, tax filings, GST audits, or corporate advises.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50/20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading border-b border-gray-100 pb-4">
                  Contact Information
                </h3>
                
                <ul className="space-y-6">
                  {/* Address */}
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-blue-900 flex items-center justify-center mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Office Address</h4>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                        226, Wave Silver Tower, D Block, Pocket D, Sector 18, Noida, Uttar Pradesh 201301
                      </p>
                    </div>
                  </li>

                  {/* Phone */}
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-blue-900 flex items-center justify-center mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Phone Number</h4>
                      <a href="tel:+919873709194" className="text-blue-900 font-semibold text-sm mt-1 block hover:underline">
                        +91 9873709194
                      </a>
                    </div>
                  </li>

                  {/* Email */}
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-blue-900 flex items-center justify-center mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Email Address</h4>
                      <a href="mailto:contact@saroracompany.com" className="text-blue-900 font-semibold text-sm mt-1 block hover:underline">
                        contact@saroracompany.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Office Map placeholder / Info */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-xl shadow-lg text-white">
                <h4 className="font-bold text-lg mb-3">Consultation Hours</h4>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Monday - Friday</span>
                    <span className="font-semibold text-white">10:00 AM - 6:30 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Saturday</span>
                    <span className="font-semibold text-white">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-amber-300 font-semibold">Closed (By Appointment Only)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form Column (Client Component) */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Send Us a Message</h2>
              <p className="text-sm text-gray-500 mb-8">Tell us about your accounting, taxation, or audit requirements and we will contact you shortly.</p>
              <ContactForm />
            </div>
            
          </div>
        </div>
      </section>

      {/* Floating Call/WhatsApp Contacts */}
      <FloatingContact />
    </div>
  )
}
