import React from 'react'
import ReactDOM from 'react-dom'
import * as veggie from 'veggie'
import { getProfiles } from './services'
import { getActiveUrl, setInBackground, toggleActiveIcon } from '../common'
import './root.css'

console.log('env', process.env.NODE_ENV)

const state = {
  status: {
    ok: false,
    fetching: false,
    error: false
  },
  profiles: [],
  getData
}

async function initialize () {
  try {
    await ifProduction(async () => {
      // Use tab's origin for the base for each fetch request
      const { origin } = await getActiveUrl()
      veggie.setApiOrigin(origin)
    })

    update({ fetching: true, ok: false, error: false })

    const { message } = await veggie._ping()
    if (message === 'pong') {
      ifProduction(() => {
        toggleActiveIcon(true)
        setInBackground(origin, true)
      })
      await getData()
    } else {
      throw new Error('ping not implemented')
    }
  } catch (error) {
    console.error(`Error detecting veggie: ${error}`)
    update({
      error: true,
      fetching: false,
      ok: false,
      errorMessage: `Veggie not detected: ${error}`
    })
  }
}

function ifProduction (callback) {
  if (process.env.NODE_ENV === 'production') {
    return callback()
  }
}

async function getData () {
  const { currentProfile, profileIds, profilesById } = await getProfiles()
  state.profilesById = profilesById
  state.profileIds = profileIds
  state.currentProfile = currentProfile
  update({ ok: true, fetching: false, error: false })
}

function update (obj) {
  if (obj) {
    state.status = Object.assign({}, state.status, obj)
  }
  ReactDOM.render(<App {...state}/>, document.getElementById('app'))
}

let App
export default async function initApp (component) {
  App = component
  initialize()
}
