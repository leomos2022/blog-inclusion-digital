// MongoDB imports (commented for now)
// import { ConnectDB } from "@/lib/config/db"
// import BlogModel from "@/lib/models/BlogModel";

// Sanity imports
import { client, transformSanityBlog } from "@/lib/config/sanity";
const { NextResponse } = require("next/server")
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API Endpoint to get all blogs from Sanity
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    const slug = request.nextUrl.searchParams.get("slug");
    
    if (blogId || slug) {
      // Get single blog by ID or slug from Sanity
      let query, params;
      
      if (slug) {
        query = `*[_type == "blog" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          category,
          author,
          image,
          authorImg,
          publishedAt,
          _createdAt
        }`;
        params = { slug };
      } else {
        query = `*[_type == "blog" && _id == $id][0]{
          _id,
          title,
          slug,
          description,
          category,
          author,
          image,
          authorImg,
          publishedAt,
          _createdAt
        }`;
        params = { id: blogId };
      }
      
      const sanityBlog = await client.fetch(query, params);
      
      if (!sanityBlog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      
      const transformedBlog = transformSanityBlog(sanityBlog);
      return NextResponse.json(transformedBlog);
    } else {
      // Get all blogs from Sanity
      const sanityBlogs = await client.fetch(
        `*[_type == "blog"] | order(publishedAt desc, _createdAt desc){
          _id,
          title,
          slug,
          description,
          category,
          author,
          image,
          authorImg,
          publishedAt,
          _createdAt
        }`
      );
      
      const transformedBlogs = sanityBlogs.map(transformSanityBlog);
      return NextResponse.json({ blogs: transformedBlogs });
    }
  } catch (error) {
    console.error('Error in Sanity blog API:', error);
    return NextResponse.json({ 
      error: 'Error fetching blogs from Sanity',
      blogs: [] 
    }, { status: 500 });
  }
}

// MongoDB version (commented for now)
// export async function GET(request) {
//   try {
//     await ConnectDB();
//     const blogId = request.nextUrl.searchParams.get("id");
//     if (blogId) {
//       const blog = await BlogModel.findById(blogId);
//       return NextResponse.json(blog);
//     }
//     else {
//       const blogs = await BlogModel.find({});
//       return NextResponse.json({ blogs })
//     }
//   } catch (error) {
//     console.error('Error in blog API:', error);
//     return NextResponse.json({ 
//       error: 'Error fetching blogs',
//       blogs: [] 
//     }, { status: 500 });
//   }
// }


// API Endpoint For Uploading Blogs (MongoDB version - commented for now)
// export async function POST(request) {
//   await ConnectDB();
//   const formData = await request.formData();
//   const image = formData.get('image');

//   let imgUrl = '';
//   if (image && typeof image === 'object') {
//     const imageByteData = await image.arrayBuffer();
//     const buffer = Buffer.from(imageByteData);
//     // Subir a Cloudinary
//     try {
//       const uploadResponse = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
//         if (error) throw error;
//         imgUrl = result.secure_url;
//       });
//       // Usar stream para compatibilidad con Next.js API routes
//       const stream = require('stream');
//       const readable = new stream.Readable();
//       readable._read = () => {};
//       readable.push(buffer);
//       readable.push(null);
//       readable.pipe(uploadResponse);
//       // Esperar a que termine la subida
//       await new Promise((resolve, reject) => {
//         uploadResponse.on('finish', resolve);
//         uploadResponse.on('error', reject);
//       });
//     } catch (err) {
//       console.error('Error al subir imagen a Cloudinary:', err);
//       return NextResponse.json({ success: false, msg: 'Error al subir imagen' }, { status: 500 });
//     }
//   }

//   const blogData = {
//     title: `${formData.get('title')}`,
//     description: `${formData.get('description')}`,
//     category: `${formData.get('category')}`,
//     author: `${formData.get('author')}`,
//     image: imgUrl,
//     authorImg: `${formData.get('authorImg')}`
//   }

//   await BlogModel.create(blogData);
//   console.log("Blog Saved");

//   return NextResponse.json({ success: true, msg: "Blog Added" })
// }

// Sanity version for creating blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    let imageAsset = null;
    if (image && typeof image === 'object') {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      
      // Upload image to Sanity
      imageAsset = await client.assets.upload('image', buffer, {
        filename: image.name || 'blog-image.jpg'
      });
    }

    const blogData = {
      _type: 'blog',
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      image: imageAsset ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      } : undefined,
      publishedAt: new Date().toISOString(),
      slug: {
        _type: 'slug',
        current: formData.get('title').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }
    };

    const result = await client.create(blogData);
    console.log("Blog Saved to Sanity");

    return NextResponse.json({ success: true, msg: "Blog Added", id: result._id });
  } catch (error) {
    console.error('Error creating blog in Sanity:', error);
    return NextResponse.json({ success: false, msg: 'Error al crear blog' }, { status: 500 });
  }
}

// Creating API Endpoint to delete Blog (MongoDB version - commented for now)
// export async function DELETE(request) {
//   await ConnectDB();
//   const id = await request.nextUrl.searchParams.get('id');
//   const blog = await BlogModel.findById(id);
//   // fs.unlink solo funciona en local, no en Vercel/Render
//   await BlogModel.findByIdAndDelete(id);
//   return NextResponse.json({ msg: "Blog Deleted" });
// }

// Sanity version for deleting blogs
export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get('id');
    await client.delete(id);
    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error('Error deleting blog from Sanity:', error);
    return NextResponse.json({ error: 'Error deleting blog' }, { status: 500 });
  }
}
