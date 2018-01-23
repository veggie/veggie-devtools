import { getActiveUrl, toggleActiveIcon } from './common'
import * as veggie from 'veggie'

;(async function () {
  const { origin } = await getActiveUrl()
  veggie.setApiOrigin(origin)

  let veggieDetected = false
  try {
    const res = await veggie.ping()

    if (res.message === 'pong') {
      veggieDetected = true
    }
  } catch (e) {
    veggieDetected = false
  }

  toggleActiveIcon(veggieDetected)
  chrome.storage.local.set({
    [origin]: veggieDetected
  })

  const popup = document.getElementById('veggie-popup')
  popup.classList.toggle('success', veggieDetected)
  popup.classList.toggle('failed', !veggieDetected)
})()
