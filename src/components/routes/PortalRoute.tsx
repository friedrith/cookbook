import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import useWhenLoggedIn from 'features/authentication/hooks/useWhenLoggedIn'
import Transition, { TransitionProps } from 'components/atoms/Transition'

interface Props extends Omit<TransitionProps, 'children'> {
  children?: React.ReactNode
}

const PortalRoute = ({ children, className, onAnimationEnd }: Props) => {
  const navigate = useNavigate()

  const goToRecipesPage = useCallback(() => navigate('/recipes'), [navigate])

  useWhenLoggedIn(goToRecipesPage)

  return (
    <Transition className={className} onAnimationEnd={onAnimationEnd}>
      {children ? children : <Outlet />}
    </Transition>
  )
}

export default PortalRoute
