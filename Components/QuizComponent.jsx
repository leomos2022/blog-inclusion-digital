'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const QuizComponent = ({ blogId, userEmail }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, [blogId, fetchQuestions]);

    const fetchQuestions = useCallback(async () => {
        try {
            const response = await fetch(`/api/questions?blogId=${blogId}`);
            const data = await response.json();
            setQuestions(data.questions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions, trying static API:', error);
            try {
                const response = await fetch(`/api/questions-static?blogId=${blogId}`);
                const data = await response.json();
                setQuestions(data.questions);
                setLoading(false);
            } catch (staticError) {
                console.error('Error fetching static questions:', staticError);
                toast.error('Error al cargar las preguntas');
                setLoading(false);
            }
        }
    }, [blogId]);

    const handleAnswerSelect = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length !== questions.length) {
            toast.error('Por favor responde todas las preguntas');
            return;
        }

        setSubmitting(true);
        try {
            const responses = questions.map(q => ({
                questionId: q._id,
                selectedOption: answers[q._id]
            }));

            const response = await fetch('/api/user-responses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    blogId,
                    responses
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                setResults(data);
                setShowResults(true);
                toast.success('¡Cuestionario completado!');
            } else {
                toast.error(data.error || 'Error al enviar respuestas');
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
            toast.error('Error al enviar respuestas');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="text-gray-600">No hay preguntas disponibles para este blog.</p>
            </div>
        );
    }

    if (showResults && results) {
        return (
            <div className="bg-white border border-black shadow-[-7px_7px_0px_#000000] p-6 rounded-lg">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">
                        {results.passed ? '¡Felicitaciones! 🎉' : '¡Sigue practicando! 📚'}
                    </h3>
                    <p className="text-lg">
                        Puntaje: {results.score.toFixed(0)}% ({results.correctAnswers}/{results.totalQuestions})
                    </p>
                    <p className={`font-medium ${results.passed ? 'text-green-600' : 'text-orange-600'}`}>
                        {results.passed ? '¡Aprobaste!' : 'Necesitas al menos 60% para aprobar'}
                    </p>
                </div>
                
                <div className="space-y-4">
                    {questions.map((question, index) => (
                        <div key={question._id} className="border border-gray-300 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">{index + 1}. {question.question}</h4>
                            <p className="text-sm text-gray-600 mb-2">{question.explanation}</p>
                            <p className="text-sm">
                                <span className="font-medium">Tu respuesta:</span> {answers[question._id]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="bg-white border border-black shadow-[-7px_7px_0px_#000000] p-6 rounded-lg">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                        Pregunta {currentQuestion + 1} de {questions.length}
                    </span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-black h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>

            <div className="space-y-3 mb-6">
                {currentQ.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name={`question-${currentQ._id}`}
                            value={option.text}
                            checked={answers[currentQ._id] === option.text}
                            onChange={() => handleAnswerSelect(currentQ._id, option.text)}
                            className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <span className="text-sm">{option.text}</span>
                    </label>
                ))}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 border border-black bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Anterior
                </button>

                {currentQuestion === questions.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || !answers[currentQ._id]}
                        className="px-6 py-2 bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                    >
                        {submitting ? 'Enviando...' : 'Finalizar'}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={!answers[currentQ._id]}
                        className="px-4 py-2 bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                    >
                        Siguiente
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizComponent;
