import { configureStore } from '@reduxjs/toolkit'

import recipes from './recipes.slice'

const store = configureStore({
  reducer: { recipes }
})

export default store

export * from './recipes.slice'
