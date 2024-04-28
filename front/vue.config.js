const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000, // your desired port number
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/global-vars.scss";`
      },
    }
  }
})
