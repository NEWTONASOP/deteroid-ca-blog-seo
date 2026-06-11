import type { Metadata } from 'next'
import Link from 'next/link'
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
  const seo = siteSettings?.servicesSeo
  const siteName = siteSettings?.siteName || 'Shalini Arora & Company'

  const title = seo?.metaTitle || `Our Services | ${siteName} - CA in Noida`
  const description = seo?.metaDescription || 'Explore our services including Company Registration, GST filing, Income Tax Returns, Corporate audits, NRI taxation, and business advisory services.'
  const keywords = seo?.metaKeywords || ['CA services Noida', 'GST filing', 'Income Tax Return', 'Company Registration', 'Audit services', 'NRI Taxation']
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
    alternates: { canonical: `${SITE_URL}/services` },
    openGraph: {
      title: seo?.metaTitle || `Our Services | ${siteName}`,
      description,
      url: `${SITE_URL}/services`,
      siteName,
      type: 'website',
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || `Our Services | ${siteName}`,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

// Icons
const AwardIcon = ({ className = "h-8 w-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0M9 18.75A3.75 3.75 0 109 11.25m6 7.5a3.75 3.75 0 100-7.5M9 11.25v-.75a3.75 3.75 0 117.5 0v.75m-7.5 0h7.5" />
  </svg>
)

const ShieldCheckIcon = ({ className = "h-8 w-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
)

const UsersIcon = ({ className = "h-8 w-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0012 20.25a11.38 11.38 0 00-3-1.013v-.109c0-1.112-.285-2.16-.786-3.07M7.5 14.25a3 3 0 00-3 3v2.01c0 .245.075.48.213.673a9.382 9.382 0 002.625.372c2.037 0 3.907-.65 5.437-1.76M7.5 14.25c-1.112 0-2.16-.286-3.07-.787M12.75 7.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 8.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
)

const BriefcaseIcon = ({ className = "h-8 w-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.453.258-.75.258H4.875c-.297 0-.556-.093-.75-.258m16.5 0a2.18 2.18 0 01-.75 1.661v.34c0 1.01-.76 1.87-1.765 1.965a48.242 48.242 0 01-12.235 0C4.91 17.74 4.15 16.88 4.15 15.87v-.34a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.11 48.11 0 013.413-.387m11.12 0A49.04 49.04 0 0012 4.5c-2.1 0-4.14.13-6.14.387m12.28 0V4.5a2.25 2.25 0 00-2.25-2.25h-3.75a2.25 2.25 0 00-2.25 2.25v.274m3.75 0h.008v.008h-.008V8.25" />
  </svg>
)

export default function ServicesPage() {
  const services = [
    {
      id: "startup",
      category: "Startups",
      icon: BriefcaseIcon,
      color: "from-blue-900 to-blue-800",
      items: [
        { name: "Company Registration", description: "Quick and hassle-free company registration services" },
        { name: "Startup Advisory", description: "Expert guidance for new businesses" },
        { name: "Compliance Setup", description: "Complete compliance framework setup" }
      ]
    },
    {
      id: "accounting",
      category: "Accounting & Bookkeeping",
      icon: ShieldCheckIcon,
      color: "from-blue-800 to-blue-700",
      items: [
        { name: "Bookkeeping Services", description: "Accurate and timely financial record keeping" },
        { name: "Financial Statements", description: "Comprehensive financial reporting" },
        { name: "Payroll Management", description: "Efficient payroll processing services" }
      ]
    },
    {
      id: "taxation",
      category: "Taxation",
      icon: AwardIcon,
      color: "from-blue-900 to-blue-800",
      items: [
        { name: "Income Tax Return Filing", description: "Expert ITR filing for individuals and businesses" },
        { name: "Tax Planning", description: "Strategic tax optimization solutions" },
        { name: "TDS Compliance", description: "Complete TDS return filing and management" },
        { name: "Advance Tax", description: "Advance tax calculation and payment assistance" }
      ]
    },
    {
      id: "gst",
      category: "GST Services",
      icon: ShieldCheckIcon,
      color: "from-blue-800 to-blue-700",
      items: [
        { name: "GST Registration", description: "Fast GST registration process" },
        { name: "GST Return Filing", description: "Timely GST return filing services" },
        { name: "GST Audit", description: "Comprehensive GST audit services" },
        { name: "GST Advisory", description: "Expert GST consultation and compliance" }
      ]
    },
    {
      id: "audit",
      category: "Audit & Compliance",
      icon: AwardIcon,
      color: "from-blue-900 to-blue-800",
      items: [
        { name: "Statutory Audit", description: "Professional statutory audit services" },
        { name: "Internal Audit", description: "Thorough internal control review" },
        { name: "ROC Filings", description: "Complete ROC compliance and filing" },
        { name: "Compliance Management", description: "End-to-end compliance solutions" }
      ]
    },
    {
      id: "nri",
      category: "NRI Taxation",
      icon: UsersIcon,
      color: "from-blue-800 to-blue-700",
      items: [
        { name: "NRI Tax Planning", description: "Specialized tax services for NRIs" },
        { name: "FEMA Compliance", description: "Foreign exchange management advice" },
        { name: "Investment Advisory", description: "Strategic investment guidance" },
        { name: "Financial Consulting", description: "Expert financial guidance and solutions" }
      ]
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
            What We Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Services</h1>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Comprehensive financial, accounting, taxation, and audit services customized for your needs.
          </p>
        </div>
      </section>

      {/* Services Listing */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((t) => (
              <div key={t.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
                <div className={`bg-gradient-to-r ${t.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <t.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{t.category}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <ul className="space-y-4 mb-8">
                    {t.items.map((item, idx) => (
                      <li key={idx} className="border-l-2 border-blue-900 pl-4 hover:border-amber-500 transition-colors">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{item.name}</h4>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${t.id}`} className="inline-block w-full text-center bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm">
                    Know More
                  </Link>
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
