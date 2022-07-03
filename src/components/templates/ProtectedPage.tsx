import { Navigate, Outlet } from 'react-router-dom'

import Roles from 'models/Roles'
import useShouldRedirectToLogin from 'hooks/useShouldRedirectToLogin'

type Props = {
  children?: React.ReactNode
  onlyRoles: Roles[]
}

const ProtectedPage = ({ onlyRoles, children }: Props) => {
  const shouldRedirect = useShouldRedirectToLogin(onlyRoles)

  if (shouldRedirect) {
    return <Navigate to="/" replace />
  }

  if (children) {
    return <>{children}</>
  }

  return <Outlet />
}

export default ProtectedPage
