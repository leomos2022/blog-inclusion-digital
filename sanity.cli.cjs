const { defineCliConfig } = require('sanity/cli');

module.exports = defineCliConfig({
  api: {
    projectId: '37zqpgoi',
    dataset: 'production',
  },
  studioHost: 'blog-inclusion-digital',
});
