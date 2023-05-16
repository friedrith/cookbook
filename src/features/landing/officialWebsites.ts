import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '~/src/store/index'

import * as officialWebsitesApi from '~/src/features/landing/officialWebsites.api'

export interface OfficialWebsitesState {
  list: string[]
}

export const officialWebsitesInitialState: OfficialWebsitesState = {
  list: [],
}

export const fetchOfficialWebsites = createAsyncThunk<string[]>(
  'officialWebsites/fetch',
  async () => officialWebsitesApi.fetchAll(),
)

export const officialWebsitesSlice = createSlice({
  name: 'officialWebsites',
  initialState: officialWebsitesInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOfficialWebsites.fulfilled, (state, action) => {
      state.list = action.payload.sort((a, b) => a.localeCompare(b))
    })
  },
})

export default officialWebsitesSlice.reducer

export const getOfficialWebsites = (state: RootState) =>
  state.officialWebsites.list
