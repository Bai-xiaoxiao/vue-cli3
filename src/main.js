import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 没有设置api管理 直接写方便
// import service from './utils/http/request'
// service
// Vue.prototype.$http = service

// 设置api管理 管理清晰
import api from './utils/api/index'
Vue.prototype.$api = api

import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 自己的通用样式
import './assets/css/normalize.css'
import './assets/css/common.css'

Vue.config.productionTip = false



// animateCSS
// this.$animate('.my-element', 'bounce', (){.....})
Vue.prototype.$animate = function(element, animationName, callback) {
  const node = document.querySelector(element)
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}


new Vue({
  router,
  store,
  created(){
    // this.$http.post(`/api/v1/member/sendCode`, {
    //   member_mobile: 18244242739
    // })

    // 测试api管理模块
    // this.$api.shop.shopDetails({
    //   params: 111
    // }).then(res =>{

    // });
  },
  render: h => h(App)
}).$mount('#app')
