import { useMemo } from 'react'
import { EmailCodeFactor } from '@clerk/types'
import { useSignIn, useAuth } from '@clerk/nextjs'

const useAuthentication = () => {
  const { isLoaded, signIn, setSession } = useSignIn()
  const { signOut, isSignedIn } = useAuth()

  return useMemo(
    () => ({
      sendVerificationCode: async (email: string) => {
        if (!isLoaded) {
          throw new Error('not loaded')
        }

        const signInAttempt = await signIn.create({
          identifier: email,
        })

        const emailCodeFactor = signInAttempt.supportedFirstFactors.find(
          factor => factor.strategy === 'email_code',
        ) as EmailCodeFactor

        await signInAttempt.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId: emailCodeFactor.emailAddressId,
        })
      },
      checkVerificationCode: async (code: string) => {
        if (!isLoaded) {
          throw new Error('not loaded')
        }

        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code,
        })
        if (signInAttempt.status !== 'complete') {
          throw new Error(signInAttempt.status ?? '')
        }
        setSession(signInAttempt.createdSessionId)
      },
      logout: async () => {
        signOut()
      },
      isSignedIn,
    }),
    [isLoaded, signIn, signOut, isSignedIn, setSession],
  )
}

export default useAuthentication
