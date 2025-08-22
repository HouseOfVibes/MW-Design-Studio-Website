// Sanity CMS Configuration and Client Setup
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'your_project_id', // Replace with your project ID
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: import.meta.env.SANITY_API_VERSION || '2023-12-01',
  useCdn: true, // Use CDN for faster read operations
  token: import.meta.env.SANITY_TOKEN || '', // Only needed for write operations
});

// Image URL builder for optimized images
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Helper function to fetch portfolio items
export async function getPortfolioItems() {
  try {
    return await client.fetch(`
      *[_type == "portfolio"] | order(featured desc, publishedAt desc) {
        _id,
        title,
        slug,
        description,
        excerpt,
        featured,
        publishedAt,
        category,
        client,
        projectUrl,
        technologies,
        testimonial,
        images[] {
          asset,
          alt,
          caption
        },
        gallery[] {
          asset,
          alt,
          caption
        },
        "imageUrl": images[0].asset->url,
        "imageAlt": images[0].alt
      }
    `);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return [];
  }
}

// Helper function to fetch testimonials
export async function getTestimonials() {
  try {
    return await client.fetch(`
      *[_type == "testimonial"] | order(featured desc, publishedAt desc) {
        _id,
        name,
        company,
        position,
        content,
        rating,
        featured,
        publishedAt,
        avatar {
          asset,
          alt
        },
        projectType,
        "avatarUrl": avatar.asset->url
      }
    `);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// Helper function to fetch blog posts
export async function getBlogPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        featured,
        category,
        readingTime,
        author {
          name,
          bio,
          image {
            asset,
            alt
          }
        },
        mainImage {
          asset,
          alt,
          caption
        },
        "imageUrl": mainImage.asset->url,
        "imageAlt": mainImage.alt
      }
    `);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Helper function to get a single blog post by slug
export async function getBlogPost(slug) {
  try {
    return await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        body,
        excerpt,
        featured,
        category,
        readingTime,
        author {
          name,
          bio,
          image {
            asset,
            alt
          }
        },
        mainImage {
          asset,
          alt,
          caption
        },
        "imageUrl": mainImage.asset->url,
        "imageAlt": mainImage.alt
      }
    `, { slug });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Helper function to get featured content for homepage
export async function getFeaturedContent() {
  try {
    const [portfolioItems, testimonials] = await Promise.all([
      client.fetch(`
        *[_type == "portfolio" && featured == true] | order(publishedAt desc) [0...3] {
          _id,
          title,
          slug,
          description,
          excerpt,
          category,
          images[] {
            asset,
            alt
          },
          "imageUrl": images[0].asset->url,
          "imageAlt": images[0].alt
        }
      `),
      client.fetch(`
        *[_type == "testimonial" && featured == true] | order(publishedAt desc) [0...6] {
          _id,
          name,
          company,
          position,
          content,
          rating,
          avatar {
            asset,
            alt
          },
          "avatarUrl": avatar.asset->url
        }
      `)
    ]);

    return {
      portfolioItems,
      testimonials
    };
  } catch (error) {
    console.error('Error fetching featured content:', error);
    return {
      portfolioItems: [],
      testimonials: []
    };
  }
}

// Helper function for search functionality
export async function searchContent(query) {
  try {
    const searchQuery = `
      *[
        _type in ["portfolio", "post", "testimonial"] && 
        (
          title match $query + "*" || 
          description match $query + "*" ||
          content match $query + "*" ||
          excerpt match $query + "*"
        )
      ] | order(_score desc) [0...20] {
        _type,
        _id,
        title,
        slug,
        description,
        excerpt,
        publishedAt,
        "imageUrl": coalesce(mainImage.asset->url, images[0].asset->url),
        "imageAlt": coalesce(mainImage.alt, images[0].alt)
      }
    `;
    
    return await client.fetch(searchQuery, { query });
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}