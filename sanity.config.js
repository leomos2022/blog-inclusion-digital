import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Blog Inclusión Digital',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool(),
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
  },
})
