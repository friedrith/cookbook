import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import Temperature from 'models/Temperature'

export interface SettingsState {
  temperature: Temperature
  ingredientTemplate: string
  automaticImport: boolean
}

export const settingsInitialState: SettingsState = {
  temperature: Temperature.Unknown,
  ingredientTemplate: '',
  automaticImport: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsInitialState,
  reducers: {
    setTemperature: (state, action) => {
      state.temperature = action.payload
    },
    setIngredientTemplate: (state, action) => {
      state.ingredientTemplate = action.payload
    },
    setAutomaticimport: (state, action) => {
      state.automaticImport = action.payload
    },
  },
})

export default settingsSlice.reducer

export const { setTemperature, setIngredientTemplate, setAutomaticimport } =
  settingsSlice.actions

export const getTemperature = (state: RootState) => state.settings.temperature

export const getIngredienTemplate = (state: RootState) =>
  state.settings.ingredientTemplate

export const getAutomaticImport = (state: RootState) =>
  state.settings.automaticImport
