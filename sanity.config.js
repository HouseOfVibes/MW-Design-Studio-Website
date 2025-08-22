// Sanity Studio Configuration
// This file configures the Sanity Studio for content management

import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'mw-design-studio',
  title: 'MW Design Studio CMS',
  
  projectId: process.env.SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.SANITY_DATASET || 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Portfolio section
            S.listItem()
              .title('Portfolio')
              .child(
                S.documentTypeList('portfolio')
                  .title('Portfolio Projects')
                  .filter('_type == "portfolio"')
              ),
            
            // Testimonials section
            S.listItem()
              .title('Testimonials')
              .child(
                S.documentTypeList('testimonial')
                  .title('Client Testimonials')
                  .filter('_type == "testimonial"')
              ),
            
            // Blog section
            S.listItem()
              .title('Blog')
              .child(
                S.documentTypeList('post')
                  .title('Blog Posts')
                  .filter('_type == "post"')
              ),
            
            // Services section
            S.listItem()
              .title('Services')
              .child(
                S.documentTypeList('service')
                  .title('Service Pages')
                  .filter('_type == "service"')
              ),
            
            // Team section
            S.listItem()
              .title('Team')
              .child(
                S.documentTypeList('teamMember')
                  .title('Team Members')
                  .filter('_type == "teamMember"')
              ),
            
            // Site settings
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ])
    }),
    visionTool(), // Adds the Vision tool for testing GROQ queries
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Custom branding
  theme: {
    --default-button-color: '#000000',
    '--default-button-primary-color': '#00D9D5',
    '--component-bg': '#FFFFFF',
    '--component-text-color': '#000000',
  }
});