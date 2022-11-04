import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import Temperature, { convertToTemperature } from 'models/Temperature'

export interface SettingsState {
  temperature: Temperature
  ingredientTemplate: string
}

export const settingsInitialState: SettingsState = {
  temperature:
    convertToTemperature(localStorage.getItem('temperature') || '') ||
    Temperature.Unknown,
  ingredientTemplate: localStorage.getItem('ingredientTemplate') || '',
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
  },
})

export default settingsSlice.reducer

export const { setTemperature, setIngredientTemplate } = settingsSlice.actions

export const getTemperature = (state: RootState) => state.settings.temperature

export const getIngredienTemplate = (state: RootState) =>
  state.settings.ingredientTemplate
