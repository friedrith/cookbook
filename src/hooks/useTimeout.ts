import { useEffect, useRef } from 'react'

type setTimeoutType = (
  callback: () => void,
  timeout: number
) => ReturnType<typeof setTimeout>

const useTimeout = (): setTimeoutType => {
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const setCustomTimeout: setTimeoutType = (callback, timeout) => {
    const t = setTimeout(callback, timeout)
    timeouts.current.push(t)
    return t
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeouts.current.forEach(t => {
        clearTimeout(t)
      })
    }
  }, [])

  return setCustomTimeout
}

export default useTimeout
