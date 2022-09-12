import { useEffect, useState } from 'react'

import { useAppSelector } from 'hooks/redux'
import Roles from 'models/Roles'

import { getCurrentUser, isCurrentUserFetched } from 'store'

const useShouldRedirectToLogin = (onlyRoles: Roles[]) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const currentUser = useAppSelector(getCurrentUser)
  const currentUserFetched = useAppSelector(isCurrentUserFetched)
  useEffect(() => {
    if (currentUserFetched && !currentUser) {
      setShouldRedirect(true)
    }

    if (
      currentUser &&
      onlyRoles.length > 0 &&
      !onlyRoles.find(r => r === currentUser.role)
    ) {
      console.log(
        'onlyRoles.find(r => r === currentUser.role)',
        onlyRoles.find(r => r === currentUser.role)
      )
      setShouldRedirect(true)
    }
  }, [currentUser, currentUserFetched, onlyRoles])

  return shouldRedirect
}

export default useShouldRedirectToLogin
