import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store'

import NProgress from 'nprogress' // 进度条

import {
  Message
} from 'element-ui'

Vue.use(Router)

const route =  new Router({
  // 用history之后服务端需要加配置
  // mode: 'history',
  // 这里对应域名后拼接的部分在vue.config的publicPath设置
  // http://localhost:8080/bxd/#/
  base: process.env.BASE_URL,
  // base: '', 
  routes: [
    {
      path: '/',
      name: '主页',
      component: Home
    },
    {
      path: '/about',
      name: '关于我们',
      // 路由模块lazyLoad
      component: () => import('./views/About.vue')
    },
    // 店铺页面
    {
      path: '/shopIndex',
      name: '店铺列表',
      meta:{
        keepAlive: true
      },
      component: () => import('./views/shop/ShopIndex.vue'),
    }
  ]
})

const whiteList = ['/login'] // 不重定向白名单
route.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start()
  if (store.dispatch('GetToken')) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else { // 实时拉取用户的信息
      store.dispatch('GetUserInfo').then(res => {
        next()
      }).catch(err => {
        Message.error('拉取用户信息失败，请重新登录！' + err)
          // next({
          //   path: '/'
          // })
          next()
      })
    }
  } else {
    // 当前路由是否是白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

route.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default route
