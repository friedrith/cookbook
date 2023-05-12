import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Roles from 'models/Roles'
import useWhenLoggedIn from 'features/authentication/hooks/useWhenLoggedIn'
import useWhenLoggedOut from 'features/authentication/hooks/useWhenLoggedOut'
import { areRecipesFetched, fetchRecipes, importRecipe } from 'store'
import Notifications from 'components/organisms/Notifications'
import useEventListener from 'hooks/useEventListener'
import { renderSharingLink, cleanSharingLinks } from 'utils/urls/sharingLinks'
import { getSharingLinks } from 'utils/urls/sharingLinks'
import Transition, { TransitionProps } from 'components/atoms/Transition'

interface Props extends TransitionProps {
  children?: React.ReactNode
  onlyRoles: Roles[]
}

const ProtectedRoute = ({
  onlyRoles,
  children,
  className,
  onAnimationEnd,
}: Props) => {
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
      {children}
      <Transition className={className} onAnimationEnd={onAnimationEnd}>
        <Outlet />
      </Transition>
      <Notifications />
    </>
  )
}

export default ProtectedRoute
