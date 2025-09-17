import React from 'react'

const BlogList = () => {
  return (
    <div className="flex justify-center flex-wrap gap-4 my-6">
      <button className="bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-800 transition">
        Todo
      </button>
      <button className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition">
        Technology
      </button>
      <button className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition">
        Startup
      </button>
      <button className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition">
        Lifestyle
      </button>
    </div>
  )
}

export default BlogList
