import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'hooks/redux'
import { loginWithMagicLink } from 'store'
import LoginPage from 'components/templates/LoginPage'
import BackButton from 'components/molecules/BackButton'
// import { track } from 'utils/services/tracking'
import Button from 'components/atoms/Button'

const Login = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault()

    dispatch(loginWithMagicLink(email))
    // track('Login')

    navigate('/login/waiting-for-link')
  }

  return (
    <LoginPage title={t('login._Log in')}>
      <BackButton
        url="/"
        className="fixed top-5 left-5 lg:top-10 lg:left-10"
        title={t('_Back to landing page')}
      />
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('login._Link your email')}
        </h2>
        {
          <p className="mt-2 text-sm text-gray-600">
            {t('login._Get a magic link sent to your email')}
          </p>
        }
      </div>
      <div className="mt-8">
        <div className="mt-6">
          <form action="#" method="POST" className="space-y-4" onSubmit={login}>
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
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="john.smith@gmail.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button.Primary type="submit" className="w-full">
                {t('_Send magic link')}
              </Button.Primary>
            </div>
          </form>
          {/* <div>
            <p className="mt-2 text-sm text-gray-600">
              <Link
                to="/faq#why-magic-link"
                className="font-medium hover:underline"
              >
                {t('_Why a magic link')}
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </LoginPage>
  )
}

export default Login
