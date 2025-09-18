import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import UserResponse from '@/lib/models/UserResponseModel';
import Question from '@/lib/models/QuestionModel';

export async function POST(request) {
    try {
        await ConnectDB();
        
        const { email, blogId, responses } = await request.json();
        
        if (!email || !blogId || !responses) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        
        // Verificar si el usuario ya respondió este cuestionario
        const existingResponse = await UserResponse.findOne({ email, blogId });
        if (existingResponse) {
            return NextResponse.json({ error: 'You have already completed this quiz' }, { status: 400 });
        }
        
        // Calcular el puntaje
        let correctAnswers = 0;
        const totalQuestions = responses.length;
        
        for (const response of responses) {
            const question = await Question.findById(response.questionId);
            if (question) {
                const correctOption = question.options.find(option => option.isCorrect);
                if (correctOption && response.selectedOption === correctOption.text) {
                    correctAnswers++;
                    response.isCorrect = true;
                } else {
                    response.isCorrect = false;
                }
            }
        }
        
        const score = (correctAnswers / totalQuestions) * 100;
        const passed = score >= 60; // 60% para aprobar
        
        const userResponse = new UserResponse({
            email,
            blogId,
            responses,
            score,
            passed
        });
        
        await userResponse.save();
        
        // Enviar email de confirmación
        try {
            const blog = await mongoose.model('Blog').findById(blogId);
            await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    type: 'quiz_completed',
                    data: {
                        blogTitle: blog?.title || 'Blog de Inclusión Digital',
                        score,
                        passed,
                        correctAnswers,
                        totalQuestions
                    }
                })
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // No fallar la respuesta si el email falla
        }
        
        return NextResponse.json({ 
            message: 'Quiz completed successfully', 
            score, 
            passed, 
            correctAnswers, 
            totalQuestions 
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await ConnectDB();
        
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const blogId = searchParams.get('blogId');
        
        if (!email || !blogId) {
            return NextResponse.json({ error: 'Email and Blog ID are required' }, { status: 400 });
        }
        
        const userResponse = await UserResponse.findOne({ email, blogId });
        
        if (!userResponse) {
            return NextResponse.json({ error: 'No response found' }, { status: 404 });
        }
        
        return NextResponse.json({ userResponse });
    } catch (error) {
        console.error('Error fetching user response:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
