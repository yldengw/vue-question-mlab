import Vue from 'vue'
import Router from 'vue-router'
import layout from '../components/layout/layout'
import login from '../components/login/Login'
import Questionare from '../components/questionare/questionare'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/platform',
    name: 'platform',
    component: layout,
    children: [{
      path: 'questionare',
      name: 'questionare',
      component: Questionare
    }]
  }, {
    path: '/login',
    component: login
  }]
})
