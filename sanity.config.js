import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Blog Inclusion Digital',
  projectId: '37zqpgoi',
  dataset: 'production',
  plugins: [structureTool()],
})
