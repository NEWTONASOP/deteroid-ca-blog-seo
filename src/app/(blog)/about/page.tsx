import type { Metadata } from 'next'
import Image from 'next/image'
import FloatingContact from '@/components/FloatingContact'
import { client } from '@/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { urlForImage } from '@/sanity/image'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://saroracompany.com'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null)
  const seo = siteSettings?.aboutSeo
  const siteName = siteSettings?.siteName || 'Shalini Arora & Company'

  const title = seo?.metaTitle || `About Us | ${siteName} - CA in Noida`
  const description = seo?.metaDescription || `Learn about ${siteName}. Providing taxation, audit, GST, and business advisory services with over a decade of financial expertise in Noida.`
  const keywords = seo?.metaKeywords || ['About CA firm Noida', 'Shalini Arora CA', 'Chartered Accountant Noida firm']
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
    alternates: { canonical: `${SITE_URL}/about` },
    openGraph: {
      title: seo?.metaTitle || `About Us | ${siteName}`,
      description,
      url: `${SITE_URL}/about`,
      siteName,
      type: 'website',
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || `About Us | ${siteName}`,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

const ClockIcon = () => (
  <svg className="h-5 w-5 text-blue-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function AboutPage() {
  const team = [
    {
      name: "SANJAY (FCA)",
      image: "https://i.ibb.co/gZPHcZ07/image.png",
      title: "Managing Partner",
      description: "Mr. Sanjay is a fellow member of the Institute of Chartered Accountants of India. He is the Managing Partner of Shalini Arora & Company, a leading Chartered Accountants Firm, which was incorporated on 25th May, 2012.",
      experience: "14 years"
    },
    {
      name: "CA SHALINI ARORA",
      image: "https://i.ibb.co/TqgjM12v/image.png",
      title: "Founder & Partner",
      description: "CA Shalini Arora is a practicing Chartered Accountant based in Noida, offering comprehensive accounting, taxation, audit, and advisory services to individuals, startups, and growing businesses.",
      experience: "10+ Years"
    },
    {
      name: "CA ANKUR ARORA",
      image: "https://i.ibb.co/FL3W7Q8D/image.png",
      title: "Consultant",
      description: "CA Ankur Arora is a practicing Chartered Accountant in Delhi offering comprehensive services in income tax, GST, audit, compliance, and financial consulting with a client-centric approach.",
      experience: "10+ Years"
    }
  ]

  const values = [
    {
      title: "Integrity",
      description: "We adhere to the highest ethical and professional standards in all our interactions and service delivery."
    },
    {
      title: "Excellence",
      description: "We are committed to delivering top-quality financial advice, accurate reportings, and robust compliance guidelines."
    },
    {
      title: "Client-Centricity",
      description: "We understand your unique business requirements and tailor our services to maximize your financial success."
    },
    {
      title: "Transparency",
      description: "Clear communication, upfront competitive pricing, and regular updates on status of filings without hidden clauses."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-28 pb-20 relative overflow-hidden border-b border-blue-950">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0"></div>
        <div className="absolute top-[-25%] left-[-10%] w-[50%] h-[70%] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-3 py-1 bg-blue-900/20 border border-blue-900/35 rounded-md text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
            Who We Are
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">About Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Your trusted partner for taxation, audit, GST compliance, and corporate consulting in Noida.
          </p>
        </div>
      </section>

      {/* Profile details */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-150 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
              Shalini Arora and Company
            </h2>
            <p className="text-gray-700 leading-relaxed text-base mb-6">
              Founded on May 25, 2012, Shalini Arora & Company has spent more than a decade helping corporate groups, small businesses, startups, and individuals successfully navigate the complexities of accounting, tax laws, audits, and statutory compliances.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              With a primary location in Noida and a professional team of Chartered Accountants, financial consultants, and compliance experts, we pride ourselves on offering responsive, high-quality, and cost-effective services. We ensure your financial structures are robust and completely aligned with regulatory requirements so you can focus on scaling your business operations.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((val, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Expert Team
            </h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meet the experienced professionals behind Shalini Arora & Company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                <div className="relative w-full h-80 bg-gray-100">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1">{member.title}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{member.description}</p>
                  <span className="text-xs font-semibold text-gray-400 mt-auto flex items-center gap-1">
                    <ClockIcon /> Experience: {member.experience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Call/WhatsApp Contacts */}
      <FloatingContact />
    </div>
  )
}
