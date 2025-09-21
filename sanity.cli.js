/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  
  /**
   * Set the hostname for the studio when deploying
   */
  studioHost: 'blog-inclusion-digital'
})
