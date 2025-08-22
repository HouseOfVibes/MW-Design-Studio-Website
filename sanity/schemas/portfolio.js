// Portfolio Schema for Sanity CMS
export default {
  name: 'portfolio',
  title: 'Portfolio Project',
  type: 'document',
  icon: () => '🎨',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      title: 'Project Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().max(500)
    },
    {
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 2,
      description: 'Brief description for cards and previews',
      validation: Rule => Rule.max(150)
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on homepage and featured sections',
      initialValue: false
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Design', value: 'brand-design' },
          { title: 'Logo Design', value: 'logo-design' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'Marketing Materials', value: 'marketing-materials' },
          { title: 'Social Media Design', value: 'social-media' },
          { title: 'Packaging Design', value: 'packaging' },
          { title: 'Print Design', value: 'print-design' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'client',
      title: 'Client Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Client Name',
          type: 'string'
        },
        {
          name: 'industry',
          title: 'Industry',
          type: 'string'
        },
        {
          name: 'website',
          title: 'Client Website',
          type: 'url'
        }
      ]
    },
    {
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url',
      description: 'Link to the live website or project'
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Adobe Illustrator',
          'Adobe Photoshop',
          'Adobe InDesign',
          'Figma',
          'Sketch',
          'Canva',
          'Procreate',
          'WordPress',
          'Shopify',
          'HTML/CSS',
          'JavaScript',
          'React',
          'Astro'
        ]
      }
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
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
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'gallery',
      title: 'Additional Gallery Images',
      type: 'array',
      of: [
        {
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
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Testimonial Quote',
          type: 'text',
          rows: 3
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string'
        },
        {
          name: 'position',
          title: 'Author Position',
          type: 'string'
        },
        {
          name: 'company',
          title: 'Company',
          type: 'string'
        }
      ]
    },
    {
      name: 'challenges',
      title: 'Project Challenges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What challenges did this project solve?'
    },
    {
      name: 'solutions',
      title: 'Solutions Provided',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'How did you solve the challenges?'
    },
    {
      name: 'results',
      title: 'Project Results',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What were the outcomes and results?'
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0.asset'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? subtitle.replace('-', ' ').toUpperCase() : 'Portfolio Project',
        media: media
      };
    }
  },
  
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
};