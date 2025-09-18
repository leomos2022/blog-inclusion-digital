# Blog de Inclusión Digital

Este es un proyecto de blog educativo enfocado en la inclusión digital y responsabilidades sociales, diseñado para enseñar conceptos básicos de tecnología digital.

## 🚀 Nuevas Funcionalidades

### ✨ Sistema de Cuestionarios
- **5 preguntas por blog** para evaluar comprensión
- **Puntaje automático** con aprobación del 60%
- **Feedback inmediato** con explicaciones
- **Prevención de duplicados** por email

### 📧 Sistema de Notificaciones
- **Email de bienvenida** al suscribirse
- **Resultados del cuestionario** por email
- **Diseño profesional** y responsive

### 🔗 Redes Sociales Mejoradas
- **Enlaces funcionales** a Facebook, Twitter y LinkedIn
- **Compartir automático** del contenido
- **Ventanas emergentes** optimizadas

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework de React para desarrollo web
- **MongoDB**: Base de datos para almacenar blogs y respuestas
- **Mongoose**: ODM para MongoDB
- **Tailwind CSS**: Framework de CSS para estilos
- **React Toastify**: Notificaciones
- **Axios**: Cliente HTTP
- **Nodemailer**: Envío de emails

## 📋 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- MongoDB (local o en la nube)
- Cuenta de email para notificaciones

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/leomos2022/blog-inclusion-digital.git
   cd blog-inclusion-digital
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env.local
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-inclusion-digital
   EMAIL_SERVICE=gmail
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASS=tu-app-password
   VERCEL_URL=https://tu-proyecto.vercel.app
   ```

4. **Poblar la base de datos**
   ```bash
   npm run populate
   npm run populate-questions
   ```

5. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🌐 Despliegue en Vercel

### Paso 1: Preparar el proyecto
```bash
# El proyecto ya está configurado con vercel.json
```

### Paso 2: Conectar con Vercel
1. Ve a [Vercel](https://vercel.com/leonardos-projects-8e154d2f)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno en Vercel:
   - `MONGODB_URI`
   - `EMAIL_SERVICE`
   - `EMAIL_USER`
   - `EMAIL_PASS`

### Paso 3: Desplegar
```bash
# Vercel se despliega automáticamente al hacer push
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

## 📊 Arquitectura del Sistema

### Frontend (Usuario)
- **Blogs públicos** con contenido educativo
- **Cuestionarios interactivos** de 5 preguntas
- **Sistema de suscripciones** por email
- **Compartir en redes sociales**

### Backend (Administrador)
- **Panel de administración** para gestionar contenido
- **API REST** para blogs y cuestionarios
- **Base de datos MongoDB** para almacenar datos
- **Sistema de emails** automático

### Flujo de Usuario
1. Usuario visita el blog
2. Lee el contenido educativo
3. Ingresa su email para el cuestionario
4. Responde 5 preguntas relacionadas
5. Recibe feedback inmediato
6. Recibe email con resultados
7. Puede compartir en redes sociales

## 🎯 Funcionalidades del Administrador

### Gestión de Contenido
- **Agregar blogs** con título, descripción, categoría e imagen
- **Lista de blogs** con opción de eliminar
- **Suscripciones** de usuarios registrados

### Gestión de Cuestionarios
- **Preguntas automáticas** basadas en categoría del blog
- **Respuestas de usuarios** con puntajes
- **Estadísticas** de participación

## 📱 Estructura del Proyecto

```
blog-inclusion-digital/
├── app/                    # Páginas de Next.js
│   ├── admin/             # Panel de administración
│   ├── api/               # API routes
│   │   ├── blog/         # API de blogs
│   │   ├── questions/    # API de preguntas
│   │   ├── user-responses/ # API de respuestas
│   │   └── send-email/   # API de emails
│   ├── blogs/             # Páginas individuales de blogs
│   └── layout.js          # Layout principal
├── Components/            # Componentes React
│   ├── AdminComponents/   # Componentes del admin
│   ├── QuizComponent.jsx  # Componente de cuestionario
│   ├── BlogItem.jsx       # Componente de artículo
│   ├── BlogList.jsx       # Lista de blogs
│   ├── Footer.jsx         # Pie de página
│   └── Header.jsx         # Encabezado
├── lib/                   # Configuración y modelos
│   ├── config/            # Configuración de DB
│   └── models/            # Modelos de Mongoose
│       ├── BlogModel.js
│       ├── QuestionModel.js
│       ├── UserResponseModel.js
│       └── EmailModel.js
├── scripts/               # Scripts de utilidad
│   ├── populate-blog.js
│   └── populate-questions.js
└── Assets/                # Imágenes y recursos
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo
npm run build            # Construir para producción
npm run start            # Iniciar servidor de producción
npm run lint             # Ejecutar linter

# Base de datos
npm run populate         # Poblar con contenido de ejemplo
npm run populate-questions # Poblar con preguntas de ejemplo
```

## 📈 Métricas y Analytics

### Datos Recopilados
- **Suscripciones** por email
- **Respuestas de cuestionarios** con puntajes
- **Participación** por blog
- **Tasa de aprobación** de cuestionarios

### Dashboard del Administrador
- **Estadísticas** de usuarios
- **Rendimiento** de blogs
- **Feedback** de cuestionarios

## 🎨 Diseño y UX/UI

### Características de Diseño
- **Estética consistente** con el tema original
- **Responsive design** para todos los dispositivos
- **Accesibilidad** mejorada
- **Interfaz intuitiva** para usuarios de todas las edades

### Elementos Visuales
- **Colores**: Negro, blanco y grises
- **Tipografía**: Clara y legible
- **Iconos**: Emojis para mejor comprensión
- **Espaciado**: Generoso para facilitar lectura

## 🔒 Seguridad

### Medidas Implementadas
- **Validación** de datos en frontend y backend
- **Sanitización** de inputs
- **Rate limiting** en APIs
- **Variables de entorno** para credenciales

## 📞 Soporte y Contacto

Para preguntas sobre inclusión digital o el proyecto:
- **GitHub**: [@leomos2022](https://github.com/leomos2022)
- **Proyecto**: [blog-inclusion-digital](https://github.com/leomos2022/blog-inclusion-digital)
- **Vercel**: [leonardos-projects-8e154d2f](https://vercel.com/leonardos-projects-8e154d2f)

---

**"El conocimiento es la puerta de entrada de la verdad y la puerta de salida del mismo"**

Este proyecto busca democratizar el acceso al conocimiento digital y promover la inclusión social a través de la tecnología, ahora con un sistema completo de evaluación y feedback.