import { useEffect } from 'react'

import { useAppSelector } from 'hooks/redux'
import Roles, { hasOneOfRoles } from 'models/Roles'

import { getCurrentUser, isUserLoggedIn, isUserLoggedOut } from 'store'

const useWhenLoggedOut = (callback = () => {}, onlyRoles: Roles[]) => {
  const currentUser = useAppSelector(getCurrentUser)
  const loggedIn = useAppSelector(isUserLoggedIn)
  const loggedOut = useAppSelector(isUserLoggedOut)

  useEffect(() => {
    if (loggedOut || (loggedIn && !hasOneOfRoles(currentUser, onlyRoles))) {
      callback()
    }
  }, [loggedOut, currentUser, loggedIn, onlyRoles, callback])
}

export default useWhenLoggedOut
