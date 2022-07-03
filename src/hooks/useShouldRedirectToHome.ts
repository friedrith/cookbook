import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { getCurrentUser } from 'store'

const useShouldRedirectToHome = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const currentUser = useSelector(getCurrentUser)

  console.log('currentUser', currentUser)
  useEffect(() => {
    if (currentUser) {
      setShouldRedirect(true)
    }
  }, [currentUser])

  return shouldRedirect
}

export default useShouldRedirectToHome
