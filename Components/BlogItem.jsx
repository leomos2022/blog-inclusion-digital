import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const BlogItem = ({title, description, category, image, id, slug}) => {
  const [imageError, setImageError] = useState(false);
  
  // Use slug if available, otherwise fallback to id
  const linkHref = slug ? `/blogs/${slug}` : `/blogs/${id}`;
  
  // Ensure image has a fallback - prioritize local images
  const getImageUrl = () => {
    if (imageError) return '/blog_pic_1.png';
    if (image && image.startsWith('/')) return image; // Local image
    if (image && image.startsWith('http')) return image; // External image
    return '/blog_pic_1.png'; // Default fallback
  };
  
  const imageUrl = getImageUrl();

  // Clean description for preview (remove HTML tags)
  const cleanDescription = description ? description.replace(/<[^>]*>/g, '').slice(0, 120) : '';

  const handleImageError = () => {
    console.log('Image failed to load:', imageUrl);
    setImageError(true);
  };

  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black transition-all hover:shadow-[-7px_7px_0px_#000000]'>
      <Link href={linkHref}>
        <div className="relative w-full h-[240px] border-b border-black overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title || 'Blog post'} 
            fill
            className='object-cover transition-transform hover:scale-105'
            onError={handleImageError}
            sizes="(max-width: 768px) 330px, 300px"
            priority={false}
            unoptimized={true}
          />
        </div>
      </Link>
      
      <div className="p-5">
        <p className='mb-3 px-2 py-1 inline-block bg-black text-white text-xs font-medium rounded'>
          {category || 'General'}
        </p>
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900 line-clamp-2'>
          {title || 'Sin título'}
        </h5>
        <p className='mb-3 text-sm tracking-tight text-gray-700 line-clamp-3'>
          {cleanDescription || 'Sin descripción disponible'}
        </p>
        <Link 
          href={linkHref} 
          className='inline-flex items-center py-2 font-semibold text-center text-black hover:text-gray-700 transition-colors'
        >
          Leer más 
          <Image 
            src={assets.arrow} 
            className='ml-2' 
            alt='Arrow' 
            width={12} 
            height={12} 
          />
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
