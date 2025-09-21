import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Blog Inclusion Digital',
  projectId: '37zqpgoi',
  dataset: 'production',
  
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
})
