import { disabledIcons, enabledIcons } from './config'

export function getActiveTab () {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => resolve(tab))
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

export function getTabById (id) {
  return new Promise(resolve => {
    chrome.tabs.get(id, resolve)
  })
}

export function getStorageItem (key) {
  return new Promise(resolve => {
    chrome.storage.local.get(key, data => resolve(data[key]))
  })
}

export function setStorageItem (key, value) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [key]: value }, resolve)
  })
}

export function getFromBackground (key) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: 'get', key }, resolve)
  })
}

export function setInBackground (key, value) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: 'set', key, value }, resolve)
  })
}

export function getTabsByUrl (url) {
  return new Promise(resolve => {
    chrome.tabs.query({ url: `${url}/*` }, resolve)
  })
}

export function isBoolean (val) {
  return (val === true || val === false)
}

