import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Roles from 'models/Roles'
import useWhenLoggedIn from 'hooks/useWhenLoggedIn'
import useWhenLoggedOut from 'hooks/useWhenLoggedOut'
import { areRecipesFetched, fetchRecipes, importRecipe } from 'store'
import Notifications from 'components/organisms/Notifications'
import useEventListener from 'hooks/useEventListener'
import renderSharingLink from 'utils/render/renderSharingLink'
import { getSharingLinks } from 'utils/sharingLinks'

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

  const importSaved = useCallback(async () => {
    const linkIds = getSharingLinks()

    localStorage.removeItem('sharedLinks')

    await Promise.all(
      linkIds
        .map(renderSharingLink)
        .map(url => dispatch(importRecipe(url)).unwrap())
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

export default ProtectedPage
