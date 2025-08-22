// Blog Post Schema for Sanity CMS
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: () => '📝',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
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
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200),
      description: 'Brief description for social media and search results'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
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
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
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
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        }
      ]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          initialValue: 'MW Design Studio'
        },
        {
          name: 'bio',
          title: 'Bio',
          type: 'text',
          rows: 2
        },
        {
          name: 'image',
          title: 'Image',
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
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Design', value: 'brand-design' },
          { title: 'Marketing Tips', value: 'marketing-tips' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Business Growth', value: 'business-growth' },
          { title: 'Industry Insights', value: 'industry-insights' },
          { title: 'Client Success', value: 'client-success' },
          { title: 'Design Trends', value: 'design-trends' },
          { title: 'Resources', value: 'resources' }
        ]
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post prominently on blog homepage',
      initialValue: false
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: Rule => Rule.min(1).max(60),
      description: 'Estimated reading time in minutes'
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60),
      description: 'Custom title for search engines (leave blank to use post title)'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: Rule => Rule.max(160),
      description: 'Custom description for search engines (leave blank to use excerpt)'
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage.asset',
      category: 'category'
    },
    prepare(selection) {
      const { title, author, media, category } = selection;
      return {
        title: title,
        subtitle: `${category || 'Uncategorized'} by ${author || 'MW Design Studio'}`,
        media: media
      };
    }
  },
  
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
};