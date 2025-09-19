import { blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {

    const [menu,setMenu] = useState("All");
    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async () =>{
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    }

    useEffect(()=>{
      fetchBlogs();
    },[])

  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
        <button onClick={()=>setMenu('All')} className={menu==="All"?'bg-black text-white py-1 px-4 rounded-sm':""}>Todos</button>
        <button onClick={()=>setMenu('Celulares')} className={menu==="Celulares"?'bg-black text-white py-1 px-4 rounded-sm':""}>Celulares</button>
        <button onClick={()=>setMenu('Correo')} className={menu==="Correo"?'bg-black text-white py-1 px-4 rounded-sm':""}>Correo</button>
        <button onClick={()=>setMenu('Office')} className={menu==="Office"?'bg-black text-white py-1 px-4 rounded-sm':""}>Microsoft Office</button>
        <button onClick={()=>setMenu('IA')} className={menu==="IA"?'bg-black text-white py-1 px-4 rounded-sm':""}>Inteligencia Artificial</button>
        <button onClick={()=>setMenu('Seguridad')} className={menu==="Seguridad"?'bg-black text-white py-1 px-4 rounded-sm':""}>Seguridad Digital</button>
      </div>
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {blogs.filter((item)=> menu==="All"?true:item.category===menu).map((item,index)=>{
            return <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} />
        })}
      </div>
    </div>
  )
}

export default BlogList
