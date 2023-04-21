import { useEffect } from 'react'

import { useAppSelector } from 'hooks/redux'
import Roles, { hasOneOfRoles } from 'models/Roles'

import { getCurrentUser, isUserLoggedIn, isUserLoggedOut } from 'store'

const useWhenLoggedOut = (callback = () => {}, onlyRoles: Roles[]) => {
  const currentUser = useAppSelector(getCurrentUser)
  const loggedOut = useAppSelector(isUserLoggedOut)
  const loggedIn = useAppSelector(isUserLoggedIn)

  useEffect(() => {
    if (loggedOut || (loggedIn && !hasOneOfRoles(currentUser, onlyRoles))) {
      callback()
    }
  }, [loggedOut, loggedIn, currentUser, onlyRoles, callback])
}

export default useWhenLoggedOut
