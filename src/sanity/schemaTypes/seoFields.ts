import {defineField} from 'sanity'

export const seoFields = {
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engine results. Keep it between 50-60 characters.',
      validation: (Rule) => Rule.max(70).warning('Titles longer than 70 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary of the page for search results. Keep it between 150-160 characters.',
      validation: (Rule) => Rule.max(160).warning('Descriptions longer than 160 characters may be truncated by search engines.'),
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords to describe this content.',
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image (OG Image)',
      type: 'image',
      description: 'Image shown when shared on social media. Fallbacks to Main Image.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines (noindex)',
      type: 'boolean',
      description: 'Instruct search engines not to index this page.',
      initialValue: false,
    }),
  ],
}
