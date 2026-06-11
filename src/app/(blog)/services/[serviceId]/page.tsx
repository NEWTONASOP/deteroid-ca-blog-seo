import Link from 'next/link'
import { notFound } from 'next/navigation'
import FloatingContact from '@/components/FloatingContact'

// Service Data Dictionary matching compiled React app
const servicesData: Record<string, { title: string; description: string; details: string; features: string[] }> = {
  startup: {
    title: "Startup Services",
    description: "Complete support for new ventures and businesses",
    details: "We provide comprehensive startup services including business registration, GST compliance, accounting setup, and financial planning to help your new business succeed.",
    features: ["Business Entity Registration", "GST Registration & Compliance", "Accounting Setup & Implementation", "Financial Planning & Analysis", "Statutory Compliance", "Tax Planning for Startups", "Payroll Management", "Bank Reconciliation"]
  },
  accounting: {
    title: "Accounting & Bookkeeping",
    description: "Professional accounting and bookkeeping services",
    details: "We provide comprehensive accounting and bookkeeping services to maintain accurate financial records, generate timely reports, and help you make informed business decisions.",
    features: ["Bookkeeping Services", "Financial Statement Preparation", "Payroll Management & Processing", "Accounts Payable & Receivable", "Bank Reconciliation", "Monthly Financial Reporting", "Cash Flow Management", "Financial Analysis & Advisory"]
  },
  taxation: {
    title: "Taxation Services",
    description: "Expert income tax and corporate tax services",
    details: "Our taxation experts help individuals and corporations optimize their tax position while ensuring full compliance with income tax laws.",
    features: ["Individual Income Tax Filing", "Corporate Income Tax Planning", "Tax Return Preparation", "Tax Audit", "Transfer Pricing", "International Taxation", "Tax Deduction Planning", "Tax Representation"]
  },
  gst: {
    title: "GST Services",
    description: "Comprehensive GST registration and compliance",
    details: "We handle all aspects of GST compliance including registration, filing, audits, and advisory services for businesses of all sizes.",
    features: ["GST Registration", "GST Return Filing (GSTR 1, 2, 3B)", "GST Compliance Management", "GST Audit", "GST Refund Processing", "GST Dispute Resolution", "E-invoicing Solutions", "GST Advisory Services"]
  },
  audit: {
    title: "Audit & Compliance",
    description: "Comprehensive audit and compliance solutions",
    details: "From internal audits to statutory audits and bank audits, we ensure your organization maintains the highest standards of financial reporting.",
    features: ["Statutory Audit", "Internal Audit", "Concurrent Audit", "Bank Audit", "Stock Audit", "Compliance Audit", "Financial Statement Analysis", "Audit Reports & Certifications"]
  },
  nri: {
    title: "NRI Taxation",
    description: "Specialized services for Non-Resident Indians",
    details: "We provide expert guidance on tax planning and compliance for NRIs with investments in India, ensuring optimal tax efficiency and legal compliance.",
    features: ["NRI Income Tax Planning", "ITR Filing for NRIs", "FEMA Compliance", "Real Estate Taxation", "Investment Advisory", "Fund Transfer & Documentation", "Visa & Financial Documentation", "NRE/NRO Account Management"]
  }
}

// Generate static params for static pre-rendering
export async function generateStaticParams() {
  return Object.keys(servicesData).map((key) => ({
    serviceId: key,
  }))
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  const service = servicesData[serviceId]
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://saroracompany.com'

  if (!service) {
    return {}
  }
  return {
    title: service.title,
    description: `${service.description}. ${service.details}`,
    alternates: {
      canonical: `${SITE_URL}/services/${serviceId}`,
    },
    openGraph: {
      title: `${service.title} | Shalini Arora & Company`,
      description: `${service.description}. Expert CA services in Noida.`,
      url: `${SITE_URL}/services/${serviceId}`,
      siteName: 'Shalini Arora & Company',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${service.title} | Shalini Arora & Company`,
      description: `${service.description}. Expert CA services in Noida.`,
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  const service = servicesData[serviceId]

  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="pt-24 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 to-white flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/services"
            className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6 font-semibold transition-colors group text-sm"
          >
            <svg className="h-5 w-5 mr-1.5 transform translate-x-0 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Services
          </Link>
          
          {/* Service Title and Detail */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">{service.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl leading-relaxed">{service.details}</p>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Features list */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="space-y-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="h-6 w-6 text-blue-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Why Choose Us checklist card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-900 self-start">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Why Choose Us?</h3>
              <ul className="space-y-4 text-gray-700 font-medium">
                {[
                  "Expert team with 10+ years of experience",
                  "Customized solutions for your specific needs",
                  "Proactive compliance management",
                  "Cost-effective service delivery",
                  "Available for consultation on weekends"
                ].map((reason, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-900 font-extrabold mr-3 text-lg">✓</span>
                    <span className="text-sm md:text-base">{reason}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/contact"
                className="w-full mt-8 inline-block text-center bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3.5 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Contact widgets */}
      <FloatingContact />
    </div>
  )
}
