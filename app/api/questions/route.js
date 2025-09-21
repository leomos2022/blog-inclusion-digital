import { NextResponse } from 'next/server'

// Preguntas de ejemplo organizadas por blog ID
const sampleQuestions = [
  {
    _id: '1',
    blogId: '1',
    question: "¿Cuál es la función principal de un smartphone?",
    options: [
      { text: "Solo hacer llamadas", isCorrect: false },
      { text: "Comunicación, internet, aplicaciones y más", isCorrect: true },
      { text: "Solo enviar mensajes", isCorrect: false },
      { text: "Solo tomar fotos", isCorrect: false }
    ],
    explanation: "Los smartphones son dispositivos multifuncionales que permiten comunicación, acceso a internet, uso de aplicaciones y muchas otras funciones."
  },
  {
    _id: '2',
    blogId: '1',
    question: "¿Qué es importante hacer para mantener seguro tu smartphone?",
    options: [
      { text: "Nunca actualizar el sistema", isCorrect: false },
      { text: "Usar contraseñas fuertes y mantener actualizado", isCorrect: true },
      { text: "Compartir la contraseña con amigos", isCorrect: false },
      { text: "Instalar aplicaciones desconocidas", isCorrect: false }
    ],
    explanation: "La seguridad incluye usar contraseñas fuertes, mantener el sistema actualizado y ser cuidadoso con las aplicaciones que instalas."
  },
  {
    _id: '3',
    blogId: '1',
    question: "¿Qué significa 'WiFi'?",
    options: [
      { text: "Wireless Fidelity", isCorrect: true },
      { text: "Wide Internet Function", isCorrect: false },
      { text: "Wireless Internet File", isCorrect: false },
      { text: "Wide File Internet", isCorrect: false }
    ],
    explanation: "WiFi significa 'Wireless Fidelity' y permite conectarse a internet sin cables."
  },
  {
    _id: '4',
    blogId: '2',
    question: "¿Qué es un correo electrónico?",
    options: [
      { text: "Una carta física", isCorrect: false },
      { text: "Un mensaje digital enviado por internet", isCorrect: true },
      { text: "Una llamada telefónica", isCorrect: false },
      { text: "Un mensaje de texto", isCorrect: false }
    ],
    explanation: "El correo electrónico es un mensaje digital que se envía a través de internet a otra persona."
  },
  {
    _id: '5',
    blogId: '2',
    question: "¿Cuál es la estructura básica de un email?",
    options: [
      { text: "Solo el mensaje", isCorrect: false },
      { text: "Destinatario, asunto y mensaje", isCorrect: true },
      { text: "Solo el destinatario", isCorrect: false },
      { text: "Solo el asunto", isCorrect: false }
    ],
    explanation: "Un email debe tener destinatario, asunto descriptivo y el mensaje principal."
  },
  {
    _id: '6',
    blogId: '2',
    question: "¿Qué significa 'CC' en un email?",
    options: [
      { text: "Copia de Carbón", isCorrect: true },
      { text: "Copia Completa", isCorrect: false },
      { text: "Copia de Correo", isCorrect: false },
      { text: "Copia de Cliente", isCorrect: false }
    ],
    explanation: "CC significa 'Copia de Carbón' y permite enviar una copia del email a otras personas."
  },
  {
    _id: '7',
    blogId: '3',
    question: "¿Cuál es la aplicación principal para crear documentos de texto en Office?",
    options: [
      { text: "Excel", isCorrect: false },
      { text: "PowerPoint", isCorrect: false },
      { text: "Word", isCorrect: true },
      { text: "Outlook", isCorrect: false }
    ],
    explanation: "Microsoft Word es el procesador de texto principal de la suite Office."
  },
  {
    _id: '8',
    blogId: '4',
    question: "¿Cuál de estos es un ejemplo de IA en la vida cotidiana?",
    options: [
      { text: "Una calculadora básica", isCorrect: false },
      { text: "Google Assistant", isCorrect: true },
      { text: "Un reloj analógico", isCorrect: false },
      { text: "Una lámpara", isCorrect: false }
    ],
    explanation: "Google Assistant es un asistente virtual que utiliza inteligencia artificial para entender y responder a comandos de voz."
  },
  {
    _id: '9',
    blogId: '5',
    question: "¿Qué es el phishing?",
    options: [
      { text: "Un tipo de pesca", isCorrect: false },
      { text: "Intentos de robar información personal mediante engaños", isCorrect: true },
      { text: "Un navegador web", isCorrect: false },
      { text: "Un antivirus", isCorrect: false }
    ],
    explanation: "El phishing son intentos de robar información personal mediante correos o mensajes falsos que parecen legítimos."
  }
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get('blogId')
    
    if (!blogId) {
      return NextResponse.json({ 
        success: false,
        error: 'Blog ID is required' 
      }, { status: 400 })
    }
    
    // Filtrar preguntas por blogId
    const questions = sampleQuestions.filter(q => q.blogId === blogId)
    
    return NextResponse.json({
      success: true,
      questions: questions
    })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error'
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { blogId, question, options, explanation } = await request.json()
    
    if (!blogId || !question || !options || !explanation) {
      return NextResponse.json({
        success: false,
        error: 'All fields are required'
      }, { status: 400 })
    }
    
    const newQuestion = {
      _id: Date.now().toString(),
      blogId,
      question,
      options,
      explanation,
      createdAt: new Date().toISOString()
    }
    
    // En una implementación real, aquí guardarías en Sanity
    console.log('Question created:', newQuestion)
    
    return NextResponse.json({
      success: true,
      message: 'Question created successfully',
      question: newQuestion
    })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error'
    }, { status: 500 })
  }
}
