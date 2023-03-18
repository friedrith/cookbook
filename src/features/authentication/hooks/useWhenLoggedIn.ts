import { useEffect } from 'react'

import { useAppSelector } from 'hooks/redux'
import { isUserLoggedIn } from 'store'

const useWhenLoggedIn = (callback = () => {}, properties: any = []) => {
  const isLoggedIn = useAppSelector(isUserLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      console.log('isLoggedIn')
      callback()
    }
  }, [isLoggedIn])
}

export default useWhenLoggedIn
