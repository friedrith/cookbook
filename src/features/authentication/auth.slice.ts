import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

import User from 'features/authentication/types/User'

export interface AuthState {
  error: string | null
  user: User | null
  loading: boolean
}

export const authInitialState: AuthState = {
  error: null,
  user: null,
  loading: true,
}

// export const deleteAccount = createAsyncThunk('auth/deleteAccount', async () =>
//   firebaseApi.deleteAccount(),
// )

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.loading = false
    },
    logout: state => {
      state.user = null
      state.loading = false
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

const getAuthState = (state: RootState) => state.auth

export const getCurrentUser = (state: RootState) => getAuthState(state).user

export const isUserLoggedIn = (state: RootState) =>
  Boolean(!getAuthState(state).loading && getCurrentUser(state))

export const isUserLoggedOut = (state: RootState) =>
  Boolean(!getAuthState(state).loading && !getCurrentUser(state))
