import { useEffect } from 'react'

import { useAppSelector } from '~/src/hooks/redux'
import { isUserLoggedIn } from '~/src/store/index'

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
