import { NextResponse } from 'next/server'

// Datos de ejemplo para blogs
const sampleBlogs = [
  {
    _id: '1',
    title: "Guía Básica: Cómo Usar tu Celular de Forma Segura",
    description: `
      <h2>Introducción al Uso Seguro del Celular</h2>
      <p>En la era digital actual, el celular se ha convertido en una herramienta esencial para la comunicación y el acceso a información. Sin embargo, es importante aprender a usarlo de manera segura y responsable.</p>
      
      <h3>Configuración Básica de Seguridad</h3>
      <ul>
        <li><strong>Bloqueo de pantalla:</strong> Configura un PIN, patrón o huella dactilar para proteger tu dispositivo.</li>
        <li><strong>Actualizaciones:</strong> Mantén siempre actualizado el sistema operativo y las aplicaciones.</li>
        <li><strong>Contraseñas:</strong> Usa contraseñas seguras y únicas para cada aplicación.</li>
      </ul>
      
      <h3>Uso Responsable del Celular</h3>
      <p>El celular puede ser una herramienta poderosa para:</p>
      <ul>
        <li>Comunicarte con familiares y amigos</li>
        <li>Acceder a servicios bancarios</li>
        <li>Buscar información importante</li>
        <li>Acceder a servicios de salud</li>
      </ul>
    `,
    category: "Celulares",
    author: "Equipo de Inclusión Digital",
    image: "/blog_pic_1.png",
    authorImg: "/profile_icon.png",
    date: new Date().toISOString(),
    slug: "guia-basica-como-usar-tu-celular-de-forma-segura"
  },
  {
    _id: '2',
    title: "Cómo Crear y Gestionar tu Correo Electrónico",
    description: `
      <h2>¿Qué es el Correo Electrónico?</h2>
      <p>El correo electrónico (email) es una forma digital de enviar y recibir mensajes a través de internet. Es una herramienta fundamental para la comunicación moderna y el acceso a servicios digitales.</p>
      
      <h3>Pasos para Crear un Correo Electrónico</h3>
      <ol>
        <li><strong>Elige un proveedor:</strong> Gmail, Outlook, Yahoo son opciones populares y gratuitas.</li>
        <li><strong>Crea una cuenta:</strong> Ve al sitio web del proveedor y busca "Crear cuenta" o "Registrarse".</li>
        <li><strong>Elige un nombre de usuario:</strong> Debe ser único y fácil de recordar.</li>
        <li><strong>Establece una contraseña segura:</strong> Combina letras, números y símbolos.</li>
      </ol>
    `,
    category: "Correo",
    author: "Equipo de Inclusión Digital",
    image: "/blog_pic_2.png",
    authorImg: "/profile_icon.png",
    date: new Date().toISOString(),
    slug: "como-crear-y-gestionar-tu-correo-electronico"
  },
  {
    _id: '3',
    title: "Microsoft Office: Herramientas Esenciales para el Trabajo Digital",
    description: `
      <h2>Introducción a Microsoft Office</h2>
      <p>Microsoft Office es un conjunto de aplicaciones que te ayudan a crear documentos, presentaciones, hojas de cálculo y más. Estas herramientas son esenciales en el mundo laboral y educativo moderno.</p>
      
      <h3>Principales Aplicaciones de Office</h3>
      <h4>Microsoft Word - Procesador de Texto</h4>
      <ul>
        <li><strong>Crear documentos:</strong> Cartas, informes, currículums</li>
        <li><strong>Formatear texto:</strong> Cambiar tamaño, color, estilo de fuente</li>
        <li><strong>Insertar elementos:</strong> Imágenes, tablas, gráficos</li>
      </ul>
    `,
    category: "Office",
    author: "Equipo de Inclusión Digital",
    image: "/blog_pic_3.png",
    authorImg: "/profile_icon.png",
    date: new Date().toISOString(),
    slug: "microsoft-office-herramientas-esenciales-para-el-trabajo-digital"
  },
  {
    _id: '4',
    title: "Inteligencia Artificial: Una Herramienta para Todos",
    description: `
      <h2>¿Qué es la Inteligencia Artificial?</h2>
      <p>La Inteligencia Artificial (IA) es una tecnología que permite a las máquinas realizar tareas que normalmente requieren inteligencia humana, como aprender, razonar y resolver problemas.</p>
      
      <h3>IA en la Vida Cotidiana</h3>
      <p>La IA ya está presente en muchas actividades diarias:</p>
      <ul>
        <li><strong>Asistentes virtuales:</strong> Siri, Google Assistant, Alexa</li>
        <li><strong>Recomendaciones:</strong> Netflix, YouTube, Spotify</li>
        <li><strong>Navegación:</strong> Google Maps, Waze</li>
      </ul>
    `,
    category: "IA",
    author: "Equipo de Inclusión Digital",
    image: "/blog_pic_4.png",
    authorImg: "/profile_icon.png",
    date: new Date().toISOString(),
    slug: "inteligencia-artificial-una-herramienta-para-todos"
  },
  {
    _id: '5',
    title: "Seguridad Digital: Protege tu Información en Internet",
    description: `
      <h2>¿Por qué es Importante la Seguridad Digital?</h2>
      <p>En el mundo digital actual, proteger tu información personal es crucial. Los ciberdelincuentes buscan constantemente formas de robar datos, dinero o identidad de usuarios desprevenidos.</p>
      
      <h3>Amenazas Comunes en Internet</h3>
      <h4>Phishing</h4>
      <p>Intentos de robar información personal mediante correos o mensajes falsos:</p>
      <ul>
        <li>Correos que parecen de bancos o empresas legítimas</li>
        <li>Mensajes pidiendo datos personales</li>
        <li>Enlaces sospechosos en mensajes</li>
      </ul>
    `,
    category: "Seguridad",
    author: "Equipo de Inclusión Digital",
    image: "/blog_pic_5.png",
    authorImg: "/profile_icon.png",
    date: new Date().toISOString(),
    slug: "seguridad-digital-protege-tu-informacion-en-internet"
  }
]

// API Endpoint to get all blogs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get("id")
    const slug = searchParams.get("slug")
    const category = searchParams.get("category")
    
    if (blogId) {
      // Get single blog by ID
      const blog = sampleBlogs.find(b => b._id === blogId)
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      return NextResponse.json(blog)
    } else if (slug) {
      // Get single blog by slug
      const blog = sampleBlogs.find(b => b.slug === slug)
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      return NextResponse.json(blog)
    } else {
      // Get all blogs or filter by category
      let blogs = sampleBlogs
      
      if (category && category !== 'All') {
        blogs = sampleBlogs.filter(blog => blog.category === category)
      }
      
      return NextResponse.json({ 
        success: true,
        blogs: blogs 
      })
    }
  } catch (error) {
    console.error('Error in blog API:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error fetching blogs',
      blogs: [] 
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    const newBlog = {
      _id: Date.now().toString(),
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      authorImg: formData.get('authorImg') || '/profile_icon.png',
      image: '/blog_pic_1.png', // Default image for now
      date: new Date().toISOString(),
      slug: formData.get('title')?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    
    // En una implementación real, aquí guardarías en Sanity
    console.log('New blog created:', newBlog)
    
    return NextResponse.json({
      success: true,
      msg: "Blog Added",
      blog: newBlog
    })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({
      success: false,
      msg: 'Error creating blog'
    }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({
        success: false,
        msg: 'Blog ID is required'
      }, { status: 400 })
    }
    
    // En una implementación real, aquí eliminarías de Sanity
    console.log('Blog deleted:', id)
    
    return NextResponse.json({
      success: true,
      msg: "Blog Deleted"
    })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({
      success: false,
      msg: 'Error deleting blog'
    }, { status: 500 })
  }
}
