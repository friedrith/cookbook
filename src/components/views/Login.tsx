import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'hooks/redux'
import { loginWithMagicLink } from 'store'
import LoginPage from 'components/templates/LoginPage'
import BackButton from 'components/atoms/BackButton'

const Login = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(loginWithMagicLink(email))

    navigate('/waiting-for-link')
  }

  return (
    <LoginPage>
      <BackButton to="/" />
      <div>
        {/* <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              /> */}
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('_Log in')}
        </h2>
        {
          <p className="mt-2 text-sm text-gray-600">
            Get a magic link sent to your email that'll log in instantly.{' '}
          </p>
        }
      </div>
      <div className="mt-8">
        <div className="mt-6">
          <form action="#" method="POST" className="space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t('_Email address')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john.smith@gmail.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('_Send magic link')}
              </button>
            </div>
          </form>
          <div>
            <p className="mt-2 text-sm text-gray-600">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Why a magic link?
              </a>
            </p>
          </div>
        </div>
      </div>
    </LoginPage>
  )
}

export default Login
