import {defineConfig} from 'sanity'
import {structure} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'blog-inclusion-digital',

  projectId: '37zqpgoi',
  dataset: 'production',

  plugins: [structure(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
