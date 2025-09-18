'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddBlogPage = () => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        title:"",
        description:"",
        category:"Celulares",
        author:"Equipo de Inclusión Digital",
        authorImg:"/profile_icon.png"
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
        console.log(data);
    }

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('author',data.author);
        formData.append('authorImg',data.authorImg);
        formData.append('image',image);
        const response = await axios.post('/api/blog',formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setImage(false);
            setData({
              title:"",
              description:"",
              category:"Celulares",
              author:"Equipo de Inclusión Digital",
              authorImg:"/profile_icon.png"
            });
        }
        else{
            toast.error("Error");
        }
    }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Subir imagen</p>
        <label htmlFor="image">
            <Image className='mt-4' src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt=''/>
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        <p className='text-xl mt-4'>Título del blog</p>
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Escribe aquí' required />
        <p className='text-xl mt-4'>Descripción del blog</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Escribe el contenido aquí' rows={6} required />
        <p className='text-xl mt-4'>Categoría del blog</p>
        <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
            <option value="Celulares">Celulares</option>
            <option value="Correo">Correo</option>
            <option value="Office">Microsoft Office</option>
            <option value="IA">Inteligencia Artificial</option>
            <option value="Seguridad">Seguridad Digital</option>
        </select>
        <br />
        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>AGREGAR</button>
      </form>
    </>
  )
}

export default AddBlogPage
