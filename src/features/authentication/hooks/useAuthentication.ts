import { useEffect, useMemo, useCallback } from 'react'
import { EmailCodeFactor } from '@clerk/types'
import { useSignIn, useAuth } from '@clerk/nextjs'
import { getAuth, signInWithCustomToken } from 'firebase/auth'

const useAuthentication = () => {
  const { isLoaded, signIn, setSession } = useSignIn()
  const { signOut, isSignedIn, getToken } = useAuth()

  // https://clerk.dev/docs/integration/firebase
  const linkToFirebase = useCallback(async () => {
    const auth = getAuth()
    const token = await getToken({ template: 'integration_firebase' })
    if (token) {
      const userCredentials = await signInWithCustomToken(auth, token)
      console.log('userCredentials', userCredentials)
    }
  }, [getToken])

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
        await linkToFirebase()
      },
      checkSession: async () => {
        await linkToFirebase()
      },
      logout: async () => {
        signOut()
      },
      isSignedIn,
    }),
    [isLoaded, signIn, signOut, isSignedIn, setSession, linkToFirebase],
  )
}

export default useAuthentication
