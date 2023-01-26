import Recipe from 'models/Recipe'
import { SettingsState } from 'store/settings.slice'

export type PersistedState = {
  settings: SettingsState
  recipes: { byId: { [id: string]: Recipe }; recentSearches: string[] }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const persistState = (state: PersistedState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}
