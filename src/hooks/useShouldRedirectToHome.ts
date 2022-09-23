import { useEffect, useState } from 'react'

import { useAppSelector } from 'hooks/redux'
import { getCurrentUser } from 'store'

const useShouldRedirectToHome = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const currentUser = useAppSelector(getCurrentUser)

  useEffect(() => {
    if (currentUser) {
      setShouldRedirect(true)
    }
  }, [currentUser])

  return shouldRedirect
}

export default useShouldRedirectToHome
