// Service Schema for Sanity CMS
export default {
  name: 'service',
  title: 'Service Page',
  type: 'document',
  icon: () => '🛠️',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required().max(80)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().max(300),
      description: 'Brief overview of the service'
    },
    {
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show this service prominently on homepage',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Services', value: 'brand-services' },
          { title: 'Marketing Services', value: 'marketing-services' },
          { title: 'Social Media Services', value: 'social-media-services' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'Consultation', value: 'consultation' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Service Icon',
      type: 'object',
      fields: [
        {
          name: 'asset',
          title: 'Icon Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'object',
      fields: [
        {
          name: 'asset',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'icon',
              title: 'Feature Icon',
              type: 'string',
              description: 'Emoji or icon character'
            }
          ]
        }
      ]
    },
    {
      name: 'process',
      title: 'Service Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step Number',
              type: 'number'
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., "1-2 weeks", "3 days"'
            }
          ]
        }
      ]
    },
    {
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'number'
        },
        {
          name: 'priceRange',
          title: 'Price Range',
          type: 'string',
          description: 'e.g., "$500 - $2000"'
        },
        {
          name: 'packages',
          title: 'Service Packages',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Package Name',
                  type: 'string'
                },
                {
                  name: 'price',
                  title: 'Price',
                  type: 'number'
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2
                },
                {
                  name: 'features',
                  title: 'Included Features',
                  type: 'array',
                  of: [{ type: 'string' }]
                },
                {
                  name: 'popular',
                  title: 'Most Popular',
                  type: 'boolean',
                  initialValue: false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'timeline',
      title: 'Typical Timeline',
      type: 'string',
      description: 'e.g., "2-4 weeks", "1-2 months"'
    },
    {
      name: 'deliverables',
      title: 'What You Get',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of deliverables clients receive'
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string'
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3
            }
          ]
        }
      ]
    },
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }]
        }
      ]
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60)
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: Rule => Rule.max(160)
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage.asset'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? subtitle.replace('-', ' ').toUpperCase() : 'Service',
        media: media
      };
    }
  }
};