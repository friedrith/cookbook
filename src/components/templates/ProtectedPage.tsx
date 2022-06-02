import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { getCurrentUser, isCurrentUserFetched } from 'store'

type Props = {
  children?: React.ReactNode
  onlyRoles: string[]
}

const ProtectedPage = ({ onlyRoles, children }: Props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const currentUser = useSelector(getCurrentUser)
  const currentUserFetched = useSelector(isCurrentUserFetched)
  useEffect(() => {
    if (currentUserFetched && !currentUser) {
      setShouldRedirect(true)
    }

    if (
      currentUser &&
      onlyRoles.length > 0 &&
      !onlyRoles.includes(currentUser.role)
    ) {
      setShouldRedirect(true)
    }
  }, [currentUser, currentUserFetched, onlyRoles])

  if (shouldRedirect) {
    return <Navigate to="/" replace />
  }

  if (children) {
    return <>{children}</>
  }

  return <Outlet />
}

export default ProtectedPage
