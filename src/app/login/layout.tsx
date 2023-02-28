'use client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import {
  ClerkProvider,
  useUser,
  SignIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs'

import BackButton from '@/components/molecules/BackButton'
import Page from '@/components/templates/Page'

import useWhenAuthenticated from '@/features/authentication/useWhenAuthenticated'

type Props = {
  children: React.ReactNode
}

const PortalPage = ({ children }: Props) => {
  const router = useRouter()

  const goToRecipesPage = useCallback(() => {
    console.log('goToRecipesPage', goToRecipesPage)
    router.push('/recipes')
  }, [router])

  useWhenAuthenticated(goToRecipesPage)

  const { t } = useTranslation()

  // const { isSignedIn } = useAuth()

  return (
    <Page>
      <div className="min-h-screen fixed flex w-full">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <BackButton
              url="/"
              className="fixed top-5 left-5 lg:top-10 lg:left-10"
              title={t('_Back to landing page')}
            />
            {children}
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752"
            alt=""
            fill
            priority
          />
        </div>
      </div>
    </Page>
  )
}

export default PortalPage
