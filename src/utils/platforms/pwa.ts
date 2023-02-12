import { isWindowDefined, isNavigatorDefined } from './window'

interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>
}

let deferredPrompt: null | BeforeInstallPromptEvent = null

if (isWindowDefined()) {
  // https://web.dev/customize-install/
  window.addEventListener('beforeinstallprompt', event => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = event as BeforeInstallPromptEvent
    // Update UI notify the user they can install the PWA
  })
}

export const getPWAInstallationPrompt = () => deferredPrompt

export const resetPWAInstallationPrompt = () => {
  deferredPrompt = null
}

export const isRunningInStandalonePWA = () => {
  const mqStandAlone = '(display-mode: standalone)'

  if (!isNavigatorDefined() || !isWindowDefined()) return false

  if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
    return true
  }
  return false
}
