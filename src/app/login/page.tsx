'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/hooks/redux'
import { loginWithMagicLink } from '@/store'
import Button from '@/components/atoms/Button'

const LoginPage = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault()

    // router.push(`login/waiting-for-link?${new URLSearchParams({ email })}`)
    router.push(`login/waiting-for-code?${new URLSearchParams({ email })}`)
  }

  return (
    <>
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        {t('login._Log in')}
      </h2>
      <div className="mt-8">
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
              {t('login._Log in')}
            </Button.Primary>
          </div>
        </form>
      </div>
      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or sign with</span>
        </div>
      </div> */}
      {/* <div className="flex flex-row gap-x-4">
        <Button.White className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-3.5 mr-2 text-white"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign in with Google
        </Button.White>
        <Button.White className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            className="h-3.5 mr-2 mb-0.5 text-black"
            viewBox="0 0 814 1000"
          >
            <path
              className="fill-black"
              d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
            />
          </svg>
          Sign in with Apple
        </Button.White>
      </div> */}
    </>
  )
}

export default LoginPage
