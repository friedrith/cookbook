import { useEffect } from 'react'

const useEventListener = (
  eventName: string,
  handler: (event: any) => void,
  element = window
) => {
  useEffect(() => {
    // clean up code
    element.removeEventListener(eventName, handler)
    element.addEventListener(eventName, handler, { passive: true })
    return () => element.removeEventListener(eventName, handler)
  }, [element, eventName, handler])
}

export default useEventListener
