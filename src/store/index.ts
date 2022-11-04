import { configureStore } from '@reduxjs/toolkit'
import { throttle } from 'lodash'

import recipes, { recipesInitialState } from './recipes.slice'
import auth, { authInitialState } from './auth.slice'
import settings, { settingsInitialState } from './settings.slice'
import officialWebsites, {
  officialWebsitesInitialState,
} from './officialWebsites'
import { persistState, loadState } from 'utils/services/localStorage'

export const reducer = {
  recipes,
  auth,
  settings,
  officialWebsites,
}

const initialState = {
  recipes: recipesInitialState,
  auth: authInitialState,
  settings: settingsInitialState,
  officialWebsites: officialWebsitesInitialState,
}

const persistedState = loadState()
const preloadedState = persistedState
  ? {
      ...initialState,
      settings: persistedState.settings,
      recipes: { ...initialState.recipes, byId: persistedState.recipes.byId },
    }
  : initialState

const store = configureStore({
  reducer,
  preloadedState,
})

store.subscribe(
  throttle(() => {
    persistState({
      settings: store.getState().settings,
      recipes: { byId: store.getState().recipes.byId },
    })
  }, 1000)
)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

export * from './recipes.slice'
export * from './auth.slice'
export * from './settings.slice'
