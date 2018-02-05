import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
import { getActiveTab } from '../common'
import * as veggie from 'veggie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    detected: false,
    services: {
      ids: [],
      byId: {}
    },
    profiles: {},
    fetching: true,
    error: null
  },
  getters: {
    detected: state => state.detected,
    fetching: state => state.fetching,
    error: state => state.error,
    getServiceById: state => id => id ? state.services.byId[id] : null,
    services: state => {
      const { ids, byId } = state.services
      if (ids) {
        return ids.map(id => {
          const service = byId[id]
          return {
            id: service.id,
            label: service.url.full,
            override: service.override
          }
        })
      } else {
        return []
      }
    }
  },
  mutations: {
    detect: state => {
      state.detected = true
    },
    fetch: state => {
      state.fetching = true
    },
    receive: (state, data) => {
      state.services.ids = data.ids
      state.services.byId = data.byId
      state.fetching = false
    },
    error: (state, data) => {
      state.error = data.error
      state.fetching = false
    }
  },
  actions: {
    async getServices (context) {
      store.commit('fetch')
      const { data } = await veggie._getAllServices()
      context.commit('receive', data)
    },
    async resetProfile (context) {
      await veggie._resetProfile()
      context.dispatch('getServices')
    },
    async setService (context, payload) {
      await veggie._setService(payload)
      context.dispatch('getServices')
    }
  }
})

const vm = new Vue({
  el: '#app',
  render: h => h(App),
  store
})

console.log('env', process.env.NODE_ENV)

;(async function () {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Use tab's origin for the base for each fetch request
      const tab = await getActiveTab()
      const { origin } = new URL(tab.url)
      veggie.setApiOrigin(origin)
    }

    store.commit('fetch')
    const { message } = await veggie._ping()
    if (message === 'pong') {
      store.commit('detect')
      store.dispatch('getServices')
    }
  } catch (error) {
    console.error(error)
    store.commit('error', { error })
  }
})()
