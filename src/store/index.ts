import { configureStore } from '@reduxjs/toolkit'

import recipes from './recipes.slice'

export const reducer = {
  recipes,
}

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

export * from './recipes.slice'
