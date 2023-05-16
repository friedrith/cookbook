import { useEffect } from 'react'

import { useAppSelector } from '~/src/hooks/redux'
import Roles, { hasOneOfRoles } from '~/src/models/Roles'

import {
  getCurrentUser,
  isUserLoggedIn,
  isUserLoggedOut,
} from '~/src/store/index'

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
