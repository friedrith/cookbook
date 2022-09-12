import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

import Roles from 'models/Roles'

import { setToken } from '../api'

export const convertUser = (user: any) => ({
  id: user.uid,
  email: user.email,
  role: Roles.User,
})

// https://firebase.google.com/docs/auth/web/email-link-auth?authuser=1&hl=fr
export const signInWithMagicLink = async (email: string) => {
  const actionCodeSettings = {
    url: process.env.REACT_APP_MAGIC_LINK_URL || '',
    // This must be true.
    handleCodeInApp: true,
  }

  const auth = getAuth()
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)

  window.localStorage.setItem('emailForSignIn', email)
}

export const verifyLink = async () => {
  const auth = getAuth()
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      return false
    }

    return await verifyLinkWithEmail(email || '')
  }
}

export const verifyLinkWithEmail = async (email: string) => {
  const auth = getAuth()

  const user = await signInWithEmailLink(auth, email, window.location.href)

  return convertUser(user)
}

export const logout = async () => {
  const auth = getAuth()
  return await signOut(auth)
}

export const initSession = async () => {
  // https://firebase.google.com/docs/auth/web/auth-state-persistence
  const auth = getAuth()
  await setPersistence(auth, browserLocalPersistence)

  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken()

    setToken(token)

    return convertUser(auth.currentUser)
  }
  return null
}
