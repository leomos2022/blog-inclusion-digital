import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Question from '@/lib/models/QuestionModel';

export async function GET(request) {
    try {
        console.log('Connecting to database...');
        await ConnectDB();
        console.log('Database connected');
        
        const { searchParams } = new URL(request.url);
        const blogId = searchParams.get('blogId');
        console.log('Blog ID:', blogId);
        
        if (!blogId) {
            console.error('Blog ID is required');
            return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
        }
        
        const questions = await Question.find({ blogId }).limit(5);
        console.log(`Found ${questions.length} questions for blog ${blogId}`);
        
        return NextResponse.json({ questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        console.log('Connecting to database...');
        await ConnectDB();
        console.log('Database connected');
        
        const { blogId, question, options, explanation } = await request.json();
        console.log('Received data:', { blogId, question, options, explanation });
        
        if (!blogId || !question || !options || !explanation) {
            console.error('All fields are required');
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        
        const newQuestion = new Question({
            blogId,
            question,
            options,
            explanation
        });
        
        await newQuestion.save();
        console.log('Question created successfully:', newQuestion._id);
        
        return NextResponse.json({ message: 'Question created successfully', question: newQuestion });
    } catch (error) {
        console.error('Error creating question:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
