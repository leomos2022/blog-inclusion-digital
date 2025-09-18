# Guía de Despliegue en Vercel

## Configuración de Variables de Entorno

Antes de desplegar, asegúrate de configurar las siguientes variables de entorno en Vercel:

### 1. Base de Datos MongoDB
- `MONGODB_URI`: Tu string de conexión de MongoDB Atlas
  - Ejemplo: `mongodb+srv://usuario:password@cluster.mongodb.net/blog-inclusion-digital?retryWrites=true&w=majority`

### 2. Configuración de Email (Opcional)
- `EMAIL_SERVICE`: Servicio de email (gmail, outlook, etc.)
- `EMAIL_USER`: Tu dirección de email
- `EMAIL_PASS`: Contraseña de aplicación (no la contraseña normal)
- `VERCEL_URL`: URL de tu aplicación en Vercel (se configura automáticamente)

## Pasos para Desplegar

1. **Conecta tu repositorio de GitHub con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio `blog-inclusion-digital`

2. **Configura las variables de entorno:**
   - En la sección "Environment Variables" de Vercel
   - Agrega cada variable con su valor correspondiente

3. **Despliega:**
   - Vercel detectará automáticamente que es un proyecto Next.js
   - El build se ejecutará automáticamente
   - Tu aplicación estará disponible en la URL proporcionada

## Funcionalidades Verificadas

✅ **APIs del formulario de preguntas:**
- `/api/questions` - Obtener preguntas por blog
- `/api/user-responses` - Enviar respuestas del cuestionario
- `/api/send-email` - Envío de emails de confirmación

✅ **Base de datos:**
- Conexión a MongoDB configurada
- Modelos de datos optimizados
- Validaciones implementadas

✅ **Frontend:**
- Componente de cuestionario funcional
- Integración con APIs
- Manejo de errores y estados de carga

## Notas Importantes

- Asegúrate de que tu base de datos MongoDB esté accesible desde internet
- Para el envío de emails, configura una contraseña de aplicación en tu proveedor de email
- El proyecto está optimizado para producción con configuraciones de Next.js apropiadas
