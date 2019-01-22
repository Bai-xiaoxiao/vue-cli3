import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store'

import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

import {
  Message
} from 'element-ui'

Vue.use(Router)

const route =  new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  // url上面的/#/可以替换为其他的
  // base: '', 
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      // 路由模块lazyLoad
      component: () => import('./views/About.vue')
    }
  ]
})

const whiteList = ['/login'] // 不重定向白名单
route.beforeEach((to, from, next) => {
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
