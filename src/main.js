import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './utils/request'

Vue.config.productionTip = false

// service
Vue.prototype.$http = service

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
    this.$http.post(`/api/v1/member/sendCode`, {
      member_mobile: 18244242739
    })
  },
  render: h => h(App)
}).$mount('#app')
