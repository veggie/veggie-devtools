import Vue from 'vue'
import App from './components/App.vue'
import { getTab } from './common'
import './base.css'

const vm = new Vue({
  el: '#app',
  render: h => h(App)
})


// TODO:
// If not developing locally,
// Use tab's origin for the base for each fetch request
/*
const tab = await getTab()
const { origin } = new URL(tab.url)

let res
try {
  res = await fetch(`${origin}/veggie/api/showAll`)
} catch (e) {
  console.error(e)
}
*/
