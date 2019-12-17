import Vue from 'vue'
import App from './App'

Vue.directive('focus', {
  inserted: function (el, binding) {
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
