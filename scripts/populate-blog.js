import mongoose from 'mongoose';
import 'dotenv/config';

// Import the model from the correct path
import { ConnectDB } from '../lib/config/db.js';
import BlogModel from '../lib/models/BlogModel.js';

// Sample blog posts about digital inclusion
const sampleBlogs = [
    {
        title: "Guía Básica: Cómo Usar tu Celular de Forma Segura",
        description: `
            <h2>Introducción al Uso Seguro del Celular</h2>
            <p>En la era digital actual, el celular se ha convertido en una herramienta esencial para la comunicación y el acceso a información. Sin embargo, es importante aprender a usarlo de manera segura y responsable.</p>
            
            <h3>Configuración Básica de Seguridad</h3>
            <ul>
                <li><strong>Bloqueo de pantalla:</strong> Configura un PIN, patrón o huella dactilar para proteger tu dispositivo.</li>
                <li><strong>Actualizaciones:</strong> Mantén siempre actualizado el sistema operativo y las aplicaciones.</li>
                <li><strong>Contraseñas:</strong> Usa contraseñas seguras y únicas para cada aplicación.</li>
            </ul>
            
            <h3>Uso Responsable del Celular</h3>
            <p>El celular puede ser una herramienta poderosa para:</p>
            <ul>
                <li>Comunicarte con familiares y amigos</li>
                <li>Acceder a servicios bancarios</li>
                <li>Buscar información importante</li>
                <li>Acceder a servicios de salud</li>
            </ul>
            
            <h3>Consejos de Seguridad Digital</h3>
            <p>Para proteger tu información personal:</p>
            <ul>
                <li>No compartas información personal con desconocidos</li>
                <li>Verifica la fuente de los mensajes antes de responder</li>
                <li>No hagas clic en enlaces sospechosos</li>
                <li>Usa aplicaciones oficiales de tiendas reconocidas</li>
            </ul>
            
            <h3>Responsabilidad Social Digital</h3>
            <p>Como usuario de tecnología, tienes la responsabilidad de:</p>
            <ul>
                <li>Respetar la privacidad de otros</li>
                <li>No difundir información falsa</li>
                <li>Usar la tecnología para el bien común</li>
                <li>Ayudar a otros a aprender sobre tecnología</li>
            </ul>
        `,
        category: "Celulares",
        author: "Equipo de Inclusión Digital",
        image: "/blog_pic_1.png",
        authorImg: "/profile_icon.png"
    },
    {
        title: "Cómo Crear y Gestionar tu Correo Electrónico",
        description: `
            <h2>¿Qué es el Correo Electrónico?</h2>
            <p>El correo electrónico (email) es una forma digital de enviar y recibir mensajes a través de internet. Es una herramienta fundamental para la comunicación moderna y el acceso a servicios digitales.</p>
            
            <h3>Pasos para Crear un Correo Electrónico</h3>
            <ol>
                <li><strong>Elige un proveedor:</strong> Gmail, Outlook, Yahoo son opciones populares y gratuitas.</li>
                <li><strong>Crea una cuenta:</strong> Ve al sitio web del proveedor y busca "Crear cuenta" o "Registrarse".</li>
                <li><strong>Elige un nombre de usuario:</strong> Debe ser único y fácil de recordar.</li>
                <li><strong>Establece una contraseña segura:</strong> Combina letras, números y símbolos.</li>
                <li><strong>Verifica tu cuenta:</strong> Confirma tu número de teléfono o correo alternativo.</li>
            </ol>
            
            <h3>Estructura de un Correo Electrónico</h3>
            <ul>
                <li><strong>Para:</strong> Dirección del destinatario</li>
                <li><strong>Asunto:</strong> Breve descripción del contenido</li>
                <li><strong>Cuerpo:</strong> El mensaje principal</li>
                <li><strong>Adjuntos:</strong> Archivos que puedes enviar</li>
            </ul>
            
            <h3>Buenas Prácticas para el Correo</h3>
            <ul>
                <li>Usa un asunto claro y descriptivo</li>
                <li>Escribe de manera profesional y respetuosa</li>
                <li>Revisa la ortografía antes de enviar</li>
                <li>No abras correos de remitentes desconocidos</li>
                <li>No compartas información personal por correo</li>
            </ul>
            
            <h3>Seguridad en el Correo Electrónico</h3>
            <p>Para mantener tu correo seguro:</p>
            <ul>
                <li>No hagas clic en enlaces sospechosos</li>
                <li>No descargues archivos adjuntos de remitentes desconocidos</li>
                <li>Usa contraseñas seguras y cámbialas regularmente</li>
                <li>Habilita la autenticación de dos factores</li>
            </ul>
        `,
        category: "Correo",
        author: "Equipo de Inclusión Digital",
        image: "/blog_pic_2.png",
        authorImg: "/profile_icon.png"
    },
    {
        title: "Microsoft Office: Herramientas Esenciales para el Trabajo Digital",
        description: `
            <h2>Introducción a Microsoft Office</h2>
            <p>Microsoft Office es un conjunto de aplicaciones que te ayudan a crear documentos, presentaciones, hojas de cálculo y más. Estas herramientas son esenciales en el mundo laboral y educativo moderno.</p>
            
            <h3>Principales Aplicaciones de Office</h3>
            
            <h4>Microsoft Word - Procesador de Texto</h4>
            <ul>
                <li><strong>Crear documentos:</strong> Cartas, informes, currículums</li>
                <li><strong>Formatear texto:</strong> Cambiar tamaño, color, estilo de fuente</li>
                <li><strong>Insertar elementos:</strong> Imágenes, tablas, gráficos</li>
                <li><strong>Revisar ortografía:</strong> Corrección automática de errores</li>
            </ul>
            
            <h4>Microsoft Excel - Hojas de Cálculo</h4>
            <ul>
                <li><strong>Organizar datos:</strong> Crear listas y tablas</li>
                <li><strong>Realizar cálculos:</strong> Sumas, promedios, fórmulas</li>
                <li><strong>Crear gráficos:</strong> Visualizar datos de manera clara</li>
                <li><strong>Presupuestos:</strong> Controlar gastos e ingresos</li>
            </ul>
            
            <h4>Microsoft PowerPoint - Presentaciones</h4>
            <ul>
                <li><strong>Crear diapositivas:</strong> Presentaciones profesionales</li>
                <li><strong>Agregar contenido:</strong> Texto, imágenes, videos</li>
                <li><strong>Diseño atractivo:</strong> Plantillas y temas</li>
                <li><strong>Presentar:</strong> Mostrar información de manera clara</li>
            </ul>
            
            <h3>Consejos para Usar Office Eficientemente</h3>
            <ul>
                <li>Guarda tu trabajo frecuentemente</li>
                <li>Usa atajos de teclado para ser más rápido</li>
                <li>Aprende las funciones básicas primero</li>
                <li>Practica regularmente para mejorar</li>
            </ul>
            
            <h3>Responsabilidad en el Uso de Office</h3>
            <p>Al usar estas herramientas:</p>
            <ul>
                <li>Respeta los derechos de autor al usar contenido</li>
                <li>Mantén la información confidencial segura</li>
                <li>Usa las herramientas para propósitos legítimos</li>
                <li>Comparte conocimiento con otros</li>
            </ul>
        `,
        category: "Office",
        author: "Equipo de Inclusión Digital",
        image: "/blog_pic_3.png",
        authorImg: "/profile_icon.png"
    },
    {
        title: "Inteligencia Artificial: Una Herramienta para Todos",
        description: `
            <h2>¿Qué es la Inteligencia Artificial?</h2>
            <p>La Inteligencia Artificial (IA) es una tecnología que permite a las máquinas realizar tareas que normalmente requieren inteligencia humana, como aprender, razonar y resolver problemas.</p>
            
            <h3>IA en la Vida Cotidiana</h3>
            <p>La IA ya está presente en muchas actividades diarias:</p>
            <ul>
                <li><strong>Asistentes virtuales:</strong> Siri, Google Assistant, Alexa</li>
                <li><strong>Recomendaciones:</strong> Netflix, YouTube, Spotify</li>
                <li><strong>Navegación:</strong> Google Maps, Waze</li>
                <li><strong>Traducción:</strong> Google Translate</li>
                <li><strong>Fotos:</strong> Reconocimiento facial en cámaras</li>
            </ul>
            
            <h3>Cómo Usar IA de Forma Práctica</h3>
            
            <h4>Asistentes de Escritura</h4>
            <ul>
                <li><strong>ChatGPT:</strong> Ayuda a escribir textos, responder preguntas</li>
                <li><strong>Grammarly:</strong> Corrige gramática y estilo</li>
                <li><strong>Google Docs:</strong> Sugerencias de escritura</li>
            </ul>
            
            <h4>Herramientas de Productividad</h4>
            <ul>
                <li><strong>Calendarios inteligentes:</strong> Programan citas automáticamente</li>
                <li><strong>Correo inteligente:</strong> Respuestas sugeridas</li>
                <li><strong>Búsqueda mejorada:</strong> Encuentra información más rápido</li>
            </ul>
            
            <h3>Beneficios de la IA para la Inclusión Digital</h3>
            <ul>
                <li><strong>Accesibilidad:</strong> Ayuda a personas con discapacidades</li>
                <li><strong>Traducción:</strong> Rompe barreras de idioma</li>
                <li><strong>Educación:</strong> Personaliza el aprendizaje</li>
                <li><strong>Salud:</strong> Diagnósticos más precisos</li>
            </ul>
            
            <h3>Uso Responsable de la IA</h3>
            <p>Es importante usar la IA de manera ética:</p>
            <ul>
                <li>No uses IA para crear contenido falso o engañoso</li>
                <li>Respeta la privacidad de otros</li>
                <li>No dependas completamente de la IA para decisiones importantes</li>
                <li>Comparte conocimiento sobre IA con otros</li>
            </ul>
            
            <h3>Futuro de la IA</h3>
            <p>La IA continuará evolucionando y será cada vez más importante en:</p>
            <ul>
                <li>Educación personalizada</li>
                <li>Medicina preventiva</li>
                <li>Transporte autónomo</li>
                <li>Sostenibilidad ambiental</li>
            </ul>
        `,
        category: "IA",
        author: "Equipo de Inclusión Digital",
        image: "/blog_pic_4.png",
        authorImg: "/profile_icon.png"
    },
    {
        title: "Seguridad Digital: Protege tu Información en Internet",
        description: `
            <h2>¿Por qué es Importante la Seguridad Digital?</h2>
            <p>En el mundo digital actual, proteger tu información personal es crucial. Los ciberdelincuentes buscan constantemente formas de robar datos, dinero o identidad de usuarios desprevenidos.</p>
            
            <h3>Amenazas Comunes en Internet</h3>
            
            <h4>Phishing</h4>
            <p>Intentos de robar información personal mediante correos o mensajes falsos:</p>
            <ul>
                <li>Correos que parecen de bancos o empresas legítimas</li>
                <li>Mensajes pidiendo datos personales</li>
                <li>Enlaces sospechosos en mensajes</li>
            </ul>
            
            <h4>Malware</h4>
            <p>Software malicioso que puede dañar tu dispositivo:</p>
            <ul>
                <li>Virus que infectan archivos</li>
                <li>Spyware que espía tu actividad</li>
                <li>Ransomware que bloquea tu dispositivo</li>
            </ul>
            
            <h3>Consejos de Seguridad Básicos</h3>
            
            <h4>Contraseñas Seguras</h4>
            <ul>
                <li>Usa al menos 8 caracteres</li>
                <li>Combina letras, números y símbolos</li>
                <li>No uses información personal</li>
                <li>Usa contraseñas diferentes para cada cuenta</li>
            </ul>
            
            <h4>Autenticación de Dos Factores</h4>
            <p>Agrega una capa extra de seguridad:</p>
            <ul>
                <li>Recibe códigos por SMS</li>
                <li>Usa aplicaciones de autenticación</li>
                <li>Verifica tu identidad con huella dactilar</li>
            </ul>
            
            <h3>Navegación Segura</h3>
            <ul>
                <li><strong>HTTPS:</strong> Busca el candado en la barra de direcciones</li>
                <li><strong>Sitios oficiales:</strong> Verifica la URL antes de ingresar datos</li>
                <li><strong>Descargas:</strong> Solo descarga de fuentes confiables</li>
                <li><strong>Actualizaciones:</strong> Mantén tu navegador actualizado</li>
            </ul>
            
            <h3>Redes Sociales Seguras</h3>
            <ul>
                <li>Configura la privacidad de tu perfil</li>
                <li>No compartas información personal excesiva</li>
                <li>No aceptes solicitudes de desconocidos</li>
                <li>Reporta contenido inapropiado</li>
            </ul>
            
            <h3>Responsabilidad Social en la Seguridad Digital</h3>
            <p>Como usuario responsable:</p>
            <ul>
                <li>Educa a otros sobre seguridad digital</li>
                <li>Reporta actividades sospechosas</li>
                <li>No participes en actividades ilegales en línea</li>
                <li>Respeta la privacidad de otros</li>
            </ul>
            
            <h3>Recursos de Ayuda</h3>
            <ul>
                <li>Centros de ayuda de plataformas digitales</li>
                <li>Organizaciones de ciberseguridad</li>
                <li>Cursos gratuitos de seguridad digital</li>
                <li>Comunidades de usuarios responsables</li>
            </ul>
        `,
        category: "Seguridad",
        author: "Equipo de Inclusión Digital",
        image: "/blog_pic_5.png",
        authorImg: "/profile_icon.png"
    }
];

// Function to populate database
async function populateDatabase() {
    try {
        // Connect to MongoDB
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-inclusion-digital';
    console.log('Usando URI:', uri);
    await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        
        // Clear existing blogs
        await BlogModel.deleteMany({});
        console.log('Cleared existing blogs');
        
        // Insert sample blogs
        await BlogModel.insertMany(sampleBlogs);
        console.log('Sample blogs inserted successfully');
        
        console.log('Database populated successfully!');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the population script
populateDatabase();
