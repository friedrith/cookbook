import { useLayoutEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import CenterPage from 'components/templates/CenterPage'
import { useAppDispatch } from 'hooks/redux'
import { verifyLink, verifyLinkWithEmail } from 'store'
import Loading from 'components/views/Loading'

const LinkVerification = () => {
  const dispatch = useAppDispatch()

  const [emailRequired, setEmailRequired] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const { t } = useTranslation()

  // TODO clean up
  useLayoutEffect(() => {
    ;(async () => {
      try {
        const result = await dispatch(verifyLink()).unwrap()
        if (result) {
          navigate('/recipes')
        } else {
          setEmailRequired(true)
        }
      } catch (error) {
        console.log('error', error)
        const { code } = error as { message: string; code: string }
        if (code === 'auth/invalid-action-code') {
          setErrorMessage(t('_Sorry that link is no longer valid') || '')
        } else if (code === 'auth/invalid-email') {
          setEmailRequired(true)
        }
      }
    })()
  }, [dispatch, navigate, t])

  const login = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      await dispatch(verifyLinkWithEmail(email)).unwrap()
      navigate('/recipes')
    } catch (error) {
      console.log('error', error)
      setErrorMessage(t('_Sorry that link is no longer valid') || '')
    }
  }

  if (!emailRequired && !errorMessage) {
    return <Loading />
  }

  return (
    <CenterPage>
      {errorMessage && (
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                {t('_Invalid link')}
              </h1>
              <p className="mt-2 text-base text-gray-500">{errorMessage}</p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {t('_Send a new magic link')}
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
      {!errorMessage && emailRequired && (
        <div>
          <form className="mt-4 sm:flex sm:max-w-md" onSubmit={login}>
            <label htmlFor="email-address" className="sr-only">
              {t('_Email address')}
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
              placeholder={t('_Enter your email')}
              onChange={event => setEmail(event.target.value)}
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700"
              >
                {t('_Log in')}
              </button>
            </div>
          </form>
        </div>
      )}
    </CenterPage>
  )
}

export default LinkVerification
