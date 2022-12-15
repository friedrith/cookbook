import { useEffect, useRef } from 'react'

const usePrevious = (value: any) => {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
