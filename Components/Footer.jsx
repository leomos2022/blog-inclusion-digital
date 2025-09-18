import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-0 bg-black py-5 px-5'>
      
      {/* Logo */}
      <div className="relative w-32 h-16">
        <Image src={assets.logo_light} alt="Logo" fill style={{ objectFit: 'contain' }} />
      </div>

      {/* Texto de copyright */}
      <p className='text-sm text-white text-center sm:text-left'>
        Todos los derechos reservados. Copyright @blog-inclusion-digital
      </p>

      {/* Íconos sociales */}
      <div className='flex gap-4'>
        <Image src={assets.facebook_icon} alt='Facebook' width={40} height={40} />
        <Image src={assets.twitter_icon} alt='Twitter' width={40} height={40} />
        <Image src={assets.googleplus_icon} alt='Google Plus' width={40} height={40} />
      </div>

    </div>
  )
}

export default Footer
