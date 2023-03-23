import { useEffect } from 'react'

import { useAppSelector } from 'hooks/redux'
import { isUserLoggedIn } from 'store'

const useWhenLoggedIn = (callback = () => {}) => {
  const isLoggedIn = useAppSelector(isUserLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
}

export default useWhenLoggedIn
