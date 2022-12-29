import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

import * as firebaseApi from 'utils/api/firebase'
import User from 'models/User'

export interface AuthState {
  magicLinkSent: boolean
  error: string | null
  emailUsed: string | null
  user: User | null
  isUserFetched: boolean
}

export const authInitialState: AuthState = {
  magicLinkSent: false,
  error: null,
  emailUsed: null,
  user: null,
  isUserFetched: false,
}

export const loginWithMagicLink = createAsyncThunk(
  'auth/login',
  async (email: string) => firebaseApi.signInWithMagicLink(email)
)

export const verifyLink = createAsyncThunk('auth/verifyLink', async () =>
  firebaseApi.verifyLink()
)

export const verifyLinkWithEmail = createAsyncThunk(
  'auth/verifyLink',
  async (email: string) => firebaseApi.verifyLinkWithEmail(email)
)

export const logout = createAsyncThunk('auth/logout', async () =>
  firebaseApi.logout()
)

export const deleteAccount = createAsyncThunk('auth/deleteAccount', async () =>
  firebaseApi.deleteAccount()
)

export const initSession = createAsyncThunk('auth/init', async () =>
  firebaseApi.initSession()
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginWithMagicLink.fulfilled, (state, action) => {
      state.magicLinkSent = true
      state.emailUsed = action.meta.arg
      state.isUserFetched = true
    })

    builder.addCase(loginWithMagicLink.rejected, (state, action) => {
      state.magicLinkSent = true
      state.isUserFetched = true
    })

    builder.addCase(verifyLink.fulfilled, (state, action) => {
      state.user = action.payload || null
      state.isUserFetched = Boolean(action.payload)
    })

    builder.addCase(verifyLink.rejected, (state, action) => {
      state.user = null
      state.isUserFetched = true
    })

    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null
      state.isUserFetched = true
    })

    builder.addCase(logout.rejected, (state, action) => {
      state.user = null
      state.isUserFetched = true
    })

    builder.addCase(initSession.fulfilled, (state, action) => {
      state.isUserFetched = true
      state.user = action.payload
    })

    builder.addCase(initSession.rejected, (state, action) => {
      state.isUserFetched = true
    })
  },
})

export default authSlice.reducer

const getAuthState = (state: RootState) => state.auth

export const getEmailUsed = (state: RootState) => getAuthState(state).emailUsed

export const getCurrentUser = (state: RootState) => getAuthState(state).user

export const isCurrentUserFetched = (state: RootState) =>
  getAuthState(state).isUserFetched && getCurrentUser(state)

export const isUserLoggedIn = (state: RootState) =>
  getAuthState(state).isUserFetched && getCurrentUser(state)

export const isUserLoggedOut = (state: RootState) =>
  getAuthState(state).isUserFetched && !getCurrentUser(state)
