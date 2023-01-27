import { useEffect } from 'react'

const useEventListener = (
  eventName: string,
  handler: (event: any) => void,
  element:
    | HTMLElement
    | BroadcastChannel
    | null
    | (Window & typeof globalThis) = window,
) => {
  useEffect(() => {
    if (element) {
      // clean up code
      element.removeEventListener(eventName, handler)
      element.addEventListener(eventName, handler)
      return () => element.removeEventListener(eventName, handler)
    }
  }, [element, eventName, handler])
}

export default useEventListener
