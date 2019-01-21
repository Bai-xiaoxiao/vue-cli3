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
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
        store.dispatch('FedLogOut').then(() => {
          Message.error('拉取用户信息失败，请重新登录！' + err)
          next({
            path: '/'
          })
        })
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
