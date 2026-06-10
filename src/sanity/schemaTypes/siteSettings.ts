import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Shalini Arora & Company',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title (Main)',
      type: 'string',
      description: 'The main headline shown in the homepage hero section.',
      initialValue: 'Expert Financial Insights &',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero Title (Highlighted)',
      type: 'string',
      description: 'The highlighted text shown in blue next to the main headline.',
      initialValue: 'Tax Updates',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'The paragraph description text shown in the homepage hero section.',
      initialValue: 'Stay compliant and make informed business choices with regulatory analyses, GST updates, and tax guidelines curated by the experts at Shalini Arora & Company.',
    }),
    defineField({
      name: 'title',
      title: 'Default Meta Title (Home Page)',
      type: 'string',
      description: 'Title for the home page and fallback site-wide.',
      initialValue: 'Blog | Shalini Arora & Company - CA in Noida',
    }),
    defineField({
      name: 'description',
      title: 'Default Meta Description (Home Page)',
      type: 'text',
      rows: 3,
      description: 'Meta description for the home page and fallback site-wide.',
      initialValue: 'Expert financial insights, tax updates, and compliance guides from Shalini Arora & Company, Chartered Accountants in Noida.',
    }),
    defineField({
      name: 'defaultShareImage',
      title: 'Default Share Image (OG Image)',
      type: 'image',
      description: 'Fallback image for social shares when no page-specific image is set.',
    }),
    defineField({
      name: 'noIndexAll',
      title: 'Hide entire site from search engines (noindex)',
      type: 'boolean',
      description: 'Instruct search engines not to index the entire site.',
      initialValue: false,
    }),
  ],
})
