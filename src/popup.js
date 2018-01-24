import { getActiveUrl, getFromBackground, isBoolean, setInBackground, toggleActiveIcon } from './common'
import * as veggie from 'veggie'

;(async function () {
  const { origin } = await getActiveUrl()
  let veggieDetected = await getFromBackground(origin)

  if (!isBoolean(veggieDetected)) {
    veggie.setApiOrigin(origin)
    veggieDetected = false

    try {
      const res = await veggie.ping()

      if (res.message === 'pong') {
        veggieDetected = true
      }
    } catch (e) {
      veggieDetected = false
    }

    setInBackground(origin, veggieDetected)
  }

  const popup = document.getElementById('veggie-popup')
  popup.classList.toggle('success', veggieDetected)
  popup.classList.toggle('failed', !veggieDetected)
  toggleActiveIcon(veggieDetected)
})()

