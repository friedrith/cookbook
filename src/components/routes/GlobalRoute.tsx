import { useEffect } from 'react'
import useAuthentication from '~/src/features/authentication/hooks/useAuthentication'
import { useAppDispatch } from '~/src/hooks/redux'
import { fetchOfficialWebsites } from '~/src/features/landing/officialWebsites'

interface Props {
  children: React.ReactNode
}

const GlobalRoute: React.FC<Props> = ({ children }) => {
  useAuthentication()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOfficialWebsites())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default GlobalRoute
