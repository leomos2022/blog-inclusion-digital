import { NextResponse } from 'next/server'

// Simulamos una base de datos en memoria para las respuestas
let userResponses = []

export async function POST(request) {
  try {
    const { email, blogId, responses } = await request.json()
    
    if (!email || !blogId || !responses) {
      return NextResponse.json({
        success: false,
        error: 'All fields are required'
      }, { status: 400 })
    }
    
    // Verificar si el usuario ya respondió este cuestionario
    const existingResponse = userResponses.find(r => r.email === email && r.blogId === blogId)
    if (existingResponse) {
      return NextResponse.json({
        success: false,
        error: 'You have already completed this quiz'
      }, { status: 400 })
    }
    
    // Calcular el puntaje basado en las respuestas
    let correctAnswers = 0
    const totalQuestions = Object.keys(responses).length
    
    // Simular verificación de respuestas correctas
    Object.values(responses).forEach(response => {
      // En una implementación real, verificarías contra las respuestas correctas
      // Por ahora, asumimos que algunas respuestas son correctas aleatoriamente
      if (Math.random() > 0.3) { // 70% de probabilidad de respuesta correcta
        correctAnswers++
      }
    })
    
    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = score >= 60 // 60% para aprobar
    
    const userResponse = {
      _id: Date.now().toString(),
      email,
      blogId,
      responses,
      score,
      passed,
      correctAnswers,
      totalQuestions,
      submittedAt: new Date().toISOString()
    }
    
    // Guardar en nuestra "base de datos" en memoria
    userResponses.push(userResponse)
    
    console.log('User response saved:', userResponse)
    
    // Intentar enviar email de confirmación (opcional)
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'quiz_completed',
          data: {
            blogTitle: 'Blog de Inclusión Digital',
            score,
            passed,
            correctAnswers,
            totalQuestions
          }
        })
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // No fallar la respuesta si el email falla
    }
    
    return NextResponse.json({
      success: true,
      message: 'Quiz completed successfully',
      score,
      passed,
      correctAnswers,
      totalQuestions
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error'
    }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const blogId = searchParams.get('blogId')
    
    if (!email || !blogId) {
      return NextResponse.json({
        success: false,
        error: 'Email and Blog ID are required'
      }, { status: 400 })
    }
    
    const userResponse = userResponses.find(r => r.email === email && r.blogId === blogId)
    
    if (!userResponse) {
      return NextResponse.json({
        success: false,
        error: 'No response found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      userResponse
    })
  } catch (error) {
    console.error('Error fetching user response:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error'
    }, { status: 500 })
  }
}
