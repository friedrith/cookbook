import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import Page from './Page'

import useWhenLoggedIn from 'hooks/useWhenLoggedIn'

type Props = {
  children: React.ReactNode
  title: string
}

const LoginPage = ({ children, title }: Props) => {
  const navigate = useNavigate()

  const goToRecipesPage = useCallback(() => navigate('/recipes'), [navigate])

  useWhenLoggedIn(goToRecipesPage)

  return (
    <Page title={title}>
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752"
            alt=""
          />
        </div>
      </div>
    </Page>
  )
}

export default LoginPage
