import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper function to get image URL
export function getImageUrl(image) {
  if (!image) return null
  return urlFor(image).url()
}

// Helper function to transform Sanity blog data to match current structure
export function transformSanityBlog(sanityBlog) {
  return {
    _id: sanityBlog._id,
    title: sanityBlog.title,
    description: sanityBlog.description,
    category: sanityBlog.category,
    author: sanityBlog.author || 'Equipo de Inclusión Digital',
    image: sanityBlog.image ? getImageUrl(sanityBlog.image) : '/blog_pic_1.png',
    authorImg: sanityBlog.authorImg ? getImageUrl(sanityBlog.authorImg) : '/profile_icon.png',
    date: sanityBlog.publishedAt || sanityBlog._createdAt,
    slug: sanityBlog.slug?.current
  }
}
