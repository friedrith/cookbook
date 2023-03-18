import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LoginPage from 'components/templates/LoginPage'
import Button from 'components/atoms/Button'
import Form from 'components/atoms/Form'
import useAuthentication from 'features/authentication/hooks/useAuthentication'
import LoadingSpinner from 'components/atoms/LoadingSpinner'

const Login = () => {
  const { t } = useTranslation('login')

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setLoading] = useState(false)

  const { sendVerificationCode } = useAuthentication()

  const login = async (event: React.SyntheticEvent) => {
    setLoading(true)
    try {
      await sendVerificationCode(email)
      navigate(`/login/code-verify?email=${email}`)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPage title={t('_Log in')} description={t('_We need your email')}>
      <Form className="space-y-4" onSubmit={login}>
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
            {isLoading ? (
              <LoadingSpinner className="h-5 w-5 text-white" />
            ) : (
              t('_Send code')
            )}
          </Button.Primary>
        </div>
      </Form>
    </LoginPage>
  )
}

export default Login
