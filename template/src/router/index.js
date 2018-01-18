import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Login from '@/components/login'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    redirect: { name: 'login' }
  }, {
    path: '/login/:module?',
    name: 'login',
    components: {
      login: Login
    }
  }]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 当前用户未登录时，访问非登录模块时
  if (to.name !== 'login' && !store.getters['global/userInfo']) { 
    next({ name: 'login', params: { module: to.path.substr(1) } })
    NProgress.done()
  }
  //访问登录模块时
  if (to.name === 'login') { 
  	//清空登录信息
    store.commit('global/setUserInfo', null) 
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

store.registerModule('router', {
  namespaced: true,
  state: {
    router
  },
  mutations: {
    addRoutes(state, routes) {
      state.router.addRoutes(routes)
    }
  }
})

export default router
