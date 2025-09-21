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

// Helper function to get image URL with optimization
export function getImageUrl(image, options = {}) {
  if (!image) return null
  
  const { width = 800, height = 480, quality = 80 } = options
  
  return urlFor(image)
    .width(width)
    .height(height)
    .quality(quality)
    .auto('format')
    .url()
}

// Helper function to transform Sanity blog data to match current structure
export function transformSanityBlog(sanityBlog) {
  return {
    _id: sanityBlog._id,
    title: sanityBlog.title,
    description: sanityBlog.description,
    category: sanityBlog.category,
    author: sanityBlog.author || 'Equipo de Inclusión Digital',
    image: sanityBlog.image ? getImageUrl(sanityBlog.image, { width: 800, height: 480 }) : '/blog_pic_1.png',
    authorImg: sanityBlog.authorImg ? getImageUrl(sanityBlog.authorImg, { width: 60, height: 60 }) : '/profile_icon.png',
    date: sanityBlog.publishedAt || sanityBlog._createdAt,
    slug: sanityBlog.slug?.current
  }
}

// GROQ Queries for common operations
export const queries = {
  // Get all blogs with basic info
  allBlogs: `*[_type == "blog"] | order(publishedAt desc, _createdAt desc){
    _id,
    title,
    slug,
    description,
    category,
    author,
    image,
    authorImg,
    publishedAt,
    _createdAt
  }`,
  
  // Get blog by slug
  blogBySlug: `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    category,
    author,
    image,
    authorImg,
    publishedAt,
    _createdAt
  }`,
  
  // Get blog by ID
  blogById: `*[_type == "blog" && _id == $id][0]{
    _id,
    title,
    slug,
    description,
    category,
    author,
    image,
    authorImg,
    publishedAt,
    _createdAt
  }`,
  
  // Get blogs by category
  blogsByCategory: `*[_type == "blog" && category == $category] | order(publishedAt desc, _createdAt desc){
    _id,
    title,
    slug,
    description,
    category,
    author,
    image,
    authorImg,
    publishedAt,
    _createdAt
  }`,
  
  // Get featured blogs (first 3)
  featuredBlogs: `*[_type == "blog"] | order(publishedAt desc, _createdAt desc)[0...3]{
    _id,
    title,
    slug,
    description,
    category,
    author,
    image,
    authorImg,
    publishedAt,
    _createdAt
  }`
}

// Helper functions for fetching data
export async function getAllBlogs() {
  try {
    const blogs = await client.fetch(queries.allBlogs)
    return blogs.map(transformSanityBlog)
  } catch (error) {
    console.error('Error fetching all blogs:', error)
    return []
  }
}

export async function getBlogBySlug(slug) {
  try {
    const blog = await client.fetch(queries.blogBySlug, { slug })
    return blog ? transformSanityBlog(blog) : null
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    return null
  }
}

export async function getBlogById(id) {
  try {
    const blog = await client.fetch(queries.blogById, { id })
    return blog ? transformSanityBlog(blog) : null
  } catch (error) {
    console.error('Error fetching blog by ID:', error)
    return null
  }
}

export async function getBlogsByCategory(category) {
  try {
    const blogs = await client.fetch(queries.blogsByCategory, { category })
    return blogs.map(transformSanityBlog)
  } catch (error) {
    console.error('Error fetching blogs by category:', error)
    return []
  }
}
