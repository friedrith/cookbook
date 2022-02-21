import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

export const recipesInitialState = {
  fetched: false,
  byId: {},
  listOfIds: []
}

export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
  return [
    { id: 'foo', title: 'Recipe 1', keywords: ['tag1', 'tag2'] },
    { id: 'fo2', title: 'Recipe 2', keywords: ['tag1', 'tag2'] }
  ]
})

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesInitialState,
  reducers: {
    // setRecipes: (state, { payload }) => {
    //   state.fetched = true
    //   state.byId = payload.reduce((acc, recipe) => ({ ...acc, [recipe.id]: recipe }), {})
    //   state.listOfIds = payload.map(recipe => recipe.id)
    // }
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchRecipes.fulfilled, (state, { payload }) => {
      state.fetched = true
      state.byId = payload.reduce((acc, recipe) => ({ ...acc, [recipe.id]: recipe }), {})
      state.listOfIds = payload.map(recipe => recipe.id)
    })
  }
})

export default recipesSlice.reducer

export const getListOfRecipes = createSelector(
  state => state.recipes.listOfIds,
  state => state.recipes.byId,
  (listOfIds, byId) => listOfIds.map(id => byId[id])
)

export const areRecipesFetched = state => state.recipes.fetched

export const getRecipe = id => state => state.recipes.byId[id]
