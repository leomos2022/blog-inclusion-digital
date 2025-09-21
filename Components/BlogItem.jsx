import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({title,description,category,image,id,slug}) => {
  // Use slug if available, otherwise fallback to id
  const linkHref = slug ? `/blogs/${slug}` : `/blogs/${id}`;
  
  // Ensure image has a fallback
  const imageUrl = image || '/blog_pic_1.png';

  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black transition-all hover:shadow-[-7px_7px_0px_#000000]'>
        <Link href={linkHref}>
        <Image 
          src={imageUrl} 
          alt={title || 'Blog post'} 
          width={400} 
          height={240} 
          className='border-b border-black'
          onError={(e) => {
            e.target.src = '/blog_pic_1.png';
          }}
        />
      </Link>
      <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
      <div className="p-5">
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
        <p className='mb-3 text-sm tracking-tight text-gray-700' dangerouslySetInnerHTML={{"__html":(description || '').slice(0,120)}}></p>
        <Link href={linkHref} className='inline-flex items-center py-2 font-semibold text-center'>
            Leer más <Image src={assets.arrow} className='ml-2' alt='Arrow' width={12} height={12} />
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
