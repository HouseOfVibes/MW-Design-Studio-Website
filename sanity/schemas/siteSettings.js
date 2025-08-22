// Site Settings Schema for Sanity CMS
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160),
      description: 'Used for SEO meta descriptions'
    },
    {
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'url',
      title: 'Site URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        {
          name: 'asset',
          title: 'Logo Image',
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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Upload a 32x32 or 16x16 PNG/ICO file'
    },
    {
      name: 'socialImage',
      title: 'Default Social Media Image',
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
      ],
      description: 'Used when sharing on social media (1200x630px recommended)'
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Main Email',
          type: 'email'
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Business Address',
          type: 'object',
          fields: [
            {
              name: 'street',
              title: 'Street Address',
              type: 'string'
            },
            {
              name: 'city',
              title: 'City',
              type: 'string'
            },
            {
              name: 'state',
              title: 'State',
              type: 'string'
            },
            {
              name: 'zip',
              title: 'ZIP Code',
              type: 'string'
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
              initialValue: 'United States'
            }
          ]
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'day',
                  title: 'Day',
                  type: 'string',
                  options: {
                    list: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday'
                    ]
                  }
                },
                {
                  name: 'open',
                  title: 'Opening Time',
                  type: 'string'
                },
                {
                  name: 'close',
                  title: 'Closing Time',
                  type: 'string'
                },
                {
                  name: 'closed',
                  title: 'Closed',
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
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url'
        },
        {
          name: 'pinterest',
          title: 'Pinterest URL',
          type: 'url'
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        {
          name: 'googleAnalytics',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'e.g., G-XXXXXXXXXX or GA_MEASUREMENT_ID'
        },
        {
          name: 'googleTagManager',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'e.g., GTM-XXXXXXX'
        },
        {
          name: 'facebookPixel',
          title: 'Facebook Pixel ID',
          type: 'string'
        },
        {
          name: 'plausibleDomain',
          title: 'Plausible Analytics Domain',
          type: 'string'
        }
      ]
    },
    {
      name: 'maintenance',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          rows: 3,
          description: 'Message to display when site is in maintenance mode'
        },
        {
          name: 'estimatedTime',
          title: 'Estimated Completion',
          type: 'datetime',
          description: 'When maintenance is expected to be completed'
        }
      ]
    },
    {
      name: 'navigation',
      title: 'Navigation Settings',
      type: 'object',
      fields: [
        {
          name: 'headerLinks',
          title: 'Header Navigation Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Link Title',
                  type: 'string'
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string'
                },
                {
                  name: 'external',
                  title: 'External Link',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'order',
                  title: 'Display Order',
                  type: 'number'
                }
              ]
            }
          ]
        },
        {
          name: 'footerLinks',
          title: 'Footer Navigation Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'section',
                  title: 'Section Title',
                  type: 'string'
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'title',
                          title: 'Link Title',
                          type: 'string'
                        },
                        {
                          name: 'url',
                          title: 'URL',
                          type: 'string'
                        },
                        {
                          name: 'external',
                          title: 'External Link',
                          type: 'boolean',
                          initialValue: false
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      };
    }
  }
};