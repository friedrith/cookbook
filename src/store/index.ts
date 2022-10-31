import { configureStore } from '@reduxjs/toolkit'

import recipes from './recipes.slice'
import auth from './auth.slice'
import settings from './settings.slice'

export const reducer = {
  recipes,
  auth,
  settings,
}

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

export * from './recipes.slice'
export * from './auth.slice'
export * from './settings.slice'
