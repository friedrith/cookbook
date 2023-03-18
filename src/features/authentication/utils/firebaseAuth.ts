import {
  getAuth,
  signInWithEmailLink,
  signOut,
  setPersistence,
  deleteUser,
  browserLocalPersistence,
  signInWithCustomToken,
  updateEmail,
} from 'firebase/auth'

import Roles from 'models/Roles'

import { setToken } from '../../../utils/api/api'

import '../../../utils/api/firebase/init'

export const convertUser = (user: any) => ({
  id: user.uid,
  email: user.email,
  role: Roles.User,
})

// TODO clear unused functions

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

export const signIn = async (token: string, email: string) => {
  const auth = getAuth()

  await signInWithCustomToken(auth, token)
  if (auth.currentUser) {
    await updateEmail(auth.currentUser, email)
  }

  await retrieveToken()
  return convertUser({ ...auth.currentUser, email })
}

export const initSession = async () => {
  // https://firebase.google.com/docs/auth/web/auth-state-persistence
  const auth = getAuth()
  // await setPersistence(auth, browserLocalPersistence)

  await retrieveToken()
  return convertUser(auth.currentUser)
}

export const deleteAccount = async () => {
  const auth = getAuth()
  if (auth.currentUser) {
    await deleteUser(auth.currentUser)
  }
}
