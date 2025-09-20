import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();


// API Endpoint to get all blogs
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    }
    else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs })
    }
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json({ 
      error: 'Error fetching blogs',
      blogs: [] 
    }, { status: 500 });
  }
}


// API Endpoint For Uploading Blogs
export async function POST(request) {
  const formData = await request.formData();
  const image = formData.get('image');

  let imgUrl = '';
  if (image && typeof image === 'object') {
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    // Subir a Cloudinary
    try {
      const uploadResponse = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) throw error;
        imgUrl = result.secure_url;
      });
      // Usar stream para compatibilidad con Next.js API routes
      const stream = require('stream');
      const readable = new stream.Readable();
      readable._read = () => {};
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadResponse);
      // Esperar a que termine la subida
      await new Promise((resolve, reject) => {
        uploadResponse.on('finish', resolve);
        uploadResponse.on('error', reject);
      });
    } catch (err) {
      console.error('Error al subir imagen a Cloudinary:', err);
      return NextResponse.json({ success: false, msg: 'Error al subir imagen' }, { status: 500 });
    }
  }

  const blogData = {
    title: `${formData.get('title')}`,
    description: `${formData.get('description')}`,
    category: `${formData.get('category')}`,
    author: `${formData.get('author')}`,
    image: imgUrl,
    authorImg: `${formData.get('authorImg')}`
  }

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" })
}

// Creating API Endpoint to delete Blog

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => { });
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}