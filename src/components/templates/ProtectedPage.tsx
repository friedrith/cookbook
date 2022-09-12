import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Roles from 'models/Roles'
import useShouldRedirectToLogin from 'hooks/useShouldRedirectToLogin'
import { areRecipesFetched, fetchRecipes, isCurrentUserFetched } from 'store'

type Props = {
  children?: React.ReactNode
  onlyRoles: Roles[]
}

const ProtectedPage = ({ onlyRoles, children }: Props) => {
  const shouldRedirect = useShouldRedirectToLogin(onlyRoles)

  const areFetched = useAppSelector(areRecipesFetched)
  const isUserFetched = useAppSelector(isCurrentUserFetched)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!areFetched && isUserFetched) {
      dispatch(fetchRecipes())
    }
  }, [areFetched, dispatch, isUserFetched])

  if (shouldRedirect) {
    return <Navigate to="/" replace />
  }

  if (children) {
    return <>{children}</>
  }

  return <Outlet />
}

export default ProtectedPage
