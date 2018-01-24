import {
  getStorageItem,
  setStorageItem,
  getTabById,
  getTabsByUrl,
  toggleIcon
} from './common'

// This callback cannot be `async` because `sendResponse` is not valid after function returns
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, key, value } = message

  setImmediate(async () => {
    switch (type) {
      case 'get':
        sendResponse(await getStorageItem(key))
        break

      case 'set':
        sendResponse(await setStorageItem(key, value))
        break
    }
  })

  // Need to return true to keep `sendResponse` function valid
  return true
})

chrome.tabs.onUpdated.addListener(async tabId => {
  const { url } = await getTabById(tabId)
  const { origin } = new URL(url)

  const veggieDetected = await getStorageItem(origin)
  const tabs = await getTabsByUrl(origin)

  if (veggieDetected !== null) {
    tabs.forEach(tab => {
      toggleIcon(tab.id, veggieDetected)
    })
  }
})
