'use client'
import Header from '@/Components/Header'
import BlogList from '@/Components/BlogList'
import BlogItem from '@/Components/BlogItem'
import { blog_data } from '@/Assets/assets'

export default function Home() {
  return (
    <>
      <Header />

      {/* separador claro entre Header y filtros */}
      <section className="px-5 md:px-12 lg:px-28 mt-12">
        <BlogList />
      </section>

      {/* grid de blogs - con padding consistente */}
      <section className="px-5 md:px-12 lg:px-28 mt-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blog_data.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </>
  )
}
