import { getTab } from '../common'

;(async function () {
  const tab = await getTab()
  const { origin } = new URL(tab.url)

  let res
  try {
    res = await fetch(`${origin}/veggie/api/showAll`)
  } catch (e) {
    console.error(e)
  }

  let json
  try {
    if (res.status < 400) {
      json = await res.json()
    }
  } catch (e) {
    console.error(e)
  }

  let veggieDetected = false
  if (json) {
    veggieDetected = true

    chrome.browserAction.setIcon({
      tabId: tab.id,
      path: {
        16: 'icons/enabled-16.png'/*,
        48: 'icons/enabled-48.png',
        128: 'icons/enabled-128.png'
        */
      }
    })
  }

  const popup = document.getElementById('veggie-popup')
  popup.classList.toggle('success', veggieDetected)
  popup.classList.toggle('failed', !veggieDetected)
})()
