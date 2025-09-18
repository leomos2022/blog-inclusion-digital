import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { email, type, data } = await request.json();
        
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Configurar el transporter de nodemailer
        const transporter = nodemailer.createTransporter({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let subject = '';
        let htmlContent = '';

        switch (type) {
            case 'subscription':
                subject = '¡Bienvenido al Blog de Inclusión Digital! 📚';
                htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
                            <h1 style="color: #1f2937; margin: 0;">Blog de Inclusión Digital</h1>
                        </div>
                        <div style="padding: 30px; background-color: white;">
                            <h2 style="color: #1f2937;">¡Gracias por suscribirte! 🎉</h2>
                            <p style="color: #4b5563; line-height: 1.6;">
                                Hola,<br><br>
                                Te damos la bienvenida a nuestra comunidad de aprendizaje digital. 
                                Estás ahora suscrito para recibir contenido educativo sobre:
                            </p>
                            <ul style="color: #4b5563; line-height: 1.6;">
                                <li>📱 Uso de Celulares</li>
                                <li>📧 Correo Electrónico</li>
                                <li>💼 Microsoft Office</li>
                                <li>🤖 Inteligencia Artificial</li>
                                <li>🔒 Seguridad Digital</li>
                            </ul>
                            <p style="color: #4b5563; line-height: 1.6;">
                                Pronto recibirás nuestro primer boletín con consejos útiles para mejorar 
                                tus habilidades digitales.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${process.env.VERCEL_URL || 'http://localhost:3000'}" 
                                   style="background-color: #1f2937; color: white; padding: 12px 24px; 
                                          text-decoration: none; border-radius: 6px; display: inline-block;">
                                    Visitar el Blog
                                </a>
                            </div>
                            <p style="color: #6b7280; font-size: 14px; text-align: center;">
                                Si no deseas recibir estos emails, puedes cancelar tu suscripción en cualquier momento.
                            </p>
                        </div>
                    </div>
                `;
                break;

            case 'quiz_completed':
                subject = `Resultado del Cuestionario: ${data.blogTitle || 'Blog de Inclusión Digital'}`;
                htmlContent = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
                            <h1 style="color: #1f2937; margin: 0;">Blog de Inclusión Digital</h1>
                        </div>
                        <div style="padding: 30px; background-color: white;">
                            <h2 style="color: #1f2937;">Resultado de tu Cuestionario 📊</h2>
                            <p style="color: #4b5563; line-height: 1.6;">
                                Hola,<br><br>
                                Has completado el cuestionario del blog: <strong>${data.blogTitle || 'Blog de Inclusión Digital'}</strong>
                            </p>
                            <div style="background-color: ${data.passed ? '#dcfce7' : '#fef3c7'}; 
                                        border: 1px solid ${data.passed ? '#16a34a' : '#f59e0b'}; 
                                        border-radius: 8px; padding: 20px; margin: 20px 0;">
                                <h3 style="color: ${data.passed ? '#16a34a' : '#f59e0b'}; margin: 0 0 10px 0;">
                                    ${data.passed ? '¡Felicitaciones! 🎉' : '¡Sigue practicando! 📚'}
                                </h3>
                                <p style="margin: 0; font-size: 18px; font-weight: bold;">
                                    Puntaje: ${data.score.toFixed(0)}% (${data.correctAnswers}/${data.totalQuestions})
                                </p>
                                <p style="margin: 10px 0 0 0;">
                                    ${data.passed ? '¡Aprobaste el cuestionario!' : 'Necesitas al menos 60% para aprobar'}
                                </p>
                            </div>
                            <p style="color: #4b5563; line-height: 1.6;">
                                ${data.passed 
                                    ? 'Excelente trabajo. Continúa aprendiendo con nuestros otros blogs.' 
                                    : 'No te preocupes, puedes volver a leer el blog y intentar el cuestionario nuevamente.'
                                }
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${process.env.VERCEL_URL || 'http://localhost:3000'}" 
                                   style="background-color: #1f2937; color: white; padding: 12px 24px; 
                                          text-decoration: none; border-radius: 6px; display: inline-block;">
                                    Ver Más Blogs
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                break;

            default:
                return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
        }

        // Enviar el email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: htmlContent
        });

        return NextResponse.json({ message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
