import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Blog Inclusión Digital',
  
  projectId: '37zqpgoi',
  dataset: 'production',
  
  plugins: [
    structureTool({
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
