import { NextResponse } from 'next/server';

// Preguntas estáticas para cuando la base de datos no esté disponible
const staticQuestions = [
  {
    _id: '1',
    question: '¿Cuál es tu nivel de experiencia con tecnología?',
    options: [
      'Principiante - Necesito ayuda básica',
      'Intermedio - Puedo usar aplicaciones comunes',
      'Avanzado - Manejo herramientas complejas',
      'Experto - Desarrollo o administro sistemas'
    ],
    correctAnswer: 0,
    blogId: '1'
  },
  {
    _id: '2',
    question: '¿Con qué frecuencia usas internet?',
    options: [
      'Diariamente',
      'Varias veces por semana',
      'Una vez por semana',
      'Raramente'
    ],
    correctAnswer: 0,
    blogId: '1'
  },
  {
    _id: '3',
    question: '¿Qué dispositivo prefieres para navegar?',
    options: [
      'Smartphone',
      'Tablet',
      'Computadora de escritorio',
      'Laptop'
    ],
    correctAnswer: 0,
    blogId: '1'
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get('blogId') || '1';
    
    const questions = staticQuestions.filter(q => q.blogId === blogId);
    
    return NextResponse.json({
      success: true,
      questions: questions,
      message: 'Preguntas estáticas cargadas correctamente'
    });
  } catch (error) {
    console.error('Error en API estática de preguntas:', error);
    return NextResponse.json({
      success: false,
      questions: [],
      message: 'Error al cargar preguntas estáticas'
    }, { status: 500 });
  }
}
