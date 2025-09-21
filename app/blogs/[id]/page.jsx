'use client'

import { use } from 'react';
import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import QuizComponent from '@/Components/QuizComponent';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';

const Page = ({ params }) => {
  // Usamos React.use() para obtener id
  const { id } = use(params);

  const [data, setData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);

  const fetchBlogData = useCallback(async () => {
    try {
      let response;
      
      // First try to fetch by slug (if id looks like a slug)
      if (id && !id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          response = await axios.get('/api/blog', {
            params: { slug: id }
          });
        } catch (error) {
          console.log('Slug not found, trying by ID...');
          // If slug fails, try by ID
          response = await axios.get('/api/blog', {
            params: { id }
          });
        }
      } else {
        // If it looks like an ID, try ID first
        try {
          response = await axios.get('/api/blog', {
            params: { id }
          });
        } catch (error) {
          console.log('ID not found, trying by slug...');
          // If ID fails, try by slug
          response = await axios.get('/api/blog', {
            params: { slug: id }
          });
        }
      }
      
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener el blog:', error);
      setData(null);
    }
  }, [id]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (userEmail) {
      setShowQuiz(true);
    }
  };

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
  };

  if (!data) return null;

  return (
    <>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image src={assets.logo} width={180} height={60} alt='Logo' className='w-[130px] sm:w-auto' />
          </Link>
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
            Comenzar <Image src={assets.arrow} alt='Arrow' width={16} height={16} />
          </button>
        </div>

        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
          <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='Author' />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
      </div>

      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image className='border-4 border-white' src={data.image} width={800} height={480} alt={data.title} />
        <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }} />

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
              <QuizComponent blogId={id} userEmail={userEmail} />
            )}
          </div>
        </div>

        {/* Compartir en redes sociales */}
        <div className='my-24'>
          <p className='text-black font-semibold my-4'>Comparte este artículo en redes sociales</p>
          <div className='flex gap-4'>
            <button onClick={() => shareOnSocial('facebook')} className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
              <Image src={assets.facebook_icon} width={20} height={20} alt='Facebook' /> Facebook
            </button>
            <button onClick={() => shareOnSocial('twitter')} className='flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors'>
              <Image src={assets.twitter_icon} width={20} height={20} alt='Twitter' /> Twitter
            </button>
            <button onClick={() => shareOnSocial('linkedin')} className='flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors'>
              <Image src={assets.googleplus_icon} width={20} height={20} alt='LinkedIn' /> LinkedIn
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
