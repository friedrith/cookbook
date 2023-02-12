import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { GetServerSideProps } from 'next'

import { useAppDispatch } from '@/hooks/redux'
import { loginWithMagicLink } from '@/store'
import LoginPage from '@/components/templates/LoginPage'
// import { track } from '@/utils/services/tracking'
import Button from '@/components/atoms/Button'
import { getClosestLocale } from '@/utils/services/locales'

const Login = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault()

    // dispatch(loginWithMagicLink(email))
    // track('Login')

    router.push({ pathname: '/waiting-for-link', query: { email } })
  }

  return (
    <LoginPage title={t('login._Log in')}>
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
        </div>
      </div>
    </LoginPage>
  )
}

// https://stackoverflow.com/questions/69101425/can-you-forward-a-locale-to-a-language-in-nextjs-i18n
// https://stackoverflow.com/questions/67502005/how-to-force-next-js-to-always-redirect-to-a-preferred-user-language
// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   locale,
//   defaultLocale,
// }) => {
//   const closestLocale = getClosestLocale(req, defaultLocale)

//   return {
//     props: {
//       ...(await serverSideTranslations(closestLocale, [
//         'common',
//         'marketing',
//         'faq',
//         'help',
//       ])),
//       // Will be passed to the page component as props
//     },
//   }
// }

export default Login
