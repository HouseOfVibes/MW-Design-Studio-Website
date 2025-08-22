// Testimonial Schema for Sanity CMS
export default {
  name: 'testimonial',
  title: 'Client Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required().max(50)
    },
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: Rule => Rule.required().max(80)
    },
    {
      name: 'position',
      title: 'Position/Title',
      type: 'string',
      validation: Rule => Rule.max(80)
    },
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required().min(50).max(500),
      description: 'The actual testimonial quote'
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 }
        ]
      },
      initialValue: 5
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show this testimonial on homepage and key pages',
      initialValue: false
    },
    {
      name: 'publishedAt',
      title: 'Date Received',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'avatar',
      title: 'Client Photo',
      type: 'object',
      fields: [
        {
          name: 'asset',
          title: 'Photo',
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
        }
      ]
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Design', value: 'brand-design' },
          { title: 'Logo Design', value: 'logo-design' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'Marketing Strategy', value: 'marketing-strategy' },
          { title: 'Social Media Management', value: 'social-media' },
          { title: 'Full Brand Package', value: 'full-package' },
          { title: 'Consultation', value: 'consultation' }
        ]
      }
    },
    {
      name: 'projectUrl',
      title: 'Related Project URL',
      type: 'url',
      description: 'Link to the project this testimonial is about'
    },
    {
      name: 'linkedPortfolio',
      title: 'Related Portfolio Item',
      type: 'reference',
      to: [{ type: 'portfolio' }],
      description: 'Link to the portfolio project this testimonial relates to'
    },
    {
      name: 'source',
      title: 'Testimonial Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google Reviews', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Email', value: 'email' },
          { title: 'Phone Call', value: 'phone' },
          { title: 'In Person', value: 'in-person' },
          { title: 'Survey', value: 'survey' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'industryTag',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Retail', value: 'retail' },
          { title: 'Restaurant/Food', value: 'food' },
          { title: 'Professional Services', value: 'professional-services' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Fitness/Wellness', value: 'fitness' },
          { title: 'Beauty/Fashion', value: 'beauty' },
          { title: 'Education', value: 'education' },
          { title: 'Non-Profit', value: 'non-profit' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'verified',
      title: 'Verified Testimonial',
      type: 'boolean',
      description: 'Has this testimonial been verified as authentic?',
      initialValue: true
    }
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'avatar.asset',
      rating: 'rating'
    },
    prepare(selection) {
      const { title, subtitle, media, rating } = selection;
      const stars = '⭐'.repeat(rating || 5);
      return {
        title: title,
        subtitle: `${subtitle} - ${stars}`,
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
      title: 'Highest Rating',
      name: 'ratingDesc',
      by: [
        { field: 'rating', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
};