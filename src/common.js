import { disabledIcons, enabledIcons } from './config'

export function getActiveTab () {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const [ tab ] = tabs
      resolve(tab)
    })
  })
}

export async function getActiveUrl () {
  let { url } = await getActiveTab()
  url = new URL(url)

  return url
}

export function toggleIcon (tabId, enable) {
  const path = enable ? enabledIcons : disabledIcons

  chrome.browserAction.setIcon({ tabId, path })
}

export async function toggleActiveIcon (enable) {
  const { id } = await getActiveTab()
  toggleIcon(id, enable)
}
