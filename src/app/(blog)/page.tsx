import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import FloatingContact from '@/components/FloatingContact'
import { client } from '@/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { urlForImage } from '@/sanity/image'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://saroracompany.com'

export const revalidate = 3600 // re-fetch Sanity settings at most once per hour

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null)
  const seo = siteSettings?.homeSeo
  const siteName = siteSettings?.siteName || 'Shalini Arora & Company'

  const title = seo?.metaTitle || 'Shalini Arora & Company - Best CA in Noida | Chartered Accountants'
  const description = seo?.metaDescription || 'Trusted Chartered Accountants in Noida. Expert Taxation, GST, Audit & Business Advisory Services. 10+ Years Experience. Book Appointment Today!'
  const keywords = seo?.metaKeywords || ['CA in Noida', 'Chartered Accountant Noida', 'Tax Filing', 'GST Services', 'Audit Services', 'Business Advisory']
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
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: seo?.metaTitle || 'Shalini Arora & Company - Best CA in Noida',
      description,
      url: SITE_URL,
      siteName,
      type: 'website',
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || 'Shalini Arora & Company - Best CA in Noida',
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

// JSON-LD Organization structured data
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: 'Shalini Arora & Company',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'Trusted Chartered Accountants in Noida offering Taxation, GST, Audit & Business Advisory services.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '226, Wave Silver Tower, D Block, Pocket D, Sector 18',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  telephone: '+91-9873709194',
  email: 'contact@saroracompany.com',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00',
    },
  ],
  sameAs: [],
}

// Icons as SVG Components to match compiled build
const StarIcon = () => (
  <svg className="h-6 w-6 text-amber-400 fill-current" viewBox="0 0 24 24">
    <path d="M12.0005 17.27L18.1805 21L16.5405 13.97L22.0005 9.24L14.8105 8.63L12.0005 2L9.19047 8.63L2.00049 9.24L7.46049 13.97L5.82049 21L12.0005 17.27Z" />
  </svg>
)

const AwardIcon = ({ className = "h-8 w-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0M9 18.75A3.75 3.75 0 109 11.25m6 7.5a3.75 3.75 0 100-7.5M9 11.25v-.75a3.75 3.75 0 117.5 0v.75m-7.5 0h7.5" />
  </svg>
)

const ClockIcon = ({ className = "h-8 w-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const CheckIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

export default function HomePage() {
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

  const testimonials = [
    {
      text: "Highly reliable CA firm for tax filing & GST compliance. Professional service and excellent support.",
      author: "Prakash Sharma",
      role: "Business Owner, Noida"
    },
    {
      text: "Saved me more money than I imagined through expert tax planning. Highly recommended!",
      author: "Neha Gupta",
      role: "Salaried Professional"
    },
    {
      text: "Best chartered accountant in Noida. Very professional and knowledgeable team.",
      author: "Rahul Verma",
      role: "Startup Founder"
    },
    {
      text: "Best services for NRI clients. They understand international taxation requirements perfectly.",
      author: "Prem Sehgal",
      role: "NRI Client, USA"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-32 pb-20 overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
            Trusted Chartered Accountants in <span className="text-blue-900">Noida</span>
          </h1>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Expert Taxation, GST, Audit & Business Advisory Services Since 2015
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contact" className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              Book Appointment
            </Link>
            <Link href="/services" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-900 hover:bg-blue-900 hover:text-white hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              View Services
            </Link>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-900 flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3 flex items-center justify-center">
                <AwardIcon className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">10+ Years</h3>
              <p className="text-gray-600 text-sm">Experience</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-900 flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3 flex items-center justify-center">
                <UsersIcon className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1000+</h3>
              <p className="text-gray-600 text-sm">Happy Clients</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-900 flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3 flex items-center justify-center">
                <ShieldCheckIcon className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Best CA Firm</h3>
              <p className="text-gray-600 text-sm">in Noida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive financial and compliance solutions tailored to your business needs
            </p>
          </div>

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

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7681087/pexels-photo-7681087.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto mb-4 rounded-full" />
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Your trusted partner for all financial and compliance needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: AwardIcon, title: "Best CA Firm in Noida", description: "Recognized for excellence and quality service delivery" },
              { icon: UsersIcon, title: "Trusted by Individuals & Businesses", description: "Over 1000+ satisfied clients across various industries" },
              { icon: ShieldCheckIcon, title: "Transparent Pricing", description: "No hidden charges, clear and competitive pricing structure" },
              { icon: ClockIcon, title: "Quick Turnaround Time", description: "Efficient service delivery without compromising on quality" }
            ].map((t, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 group flex flex-col items-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <t.icon className="h-10 w-10 text-blue-900" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{t.title}</h3>
                <p className="text-blue-100 text-center leading-relaxed text-sm">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About Shalini Arora & Company
            </h2>
            <div className="section-divider mx-auto mb-4" />
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium text-center md:text-left">
                Welcome to <span className="font-bold text-blue-900">Shalini Arora and Company</span> – Your Trusted Chartered Accountants in Noida!
              </p>
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                With over a decade of experience, we provide reliable accounting, taxation, GST, audit, and compliance services to individuals, startups, and businesses. Our client-centric approach, deep local expertise in Noida, and commitment to excellence help our clients stay compliant and financially strong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
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
                    <ClockIcon className="h-4 w-4 text-blue-900" /> Experience: {member.experience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Trusted by hundreds of satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50/20 p-8 rounded-xl border border-gray-100 hover:border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  </div>
                  <p className="text-gray-700 italic text-sm leading-relaxed">&ldquo;{test.text}&rdquo;</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-950 text-sm">{test.author}</h4>
                  <p className="text-xs text-blue-900 font-semibold">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white text-center relative overflow-hidden border-t border-blue-950">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Build Something Great Together</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Partner with us for expert financial guidance and compliance solutions that drive your business forward.
          </p>
          <Link href="/contact" className="inline-block bg-gradient-to-r from-amber-500 to-amber-400 text-blue-950 px-8 py-3.5 rounded-lg font-bold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg border border-amber-400">
            Book Consultation
          </Link>
        </div>
      </section>

      {/* Floating Call/WhatsApp Contacts */}
      <FloatingContact />
    </div>
  )
}
