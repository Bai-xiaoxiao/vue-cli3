// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, './', dir)
// }

// cdn预加载使用
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'nprogress': 'NProgress' // 页面加载的进度条插件
}

const cdn = {
    // 开发环境
    dev: {
        css: [
            'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
            // 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
            'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
            // 'https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css',
            'https://cdn.jsdelivr.net/npm/animate.css@3.7.0/animate.min.css'
        ],
        
        js: []
    },
    // 生产环境
    build: {
        // 顺序对应上面的externals
        css: [
            'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
            // 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
            'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
            // 'https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css',
            'https://cdn.jsdelivr.net/npm/animate.css@3.7.0/animate.min.css'
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
            'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
            'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
            'https://unpkg.com/element-ui/lib/index.js',
            // 'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
            'https://unpkg.com/nprogress@0.2.0/nprogress.js'
        ]
    }
}


module.exports = {
    // 不同环境的不同地址
    // 打开之后访问本地代码的话需要http://localhost:8080/api/才可以
    // publicPath: process.env.NODE_ENV === 'development' ? '/api/' : 'http://192.168.250.107:8082',
    // 这里显示的地址是打包之后访问的文件目录的url的后缀   www.baidu.com/dist/xxx
    // http://localhost:8080/bxd/#/
    publicPath: process.env.NODE_ENV === 'development' ? '/bxd/' : '/dist/',

    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,

    chainWebpack: config => {
        // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
        config.plugin('define').tap(args => {
            const argv = process.argv
            const mode = argv[argv.indexOf('--project-mode') + 1]
            args[0]['process.env'].MODE = `"${mode}"`
            if (process.env.NODE_ENV === 'production') {
                args[0]['process.env'].BASE_API = '"/正式地址"'
            }
            if (process.env.NODE_ENV === 'development') {
                // dev指向代理地址
                args[0]['process.env'].BASE_API = '"/api"'
            }
            return args
        })


        // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html修改
        config.plugin('html').tap(args => {
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn.build
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = cdn.dev
            }
            return args
        })

    },

    // 修改webpack config, 使其不打包externals下的资源
    configureWebpack: config => {
        const myConfig = {}
        if (process.env.NODE_ENV === 'production') {
            // 1. 生产环境npm包转CDN
            myConfig.externals = externals
        }
        if (process.env.NODE_ENV === 'development') {
            // 关闭host check，方便使用ngrok之类的内网转发工具
            myConfig.devServer = {
                disableHostCheck: false
            }
        }
        return myConfig
    },


    // dev
    devServer: {
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: ' https://easy-mock.com/mock/5a94151094f6e604a7462e4e/bxd', //mock源地址
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