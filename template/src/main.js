// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 清除浏览器默认的样式
import 'reset.css'
// 动画库
import 'animate.css'
// 全局状态管理器
import store from '@/store'
// 路由配置
import router from '@/router'
// API配置信息
import apiConfig from '@/api'
// 接口请求工具
import $api from '@strongsoft/vue-axios'

Vue.use($api, {
  apiConfig
})

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    store.dispatch('global/loginByCookie').then(() => {
      if (router.currentRoute.params.module) {
        router.push({path: '/' + router.currentRoute.params.module})
      } else {
        router.push({name: store.getters['global/firEndMenu'].args})
      }
    }).catch(() => {
      router.push({name: 'login'})
    })
  }
})
