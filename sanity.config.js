import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'blog-inclusion-digital',
  title: 'Blog Inclusión Digital',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'temp-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Blogs')
              .child(S.documentTypeList('blog').title('Blogs')),
            S.listItem()
              .title('Preguntas')
              .child(S.documentTypeList('question').title('Preguntas')),
            S.listItem()
              .title('Suscripciones')
              .child(S.documentTypeList('email').title('Emails')),
            S.listItem()
              .title('Respuestas de Usuarios')
              .child(S.documentTypeList('userResponse').title('Respuestas')),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  document: {
    // Configuración para prevenir eliminación accidental
    actions: (prev, context) => {
      return prev.map((originalAction) => {
        if (originalAction.action === 'delete') {
          return {
            ...originalAction,
            disabled: context.schemaType === 'blog' && context.published,
          }
        }
        return originalAction
      })
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'userResponse')
      }
      return prev
    },
  },
})
