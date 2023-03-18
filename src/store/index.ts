import { configureStore } from '@reduxjs/toolkit'
import { throttle } from 'lodash'

import recipes, { recipesInitialState } from 'features/recipes/recipes.slice'
import auth, { authInitialState } from 'features/authentication/auth.slice'
import settings, { settingsInitialState } from './settings.slice'
import officialWebsites, {
  officialWebsitesInitialState,
} from './officialWebsites'
import timersSlice from 'features/timers/timers.slice'
import { persistState, loadState } from 'utils/services/localStorage'

export const reducer = {
  recipes,
  auth,
  settings,
  officialWebsites,
  timers: timersSlice.reducer,
}

const initialState = {
  recipes: recipesInitialState,
  // auth: authInitialState,
  settings: settingsInitialState,
  officialWebsites: officialWebsitesInitialState,
}

const persistedState = loadState()
const preloadedState = persistedState
  ? {
      ...initialState,
      // auth: persistedState.auth,
      settings: persistedState.settings,
      recipes: {
        ...initialState.recipes,
        byId: persistedState.recipes.byId,
        recentSearches: persistedState.recipes.recentSearches,
      },
    }
  : initialState

const store = configureStore({
  reducer,
  preloadedState,
})

store.subscribe(
  throttle(() => {
    persistState({
      // auth: store.getState().auth,
      settings: store.getState().settings,
      recipes: {
        byId: store.getState().recipes.byId,
        recentSearches: store.getState().recipes.recentSearches,
      },
    })
  }, 1000),
)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

export * from 'features/recipes/recipes.slice'
export * from '../features/authentication/auth.slice'
export * from './settings.slice'
export * from 'features/timers/timers.slice'
