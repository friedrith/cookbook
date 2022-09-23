let deferredPrompt = null

// https://web.dev/customize-install/
window.addEventListener('beforeinstallprompt', event => {
  console.log('beforeinstallprompt', event)
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = event
  // Update UI notify the user they can install the PWA
})

export const getPWAInstallationPrompt = () => deferredPrompt

export const resetPWAInstallationPrompt = () => {
  deferredPrompt = null
}

export const isRunningInStandalonePWA = () => {
  const mqStandAlone = '(display-mode: standalone)'
  if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
    return true
  }
  return false
}
