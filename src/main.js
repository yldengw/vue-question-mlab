// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
// import VueValidator from 'vue-validator'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueRouter)
// Vue.validator('latin', function (val) {
//   return !val.match(/[^a-zA-Z0-9_]/)
// })
// Vue.validator('email', function (val) {
//   let pattern = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i
//   return pattern.test(val)
// })
// Vue.filter('camelCaseToDash', function (value) {
//   return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
// })

// iview组件国际化
// i18n (path, options) {
//   let value = i18n.t(path, options)
//   if (value !== null && value !== undefined) return value
//   return ''
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
