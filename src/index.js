import Vue from 'vue'
import App from './components/App.vue'
import './base.css'

const vm = new Vue({
  el: '#app',
  render: h => h(App)
})
