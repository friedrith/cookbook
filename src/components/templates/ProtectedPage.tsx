import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import Roles from '@/models/Roles'
import useWhenLoggedIn from '@/hooks/useWhenLoggedIn'
import useWhenLoggedOut from '@/hooks/useWhenLoggedOut'
import { areRecipesFetched, fetchRecipes, importRecipe } from '@/store'
import Notifications from '@/components/organisms/Notifications'
import useEventListener from '@/hooks/useEventListener'
import { renderSharingLink, cleanSharingLinks } from '@/utils/urls/sharingLinks'
import { getSharingLinks } from '@/utils/urls/sharingLinks'
import Loading from './Loading'

type Props = {
  children?: React.ReactNode
  onlyRoles?: Roles[]
}

const ProtectedPage = ({ onlyRoles = [Roles.User], children }: Props) => {
  const router = useRouter()

  const redirectToHome = useCallback(() => {
    router.push('/login')
  }, [router])

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

  // return <Loading />

  return (
    <>
      {children}
      <Notifications />
    </>
  )
}

export default ProtectedPage
