import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

initializeApp(firebaseConfig)

export const convertUser = (user: any) => ({
  id: user.uid,
  email: user.email,
  role: user.role || 'user',
})

// https://firebase.google.com/docs/auth/web/email-link-auth?authuser=1&hl=fr
export const signInWithMagicLink = async (email: string) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/verify-link',
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

  console.log('user', user)

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
    return convertUser(auth.currentUser)
  }
  return null
}
