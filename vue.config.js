const { defineConfig } = require('@vue/cli-service')
const UnPluginAutoImport = require('unplugin-auto-import/webpack')
const UnPluginVueComponents = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
    assetsDir: 'static',
    configureWebpack: {
        plugins: [
            UnPluginAutoImport.default({
                resolvers: [ElementPlusResolver()]
            }),
            UnPluginVueComponents.default({
                resolvers: [ElementPlusResolver()]
            })
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        https: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                secure: false,
                changeOrigin: true
            }
        }
    },
    outputDir: 'dist',
    productionSourceMap: process.env.NODE_ENV !== 'production',
    publicPath: '',
    transpileDependencies: true
})
