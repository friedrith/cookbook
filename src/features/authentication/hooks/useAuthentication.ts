import { useMemo, useCallback, useEffect } from 'react'
import { EmailCodeFactor } from '@clerk/types'
import { useSignIn, useAuth, useUser } from '@clerk/clerk-react'
import { logout, login } from 'store'
import { useAppDispatch } from 'hooks/redux'
import * as firebaseApi from '../utils/firebaseAuth'

const useAuthentication = () => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const { signOut, isSignedIn, getToken } = useAuth()
  const { user } = useUser()

  const dispatch = useAppDispatch()

  // https://clerk.dev/docs/integration/firebase
  const linkToFirebase = useCallback(async () => {
    const email = user?.primaryEmailAddress?.emailAddress ?? ''
    try {
      const token = await getToken({ template: 'integration_firebase' })
      console.log('token', token)
      if (token) {
        const authenticatedUser = await firebaseApi.signIn(token, email)
        dispatch(login(authenticatedUser))
      } else {
        dispatch(logout())
      }
    } catch (error) {
      dispatch(logout())
    }
  }, [getToken, dispatch, user])

  useEffect(() => {
    linkToFirebase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

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

        const { status, createdSessionId } = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code,
        })
        if (status !== 'complete') {
          throw new Error(status ?? '')
        }
        console.log('createdSessionId', createdSessionId)
        setActive({ session: createdSessionId })
      },
      checkSession: async () => {},
      logout: async () => {
        await signOut()
        await firebaseApi.logout()
        dispatch(logout())
      },
      isSignedIn,
    }),
    [isLoaded, signIn, signOut, isSignedIn, setActive, dispatch],
  )
}

export default useAuthentication
