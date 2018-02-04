import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import { getTab } from '../common'
import './base.css'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    detected: false
  },
  mutations: {
  }
})

const vm = new Vue({
  el: '#app',
  render: h => h(App)
})


// If not developing locally,
// Use tab's origin for the base for each fetch request
console.log('env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  (async function () {
    console.log(process.env.NODE_ENV)
    const tab = await getTab()
    const { origin } = new URL(tab.url)

    let res
    try {
      res = await fetch(`${origin}/veggie/api/showAll`)
    } catch (e) {
      console.error(e)
    }
  })()
}
