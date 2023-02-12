import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import Temperature from '@/features/units/types/Temperature'

export interface SettingsState {
  temperature: Temperature
  ingredientTemplate: string
  automaticImport: boolean
  isVoiceControlEnabled: boolean
  isGestureControlEnabled: boolean
  cookingModeActivatedOnce: boolean
}

export const settingsInitialState: SettingsState = {
  temperature: Temperature.Unknown,
  ingredientTemplate: '',
  automaticImport: false,
  isVoiceControlEnabled: true,
  isGestureControlEnabled: true,
  cookingModeActivatedOnce: false,
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
    enableVoiceControl: (state, action) => {
      state.isVoiceControlEnabled = action.payload
    },
    enableGestureControl: (state, action) => {
      state.isGestureControlEnabled = action.payload
    },
    cookingModeActivated: state => {
      state.cookingModeActivatedOnce = true
    },
  },
})

export default settingsSlice.reducer

export const {
  setTemperature,
  setIngredientTemplate,
  setAutomaticimport,
  enableVoiceControl,
  enableGestureControl,
  cookingModeActivated,
} = settingsSlice.actions

export const getTemperature = (state: RootState) => state.settings.temperature

export const getIngredienTemplate = (state: RootState) =>
  state.settings.ingredientTemplate

export const getAutomaticImport = (state: RootState) =>
  state.settings.automaticImport

export const getVoiceControlEnabled = (state: RootState) =>
  state.settings.isVoiceControlEnabled

export const getGestureControlEnabled = (state: RootState) =>
  state.settings.isGestureControlEnabled

export const getCookingModeActivatedOnce = (state: RootState) =>
  state.settings.cookingModeActivatedOnce
