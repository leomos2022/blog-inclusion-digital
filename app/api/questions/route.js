import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Question from '@/lib/models/QuestionModel';

export async function GET(request) {
    try {
        await ConnectDB();
        
        const { searchParams } = new URL(request.url);
        const blogId = searchParams.get('blogId');
        
        if (!blogId) {
            return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
        }
        
        const questions = await Question.find({ blogId }).limit(5);
        
        return NextResponse.json({ questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await ConnectDB();
        
        const { blogId, question, options, explanation } = await request.json();
        
        if (!blogId || !question || !options || !explanation) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        
        const newQuestion = new Question({
            blogId,
            question,
            options,
            explanation
        });
        
        await newQuestion.save();
        
        return NextResponse.json({ message: 'Question created successfully', question: newQuestion });
    } catch (error) {
        console.error('Error creating question:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
