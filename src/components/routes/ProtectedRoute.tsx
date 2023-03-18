import { useCallback, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Roles from 'models/Roles'
import useWhenLoggedIn from 'features/authentication/hooks/useWhenLoggedIn'
import useWhenLoggedOut from 'features/authentication/hooks/useWhenLoggedOut'
import { areRecipesFetched, fetchRecipes, importRecipe } from 'store'
import Notifications from 'components/organisms/Notifications'
import useEventListener from 'hooks/useEventListener'
import { renderSharingLink, cleanSharingLinks } from 'utils/urls/sharingLinks'
import { getSharingLinks } from 'utils/urls/sharingLinks'

type Props = {
  children?: React.ReactNode
  onlyRoles: Roles[]
}

const ProtectedRoute = ({ onlyRoles, children }: Props) => {
  const navigate = useNavigate()

  const location = useLocation()

  const redirectToHome = useCallback(() => {
    navigate('/login')
  }, [navigate])

  useWhenLoggedOut(redirectToHome, onlyRoles)

  const dispatch = useAppDispatch()
  const recipesFetched = useAppSelector(areRecipesFetched)

  const fetch = useCallback(() => {
    if (!recipesFetched) dispatch(fetchRecipes())
  }, [recipesFetched, dispatch])

  useEffect(() => {
    console.log('mount', location.pathname)
  }, [])

  useWhenLoggedIn(fetch)

  useEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      dispatch(fetchRecipes())
    }
  })

  const importSaved = useCallback(async () => {
    const linkIds = getSharingLinks()

    cleanSharingLinks()

    await Promise.all(
      linkIds
        .map(renderSharingLink)
        .map(url => dispatch(importRecipe(url)).unwrap()),
    )
  }, [dispatch])

  useWhenLoggedIn(importSaved)

  return (
    <>
      {children ? children : <Outlet />}
      <Notifications />
    </>
  )
}

export default ProtectedRoute
