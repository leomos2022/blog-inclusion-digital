import { NextResponse } from 'next/server';

// Datos estáticos para cuando la base de datos no esté disponible
const staticBlogs = [
  {
    _id: '1',
    title: 'Inclusión Digital: El Futuro de la Tecnología',
    content: 'La inclusión digital es fundamental para el desarrollo de una sociedad más justa y equitativa. En este artículo exploramos cómo la tecnología puede ser una herramienta de transformación social.',
    author: 'Dr. María González',
    authorImg: '/profile_icon.png',
    image: '/blog_pic_1.png',
    category: 'Tecnología',
    date: '2024-01-15',
    readTime: '5 min'
  },
  {
    _id: '2',
    title: 'Accesibilidad Web: Diseño para Todos',
    content: 'El diseño web accesible no es solo una buena práctica, es una necesidad. Aprende cómo crear experiencias digitales que incluyan a todos los usuarios.',
    author: 'Ing. Carlos Ruiz',
    authorImg: '/profile_icon.png',
    image: '/blog_pic_2.png',
    category: 'Accesibilidad',
    date: '2024-01-20',
    readTime: '7 min'
  },
  {
    _id: '3',
    title: 'Inteligencia Artificial Inclusiva',
    content: 'Cómo desarrollar sistemas de IA que sean justos, transparentes y beneficien a toda la sociedad, no solo a unos pocos.',
    author: 'Dra. Ana Martínez',
    authorImg: '/profile_icon.png',
    image: '/blog_pic_3.png',
    category: 'IA',
    date: '2024-01-25',
    readTime: '6 min'
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      blogs: staticBlogs,
      message: 'Datos estáticos cargados correctamente'
    });
  } catch (error) {
    console.error('Error en API estática:', error);
    return NextResponse.json({
      success: false,
      blogs: [],
      message: 'Error al cargar datos estáticos'
    }, { status: 500 });
  }
}
