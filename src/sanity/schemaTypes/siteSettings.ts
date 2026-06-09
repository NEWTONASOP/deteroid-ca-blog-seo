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
