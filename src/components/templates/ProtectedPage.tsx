import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Roles from 'models/Roles'
import useWhenLoggedIn from 'hooks/useWhenLoggedIn'
import useWhenLoggedOut from 'hooks/useWhenLoggedOut'
import { areRecipesFetched, fetchRecipes } from 'store'
import Notifications from 'components/organisms/Notifications'
import useEventListener from 'hooks/useEventListener'

type Props = {
  children?: React.ReactNode
  onlyRoles: Roles[]
}

const ProtectedPage = ({ onlyRoles, children }: Props) => {
  const navigate = useNavigate()

  const redirectToHome = useCallback(() => {
    navigate('/login')
  }, [navigate])

  useWhenLoggedOut(redirectToHome, onlyRoles)

  const dispatch = useAppDispatch()
  const recipesFetched = useAppSelector(areRecipesFetched)

  const fetch = useCallback(() => {
    if (!recipesFetched) dispatch(fetchRecipes())
  }, [recipesFetched, dispatch])

  useWhenLoggedIn(fetch)

  useEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      dispatch(fetchRecipes())
    }
  })

  return (
    <>
      {children ? children : <Outlet />}
      <Notifications />
    </>
  )
}

export default ProtectedPage
