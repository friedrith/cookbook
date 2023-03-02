import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

const useWhenAuthenticated = (callback = () => {}, properties: any = []) => {
  const { isLoaded, user } = useUser()

  console.log('user', user)

  useEffect(() => {
    if (user) {
      callback()
    }
  }, [isLoaded, user, callback, properties])
}

export default useWhenAuthenticated
