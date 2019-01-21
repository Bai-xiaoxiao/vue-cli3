const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
    // 不同环境的不同地址
    publicPath: process.env.NODE_ENV === 'development' ? '/api/' : 'http://192.168.250.107:8082',

    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,

    chainWebpack: config => {
        // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
        config.plugin('define').tap(args => {
            const argv = process.argv
            const mode = argv[argv.indexOf('--project-mode') + 1]
            args[0]['process.env'].MODE = `"${mode}"`
            args[0]['process.env'].BASE_API = '"/api"'
            return args
        })

    },

    // dev
    devServer: {
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: 'http://api.beta.ssaini.cn', //源地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' //路径重写
                }
            },
        },
    },

    // 第三方插件配置
    pluginOptions: {}
}