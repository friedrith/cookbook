import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  setPersistence,
  deleteUser,
  browserLocalPersistence,
} from 'firebase/auth'

import Roles from 'models/Roles'

import { setToken } from '../api'

export const convertUser = (user: any) => ({
  id: user.uid,
  email: user.email,
  role: Roles.User,
})

const EMAIL_FOR_SIGN_IN = 'emailForSignIn'

// https://firebase.google.com/docs/auth/web/email-link-auth?authuser=1&hl=fr
export const signInWithMagicLink = async (email: string) => {
  const actionCodeSettings = {
    url: `${process.env.REACT_APP_URL}/verify-link` || '',
    // This must be true.
    handleCodeInApp: true,
  }

  window.localStorage.setItem(EMAIL_FOR_SIGN_IN, email)

  const auth = getAuth()
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
}

export const verifyLink = async () => {
  const auth = getAuth()
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem(EMAIL_FOR_SIGN_IN)
    if (!email) {
      return null
    }

    const user = await verifyLinkWithEmail(email || '')

    window.localStorage.removeItem(EMAIL_FOR_SIGN_IN)

    return user
  }

  return null
}

const retrieveToken = async () => {
  const auth = getAuth()
  if (!auth.currentUser) {
    console.error('auth', auth)
    throw new Error('Impossible to retrieve token')
  }
  const token = await auth.currentUser.getIdToken()
  setToken(token)
}

export const verifyLinkWithEmail = async (email: string) => {
  const auth = getAuth()

  await signInWithEmailLink(auth, email, window.location.href)

  await retrieveToken()
  return convertUser(auth.currentUser)
}

export const logout = async () => {
  const auth = getAuth()
  return await signOut(auth)
}

export const initSession = async () => {
  // https://firebase.google.com/docs/auth/web/auth-state-persistence
  const auth = getAuth()
  await setPersistence(auth, browserLocalPersistence)

  await retrieveToken()
  return convertUser(auth.currentUser)
}

export const deleteAccount = async () => {
  const auth = getAuth()
  if (auth.currentUser) {
    await deleteUser(auth.currentUser)
  }
}