import useEventListener from '~/src/hooks/useEventListener'

const useBeforeInstallPrompt = (callback: (e: Event) => void) => {
  useEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    callback(event)
  })
}

export default useBeforeInstallPrompt
