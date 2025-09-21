import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'temp-project-id',
    dataset: 'production'
  },
  studioHost: 'blog-inclusion-digital'
})
