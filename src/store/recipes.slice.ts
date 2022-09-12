import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import Recipe from 'models/Recipe'
import Ingredient from 'models/Ingredient'

import * as recipesApi from 'utils/api/recipes.api'

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

export const recipesInitialState: RecipesState = {
  byId: {},
  allIds: [],
  areFetched: false,
  metadataById: {},
}

export const fetchRecipes = createAsyncThunk<Recipe[]>(
  'recipes/fetch',
  async () => recipesApi.fetchAll()
)

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async (recipe: Recipe) => recipesApi.updateOne(recipe)
)

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async (recipe: Recipe) => recipesApi.createOne(recipe)
)

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (recipe: Recipe) => recipesApi.removeOne(recipe)
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
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      const recipes = action.payload
      state.byId = recipes.reduce(
        (acc, recipe) => ({ ...acc, [recipe.id]: recipe }),
        {}
      )
      state.allIds = recipes.map(r => r.id)
      state.areFetched = true
    })

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const recipe = action.meta.arg
      state.byId[recipe.id] = recipe
    })

    builder.addCase(addRecipe.fulfilled, (state, action) => {
      const recipe = action.meta.arg
      state.byId[recipe.id] = recipe

      state.allIds.push(recipe.id)
    })

    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const recipe = action.meta.arg
      delete state.byId[recipe.id]

      state.allIds = state.allIds.filter(id => id !== recipe.id)
    })
  },
})

export default recipesSlice.reducer

export const {
  setRecipeProgress,
  incrementServingCount,
  decrementServingCount,
} = recipesSlice.actions

export const areRecipesFetched = (state: RootState) => state.recipes.areFetched

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
