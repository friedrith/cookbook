import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LoginPage from '~/src/components/templates/LoginPage'
import Button from '~/src/components/atoms/Button'
import Form from '~/src/components/atoms/Form'
import useAuthentication from '~/src/features/authentication/hooks/useAuthentication'
import LoadingSpinner from '~/src/components/atoms/LoadingSpinner'

export default function SignUp() {
  const { t } = useTranslation('login')

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setLoading] = useState(false)

  const { sendVerificationCodeForSignUp } = useAuthentication()

  const login = async () => {
    setLoading(true)
    try {
      const { status } = await sendVerificationCodeForSignUp(email)
      console.log('status', status)
      navigate(`/signup/code-verify?email=${email}`)
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPage title={t('_Sign up')} description={'‎'}>
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
      <p className="mt-5 text-left text-sm text-gray-500">
        {t('_Already an account')}{' '}
        <Link
          to="/login"
          className="font-semibold leading-6 text-primary-500 hover:text-primary-600"
        >
          {t('_Log in')}
        </Link>
      </p>
    </LoginPage>
  )
}
