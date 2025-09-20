import mongoose from 'mongoose';
import { ConnectDB } from '../lib/config/db.js';
import BlogModel from '../lib/models/BlogModel.js';
import Question from '../lib/models/QuestionModel.js';

// Preguntas de ejemplo para diferentes blogs
const sampleQuestions = {
  'celulares': [
    {
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
      question: "¿Cuál es la ventaja de usar aplicaciones oficiales?",
      options: [
        { text: "Son más caras", isCorrect: false },
        { text: "Son más seguras y confiables", isCorrect: true },
        { text: "Ocupan más espacio", isCorrect: false },
        { text: "Son más lentas", isCorrect: false }
      ],
      explanation: "Las aplicaciones oficiales son más seguras, confiables y están mejor optimizadas para tu dispositivo."
    },
    {
      question: "¿Qué hacer si tu smartphone se moja?",
      options: [
        { text: "Encenderlo inmediatamente", isCorrect: false },
        { text: "Apagarlo y secarlo completamente", isCorrect: true },
        { text: "Usarlo normalmente", isCorrect: false },
        { text: "Ponerlo en el microondas", isCorrect: false }
      ],
      explanation: "Si tu smartphone se moja, debes apagarlo inmediatamente y secarlo completamente antes de volver a usarlo."
    }
  ],
  'correo': [
    {
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
      question: "¿Cuál es una buena práctica de seguridad en emails?",
      options: [
        { text: "Abrir todos los archivos adjuntos", isCorrect: false },
        { text: "Verificar el remitente antes de abrir archivos", isCorrect: true },
        { text: "Compartir tu contraseña", isCorrect: false },
        { text: "Responder a emails desconocidos", isCorrect: false }
      ],
      explanation: "Es importante verificar el remitente y ser cauteloso con archivos adjuntos para mantener la seguridad."
    },
    {
      question: "¿Qué es el spam?",
      options: [
        { text: "Emails importantes", isCorrect: false },
        { text: "Emails no deseados o publicitarios", isCorrect: true },
        { text: "Emails de trabajo", isCorrect: false },
        { text: "Emails de familia", isCorrect: false }
      ],
      explanation: "El spam son emails no deseados, generalmente publicitarios o maliciosos."
    }
  ]
};

async function populateQuestions() {
    try {
        await ConnectDB();
        console.log('Connected to MongoDB');
        
        // Obtener todos los blogs
        const blogs = await BlogModel.find({});
        console.log(`Found ${blogs.length} blogs`);
        
        // Limpiar preguntas existentes
        await Question.deleteMany({});
        console.log('Cleared existing questions');
        
        let questionsCreated = 0;
        
        for (const blog of blogs) {
            // Determinar la categoría del blog
            let category = 'celulares'; // default
            if (blog.category) {
                if (blog.category.toLowerCase().includes('correo') || blog.category.toLowerCase().includes('email')) {
                    category = 'correo';
                } else if (blog.category.toLowerCase().includes('celular') || blog.category.toLowerCase().includes('smartphone')) {
                    category = 'celulares';
                }
            }
            
            // Obtener preguntas para esta categoría
            const categoryQuestions = sampleQuestions[category] || sampleQuestions['celulares'];
            
            // Crear preguntas para este blog
            for (const questionData of categoryQuestions) {
                const question = new Question({
                    blogId: blog._id,
                    question: questionData.question,
                    options: questionData.options,
                    explanation: questionData.explanation
                });
                
                await question.save();
                questionsCreated++;
            }
        }
        
        console.log(`Created ${questionsCreated} questions successfully`);
        console.log('Questions populated successfully!');
        
    } catch (error) {
        console.error('Error populating questions:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

populateQuestions();
