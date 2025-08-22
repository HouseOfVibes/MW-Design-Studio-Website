// Team Member Schema for Sanity CMS
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: () => '👤',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'position',
      title: 'Position/Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().max(300)
    },
    {
      name: 'longBio',
      title: 'Extended Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ]
    },
    {
      name: 'profileImage',
      title: 'Profile Photo',
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
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url'
        },
        {
          name: 'behance',
          title: 'Behance URL',
          type: 'url'
        },
        {
          name: 'dribbble',
          title: 'Dribbble URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Brand Design',
          'Logo Design',
          'Web Design',
          'Graphic Design',
          'Marketing Strategy',
          'Social Media Marketing',
          'Content Creation',
          'Photography',
          'Copywriting',
          'Project Management',
          'Client Relations',
          'UI/UX Design'
        ]
      }
    },
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      validation: Rule => Rule.min(0).max(50)
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'institution',
              title: 'Institution',
              type: 'string'
            },
            {
              name: 'degree',
              title: 'Degree',
              type: 'string'
            },
            {
              name: 'field',
              title: 'Field of Study',
              type: 'string'
            },
            {
              name: 'year',
              title: 'Graduation Year',
              type: 'number'
            }
          ]
        }
      ]
    },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Certification Name',
              type: 'string'
            },
            {
              name: 'organization',
              title: 'Issuing Organization',
              type: 'string'
            },
            {
              name: 'year',
              title: 'Year Obtained',
              type: 'number'
            },
            {
              name: 'url',
              title: 'Certificate URL',
              type: 'url'
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Team Member',
      type: 'boolean',
      description: 'Show prominently on about page',
      initialValue: false
    },
    {
      name: 'active',
      title: 'Currently Active',
      type: 'boolean',
      description: 'Is this person currently part of the team?',
      initialValue: true
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display team members (lower numbers first)'
    }
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'profileImage.asset'
    }
  },
  
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Start Date',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }]
    }
  ]
};