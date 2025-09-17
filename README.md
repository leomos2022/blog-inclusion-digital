# Blog de Inclusión Digital

Este es un proyecto de blog educativo enfocado en la inclusión digital y responsabilidades sociales, diseñado para enseñar conceptos básicos de tecnología digital.

## Descripción del Proyecto

El blog está diseñado para ayudar a las personas a aprender conceptos fundamentales de tecnología digital, incluyendo:

- **Uso de Celulares**: Guías básicas para usar smartphones de forma segura
- **Correo Electrónico**: Cómo crear y gestionar cuentas de email
- **Microsoft Office**: Herramientas esenciales para el trabajo digital
- **Inteligencia Artificial**: Introducción práctica a la IA
- **Seguridad Digital**: Protección de información personal en internet

## Características

- ✅ Interfaz completamente en español
- ✅ Categorías específicas para inclusión digital
- ✅ Panel de administración para gestionar contenido
- ✅ Diseño responsive y accesible
- ✅ Sistema de suscripciones por email
- ✅ Compartir en redes sociales

## Tecnologías Utilizadas

- **Next.js 15**: Framework de React para desarrollo web
- **MongoDB**: Base de datos para almacenar blogs
- **Mongoose**: ODM para MongoDB
- **Tailwind CSS**: Framework de CSS para estilos
- **React Toastify**: Notificaciones
- **Axios**: Cliente HTTP

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- MongoDB (local o en la nube)

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

3. **Configurar la base de datos**
   - Actualiza la cadena de conexión en `lib/config/db.js`
   - O configura las variables de entorno para MongoDB

4. **Poblar la base de datos con contenido de ejemplo**
   ```bash
   npm run populate
   ```

5. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   - Visita `http://localhost:3000` para ver el blog
   - Visita `http://localhost:3000/admin` para acceder al panel de administración

## Estructura del Proyecto

```
blog-inclusion-digital/
├── app/                    # Páginas de Next.js
│   ├── admin/             # Panel de administración
│   ├── api/               # API routes
│   ├── blogs/             # Páginas individuales de blogs
│   └── layout.js          # Layout principal
├── Components/            # Componentes React
│   ├── AdminComponents/   # Componentes del admin
│   ├── BlogItem.jsx       # Componente de artículo
│   ├── BlogList.jsx       # Lista de blogs
│   ├── Footer.jsx         # Pie de página
│   └── Header.jsx         # Encabezado
├── lib/                   # Configuración y modelos
│   ├── config/            # Configuración de DB
│   └── models/            # Modelos de Mongoose
├── scripts/               # Scripts de utilidad
└── Assets/                # Imágenes y recursos
```

## Uso del Panel de Administración

1. **Agregar Nuevo Blog**
   - Ve a `/admin/addBlog`
   - Completa el formulario con título, descripción, categoría
   - Sube una imagen representativa
   - Guarda el blog

2. **Gestionar Blogs Existentes**
   - Ve a `/admin/blogList`
   - Visualiza todos los blogs
   - Elimina blogs si es necesario

3. **Ver Suscripciones**
   - Ve a `/admin/subscriptions`
   - Revisa las suscripciones de usuarios

## Contribuir al Proyecto

Este proyecto está diseñado para promover la inclusión digital. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Temas de Contenido Sugeridos

- Tutoriales paso a paso para principiantes
- Guías de seguridad digital
- Recursos para personas mayores
- Herramientas de accesibilidad
- Educación digital para comunidades

## Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para preguntas sobre inclusión digital o el proyecto:
- GitHub: [@leomos2022](https://github.com/leomos2022)
- Proyecto: [blog-inclusion-digital](https://github.com/leomos2022/blog-inclusion-digital)

---

**"El conocimiento es la puerta de entrada de la verdad y la puerta de salida del mismo"**

Este proyecto busca democratizar el acceso al conocimiento digital y promover la inclusión social a través de la tecnología.