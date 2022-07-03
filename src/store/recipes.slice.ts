import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import Recipe from 'models/Recipe'
import Ingredient from 'models/Ingredient'

import { recipes } from '../mock'

type Metadata = {
  recipeId: string
  currentStepIndex: number
  servingCount: number
}

export interface RecipesState {
  byId: Record<string, Recipe>
  allIds: string[]
  areFetched: boolean
  metadataById: Record<string, Metadata>
}

const allRecipes = recipes()

export const recipesInitialState: RecipesState = {
  byId: allRecipes,
  allIds: Object.keys(allRecipes),
  areFetched: false,
  metadataById: {},
}

// const fetchUserById = createAsyncThunk(
//   'recipes/fetch',
//   async (userId: number, thunkAPI) => {
//     const response = await userAPI.fetchById(userId)
//     return response.data
//   }
// )

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async (recipe: Recipe, thunkAPI) => {
    // const response = await userAPI.fetchById(userId)
    // return response.data

    return 'foo'
  }
)

const initializeMetadata = (state: RecipesState, recipeId: string) => {
  if (!state.metadataById[recipeId]) {
    state.metadataById[recipeId] = {
      recipeId,
      currentStepIndex: 0,
      servingCount: state.byId[recipeId].stats.servings.value,
    }
  }
}

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesInitialState,
  reducers: {
    setRecipeProgress: (state, action) => {
      const { recipeId, index } = action.payload

      initializeMetadata(state, recipeId)

      state.metadataById[recipeId].currentStepIndex = index
    },
    incrementServingCount: (state, action) => {
      const recipeId = action.payload

      initializeMetadata(state, recipeId)

      state.metadataById[recipeId].servingCount += 1
    },
    decrementServingCount: (state, action) => {
      const recipeId = action.payload

      initializeMetadata(state, recipeId)

      if (state.metadataById[recipeId].servingCount > 1) {
        state.metadataById[recipeId].servingCount -= 1
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const recipe = action.meta.arg
      state.byId[recipe.id] = recipe
    })
  },
})

export default recipesSlice.reducer

export const {
  setRecipeProgress,
  incrementServingCount,
  decrementServingCount,
} = recipesSlice.actions

export const getRecipeList = createSelector(
  (state: RootState) => state.recipes.allIds,
  (state: RootState) => state.recipes.byId,
  (allIds, byId) => allIds.map(id => byId[id])
)

const cleanId = (id: string | undefined) => (id === undefined ? '' : id)

export const getRecipe = (
  state: RootState,
  id: string | undefined
): Recipe | undefined => state.recipes.byId[cleanId(id)]

export const getRecipeProgress = (
  state: RootState,
  id: string | undefined
): number => state.recipes.metadataById[cleanId(id)]?.currentStepIndex || 0

export const getServingCount = createSelector(
  getRecipe,
  (state: RootState, id: string | undefined) =>
    state.recipes.metadataById[cleanId(id)]?.servingCount,
  (recipe, servingCount) => servingCount || recipe?.stats?.servings?.value || 0
)

export const getIngredientList = createSelector(
  getRecipe,
  (state: RootState, id: string | undefined) =>
    state.recipes.metadataById[cleanId(id)]?.servingCount,
  (recipe, servingCount): Ingredient[] => {
    if (!recipe) {
      return []
    }

    if (!servingCount) {
      return recipe.ingredients
    }

    const ratio = servingCount / recipe.stats.servings.value

    return recipe.ingredients.map(ingredient => ({
      name: ingredient.name,
      measure: {
        ...ingredient.measure,
        value: ingredient.measure.value * ratio,
      },
    }))
  }
)
