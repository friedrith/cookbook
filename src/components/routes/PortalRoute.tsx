import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import useWhenLoggedIn from 'features/authentication/hooks/useWhenLoggedIn'

type Props = {
  children?: React.ReactNode
}

const PortalRoute = ({ children }: Props) => {
  const navigate = useNavigate()

  const goToRecipesPage = useCallback(() => navigate('/recipes'), [navigate])

  useWhenLoggedIn(goToRecipesPage)

  return <>{children ? children : <Outlet />}</>
}

export default PortalRoute
