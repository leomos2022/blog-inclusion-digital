'use client'

/**
 * Configuración para Sanity Studio montado en /studio
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio', // ruta donde estará el studio
  projectId,
  dataset,
  schema, // directamente el array de tipos
  plugins: [
    structureTool({ structure }), // estructura personalizada del studio
    visionTool({ defaultApiVersion: apiVersion }), // plugin de visión GROQ
  ],
})
