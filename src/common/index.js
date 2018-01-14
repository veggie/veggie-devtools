export function getTab () {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const [ tab ] = tabs
      console.log(tab)
      resolve(tab)
    })
  })
}
