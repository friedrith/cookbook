import { createSelector } from '@reduxjs/toolkit'
import { getAllKeywordSortedByFrequency, getRecipeList } from 'store'
import categories from './categories'

export const getAvailableCategories = createSelector(
  getAllKeywordSortedByFrequency,
  keywords => categories.filter(c => keywords.includes(c.name)),
)

export const getUnusedCategories = createSelector(getRecipeList, recipes =>
  categories.filter(c => !recipes.some(r => r.keywords.includes(c.name))),
)
