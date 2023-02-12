import { useEffect } from 'react'
import { isWindowDefined } from '@/utils/platforms/window'

const useEventListener = (
  eventName: string,
  handler: (event: any) => void,
  target:
    | HTMLElement
    | BroadcastChannel
    | null
    | (Window & typeof globalThis) = null,
) => {
  useEffect(() => {
    const element = target ?? window
    if (element) {
      // clean up code
      element.removeEventListener(eventName, handler)
      element.addEventListener(eventName, handler)
      return () => element.removeEventListener(eventName, handler)
    }
  }, [target, eventName, handler])
}

export default useEventListener
