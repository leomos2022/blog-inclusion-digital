'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import QuizComponent from '@/Components/QuizComponent';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {

  const [data, setData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);

  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog', {
      params: {
        id: params.id
      }
    })
    setData(response.data);
  }

  useEffect(() => {
    fetchBlogData();
  }, [])

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (userEmail) {
      setShowQuiz(true);
    }
  }

  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const title = data?.title || 'Blog de Inclusión Digital';
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  return (data ? <>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href='/'>
          <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
          Comenzar <Image src={assets.arrow} alt='' />
        </button>
      </div>
      <div className='text-center my-24'>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
        <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='' />
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
      </div>
    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
      <Image className='border-4 border-white' src={data.image} width={800} height={480} alt='' />
      
      <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}>
        
      </div>
      
      {/* Cuestionario */}
      <div className='my-24'>
        <div className='bg-white border border-black shadow-[-7px_7px_0px_#000000] p-6 rounded-lg'>
          <h3 className='text-xl font-bold mb-4'>📚 Pon a prueba tu conocimiento</h3>
          <p className='text-gray-600 mb-6'>
            Responde estas 5 preguntas para verificar que comprendiste el contenido del blog.
          </p>
          
          {!showQuiz ? (
            <form onSubmit={handleEmailSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Ingresa tu email para comenzar el cuestionario:
                </label>
                <input
                  type='email'
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder='tu-email@ejemplo.com'
                  className='w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  required
                />
              </div>
              <button
                type='submit'
                className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
              >
                Comenzar Cuestionario
              </button>
            </form>
          ) : (
            <QuizComponent blogId={params.id} userEmail={userEmail} />
          )}
        </div>
      </div>
      
      <div className='my-24'>
        <p className='text-black font font-semibold my-4'>Comparte este artículo en redes sociales</p>
        <div className='flex gap-4'>
          <button 
            onClick={() => shareOnSocial('facebook')}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            <Image src={assets.facebook_icon} width={20} height={20} alt='Facebook' />
            Facebook
          </button>
          <button 
            onClick={() => shareOnSocial('twitter')}
            className='flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors'
          >
            <Image src={assets.twitter_icon} width={20} height={20} alt='Twitter' />
            Twitter
          </button>
          <button 
            onClick={() => shareOnSocial('linkedin')}
            className='flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors'
          >
            <Image src={assets.googleplus_icon} width={20} height={20} alt='LinkedIn' />
            LinkedIn
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </> : <></>
  )
}

export default page