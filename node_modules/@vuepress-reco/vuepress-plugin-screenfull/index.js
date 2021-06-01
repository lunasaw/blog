const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: '@vuepress-reco/vuepress-plugin-screenfull',
  enhanceAppFiles: [
    path.resolve(__dirname, './bin/enhanceAppFile.js')
  ]
})