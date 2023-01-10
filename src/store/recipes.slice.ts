import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import Recipe from 'models/Recipe'

import * as recipesApi from 'utils/api/recipes.api'

type Metadata = {
  recipeId: string
  currentStepIndex: number
  servingCount: number
}

export interface RecipesState {
  byId: Record<string, Recipe>
  areFetched: boolean
  metadataById: Record<string, Metadata>
  trashQueue: string[]
}

export const recipesInitialState: RecipesState = {
  byId: {},
  areFetched: false,
  metadataById: {},
  trashQueue: [],
}

export const fetchRecipes = createAsyncThunk<Recipe[]>(
  'recipes/fetch',
  async () => recipesApi.fetchAll()
)

export const fetchRecipeByLink = createAsyncThunk(
  'recipes/fetchByLink',
  async (link: string) => recipesApi.fetchOneByLink(link)
)

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async (recipe: Recipe) => recipesApi.updateOne(recipe)
)

export const importRecipe = createAsyncThunk(
  'recipes/import',
  async (url: string) => recipesApi.importOne(url)
)

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async (recipe: Recipe) => recipesApi.createOne(recipe)
)

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (recipe: Recipe) => {
    recipesApi.removeOne(recipe)
  }
)

export const deleteAllRecipes = createAsyncThunk(
  'recipes/deleteAll',
  async () => {
    recipesApi.removeAll()
  }
)

const timeouts: Record<string, NodeJS.Timeout> = {}

export const addRecipeToDeleteQueue = createAsyncThunk(
  'recipes/addToDeleteQueue',
  async (recipe: Recipe, thunkApi) => {
    timeouts[recipe.id] = setTimeout(() => {
      thunkApi.dispatch(deleteRecipe(recipe))
    }, 10000)
  }
)

export const cancelDeletion = createAsyncThunk(
  'recipes/cancelDelete',
  async (recipe: Recipe) => {
    clearTimeout(timeouts[recipe.id])
  }
)

export const confirmDeletion = createAsyncThunk(
  'recipes/confirmDelete',
  async (recipe: Recipe, thunkApi) => {
    clearTimeout(timeouts[recipe.id])
    await thunkApi.dispatch(deleteRecipe(recipe))
  }
)

const initializeMetadata = (state: RecipesState, recipeId: string) => {
  if (!state.metadataById[recipeId]) {
    state.metadataById[recipeId] = {
      recipeId,
      currentStepIndex: 0,
      servingCount: 42, //state.byId[recipeId].stats?.servings?.value,
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
      state.areFetched = true
    })

    builder.addCase(fetchRecipeByLink.fulfilled, (state, action) => {
      const recipe = action.payload
      state.byId[recipe.id] = recipe
    })

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const recipe = action.payload
      state.byId[recipe.id] = recipe
    })

    builder.addCase(addRecipe.fulfilled, (state, action) => {
      const recipe = action.payload
      state.byId[recipe.id] = recipe
    })

    builder.addCase(importRecipe.fulfilled, (state, action) => {
      const recipe = action.payload
      state.byId[recipe.id] = recipe
    })

    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const recipe = action.meta.arg
      delete state.byId[recipe.id]

      state.trashQueue = state.trashQueue.filter(id => id !== recipe.id)
    })

    builder.addCase(deleteAllRecipes.fulfilled, (state, action) => {
      state.byId = {}
    })

    builder.addCase(addRecipeToDeleteQueue.fulfilled, (state, action) => {
      const recipe = action.meta.arg

      state.trashQueue = [...state.trashQueue, recipe.id]
    })

    builder.addCase(cancelDeletion.fulfilled, (state, action) => {
      const recipe = action.meta.arg

      state.trashQueue = state.trashQueue.filter(id => id !== recipe.id)
    })

    builder.addCase(confirmDeletion.fulfilled, (state, action) => {
      const recipe = action.meta.arg

      state.trashQueue = state.trashQueue.filter(id => id !== recipe.id)
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
  (state: RootState) => state.recipes.byId,
  (state: RootState) => state.recipes.trashQueue,
  (byId, trashQueue) =>
    Object.values(byId).filter(recipe => !trashQueue.includes(recipe.id))
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

export const getRecipesToDelete = createSelector(
  (state: RootState) => state.recipes.byId,
  (state: RootState) => state.recipes.trashQueue,
  (byId, trashQueue) => trashQueue.map(id => byId[id])
)

const sortByCount = (a: [string, number], b: [string, number]) => b[1] - a[1]

export const getAllKeywordSortedByFrequency = createSelector(
  getRecipeList,
  recipeList => {
    const keywords = Object.entries(
      recipeList
        .flatMap(r => r.keywords)
        .reduce(
          (acc: Record<string, number>, keyword: string) => ({
            ...acc,
            [keyword]: (acc[keyword] || 0) + 1,
          }),
          {}
        )
    )

    return keywords
      .filter((k: [string, number]) => k[1] >= 3)
      .sort(sortByCount)
      .map(k => k[0])
      .slice(0, 7)
  }
)

// export const getIngredientList = createSelector(
//   getRecipe,
//   (state: RootState, id: string | undefined) =>
//     state.recipes.metadataById[cleanId(id)]?.servingCount,
//   (recipe, servingCount): Ingredient[] => {
//     if (!recipe) {
//       return []
//     }

//     if (!servingCount) {
//       return recipe.ingredients
//     }

//     const ratio = servingCount / recipe.stats.servings.value

//     return recipe.ingredients.map(ingredient => ({
//       name: ingredient.name,
//       measure: {
//         ...ingredient.measure,
//         value: ingredient.measure.value * ratio,
//       },
//     }))
//   }
// )
