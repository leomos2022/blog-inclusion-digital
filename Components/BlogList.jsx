import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async (category = null) => {
        try {
            setLoading(true);
            
            // Use local API instead of Sanity
            const url = category && category !== "All" 
                ? `/api/blog?category=${category}` 
                : '/api/blog';
            
            const response = await axios.get(url);
            const fetchedBlogs = response.data.success ? response.data.blogs : [];
            
            setBlogs(fetchedBlogs);
            console.log('Blogs fetched from API:', fetchedBlogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs(menu === "All" ? null : menu);
    }, [menu])

    const handleMenuChange = (category) => {
        setMenu(category);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-lg">Cargando blogs...</div>
            </div>
        );
    }

    return (
        <div>
            <div className='flex justify-center gap-6 my-10 flex-wrap'>
                <button 
                    onClick={() => handleMenuChange('All')} 
                    className={menu === "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : "hover:bg-gray-100 py-1 px-4 rounded-sm transition-colors"}
                >
                    Todos
                </button>
                <button 
                    onClick={() => handleMenuChange('Celulares')} 
                    className={menu === "Celulares" ? 'bg-black text-white py-1 px-4 rounded-sm' : "hover:bg-gray-100 py-1 px-4 rounded-sm transition-colors"}
                >
                    Celulares
                </button>
                <button 
                    onClick={() => handleMenuChange('Correo')} 
                    className={menu === "Correo" ? 'bg-black text-white py-1 px-4 rounded-sm' : "hover:bg-gray-100 py-1 px-4 rounded-sm transition-colors"}
                >
                    Correo
                </button>
                <button 
                    onClick={() => handleMenuChange('Office')} 
                    className={menu === "Office" ? 'bg-black text-white py-1 px-4 rounded-sm' : "hover:bg-gray-100 py-1 px-4 rounded-sm transition-colors"}
                >
                    Microsoft Office
                </button>
                <button 
                    onClick={() => handleMenuChange('IA')} 
                    className={menu === "IA" ? 'bg-black text-white py-1 px-4 rounded-sm' : "hover:bg-gray-100 py-1 px-4 rounded-sm transition-colors"}
                >
                    Inteligencia Artificial
                </button>
                <button 
                    onClick={() => handleMenuChange('Seguridad')} 
                    className={menu === "Seguridad" ? 'bg-black text-white py-1 px-4 rounded-sm' : "hover:bg-gray-100 py-1 px-4 rounded-sm transition-colors"}
                >
                    Seguridad Digital
                </button>
            </div>
            
            {blogs.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-600">No hay blogs disponibles en esta categoría.</p>
                </div>
            ) : (
                <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                    {blogs.map((item, index) => {
                        return <BlogItem 
                            key={item._id || index} 
                            id={item._id} 
                            slug={item.slug}
                            image={item.image} 
                            title={item.title} 
                            description={item.description} 
                            category={item.category} 
                        />
                    })}
                </div>
            )}
        </div>
    )
}

export default BlogList
