import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Validar variables de entorno requeridas
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'

// Validación más robusta del projectId
if (!projectId || projectId === 'your_project_id_here' || projectId.trim() === '') {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing or invalid')
  console.error('Please set a valid Sanity project ID in your .env.local file')
  console.error('You can find your project ID at: https://sanity.io/manage')
  
  // Usar un projectId temporal para evitar el crash
  const tempProjectId = 'temp-project-id'
  console.warn(`Using temporary project ID: ${tempProjectId}`)
  
  // Configuración del cliente de Sanity con projectId temporal
  export const client = createClient({
    projectId: tempProjectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })
} else {
  // Configuración del cliente de Sanity con projectId válido
  export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Para datos frescos
    token: process.env.SANITY_API_TOKEN, // Token con permisos de Viewer
  })
}

// Builder para URLs de imágenes
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper function para obtener URL de imagen optimizada
export function getImageUrl(image, options = {}) {
  if (!image) return null
  
  try {
    const { width = 800, height = 480, quality = 80 } = options
    
    return urlFor(image)
      .width(width)
      .height(height)
      .quality(quality)
      .auto('format')
      .fit('crop')
      .url()
  } catch (error) {
    console.error('Error generating image URL:', error)
    return '/blog_pic_1.png' // fallback image
  }
}

// Helper function para transformar datos de Sanity al formato esperado
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

// GROQ Queries para operaciones comunes
export const queries = {
  // Obtener todos los blogs con información básica
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
  
  // Obtener blog por slug
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
  
  // Obtener blog por ID
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
  
  // Obtener blogs por categoría
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
  
  // Obtener blogs destacados (primeros 3)
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

// Helper functions para obtener datos
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
