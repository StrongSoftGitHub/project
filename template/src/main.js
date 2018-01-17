// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 清除浏览器默认的样式  
import 'reset.css'
// 全局状态管理器
import store from '@/store' 
// 路由配置
import router from '@/router'
// API配置信息
import apiConfig from '@/api'
// 接口请求工具
import $api from '@strongsoft/vue-axios'

Vue.use($api,{
  apiConfig
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
