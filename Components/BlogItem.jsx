// Components/BlogItem.jsx
import { assets } from "@/Assets/assets"
import Image from "next/image"
import React from "react"

const BlogItem = ({ blog }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition p-4">
      {/* Imagen */}
      <Image 
        src={blog.image} 
        alt={blog.title} 
        width={400} 
        height={250} 
        className="w-full h-56 object-cover rounded-md mb-4 border border-gray-200"
      />

      {/* Categoría */}
      <p className="inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
        {blog.category}
      </p>

      {/* Contenido */}
      <div className="space-y-3">
        <h5 className="text-lg font-semibold text-gray-900 leading-snug">
          {blog.title}
        </h5>
        <p className="text-sm text-gray-600 leading-relaxed">
          {blog.description}
        </p>
      </div>

      {/* Leer más */}
      <div className="inline-flex items-center mt-4 text-sm font-semibold text-black hover:underline cursor-pointer">
        Leer más
        <Image 
          src={assets.arrow} 
          alt="arrow" 
          width={14} 
          height={14} 
          className="ml-2"
        />
      </div>
    </div>
  )
}

export default BlogItem
