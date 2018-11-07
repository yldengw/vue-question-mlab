import Vue from 'vue'
import Router from 'vue-router'
import layout from '../components/layout/layout'
import login from '../components/login/Login'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/platform',
    name: 'platform',
    component: layout
  }, {
    path: '/login',
    component: login
  }]
})
