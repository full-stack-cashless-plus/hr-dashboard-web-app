/*=========================================================================================
  Author: Hossam Ali
  Author URL: https://www.linkedin.com/in/hossam-ali-7bb41810b/
==========================================================================================*/


module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/newdashboard'
    : '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:8080/',
  },

}

