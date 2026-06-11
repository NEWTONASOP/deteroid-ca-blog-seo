import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {seoFields} from './seoFields'

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

    // ── Global Defaults ────────────────────────────────────────────────────
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

    // ── Blog Home Settings ─────────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: '[ Blog ] Hero Title (Main)',
      type: 'string',
      description: 'The main headline shown in the /blog hero section.',
      initialValue: 'Expert Financial Insights &',
      group: 'blog',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: '[ Blog ] Hero Title (Highlighted)',
      type: 'string',
      description: 'The highlighted text shown in blue next to the main headline.',
      initialValue: 'Tax Updates',
      group: 'blog',
    }),
    defineField({
      name: 'heroSubtitle',
      title: '[ Blog ] Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'The paragraph description text shown in the /blog hero section.',
      initialValue:
        'Stay compliant and make informed business choices with regulatory analyses, GST updates, and tax guidelines curated by the experts at Shalini Arora & Company.',
      group: 'blog',
    }),
    defineField({
      name: 'title',
      title: '[ Blog ] Meta Title',
      type: 'string',
      description: 'Title for the /blog page.',
      initialValue: 'Blog & Insights | Shalini Arora & Company - CA in Noida',
      group: 'blog',
    }),
    defineField({
      name: 'description',
      title: '[ Blog ] Meta Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for the /blog page.',
      initialValue:
        'Expert financial insights, tax updates, and compliance guides from Shalini Arora & Company, Chartered Accountants in Noida.',
      group: 'blog',
    }),

    // ── Main Site Page SEO ─────────────────────────────────────────────────
    defineField({
      name: 'homeSeo',
      title: '[ Home Page / ] SEO',
      type: 'object',
      description: 'SEO settings for the main homepage (/).',
      group: 'mainSite',
      fields: [
        ...seoFields.fields,
      ],
    }),
    defineField({
      name: 'aboutSeo',
      title: '[ About Page /about ] SEO',
      type: 'object',
      description: 'SEO settings for the About page (/about).',
      group: 'mainSite',
      fields: [
        ...seoFields.fields,
      ],
    }),
    defineField({
      name: 'servicesSeo',
      title: '[ Services Page /services ] SEO',
      type: 'object',
      description: 'SEO settings for the Services listing page (/services).',
      group: 'mainSite',
      fields: [
        ...seoFields.fields,
      ],
    }),
    defineField({
      name: 'contactSeo',
      title: '[ Contact Page /contact ] SEO',
      type: 'object',
      description: 'SEO settings for the Contact page (/contact).',
      group: 'mainSite',
      fields: [
        ...seoFields.fields,
      ],
    }),
  ],
  groups: [
    {
      name: 'blog',
      title: 'Blog Settings',
    },
    {
      name: 'mainSite',
      title: 'Main Site Page SEO',
    },
  ],
})
