import { renderHook } from '@testing-library/react'
import useFuse from '../../features/search/hooks/useFuse'
import Recipe from '~src/types/Recipe'

const aRecipe = (
  name: string,
  keywords = [],
  ingredients = '',
  steps = '',
): Recipe => ({
  id: 'foo',
  name,
  ingredients,
  steps,
  imageUrl: '',
  stats: {},
  createdAt: null,
  keywords,
})

describe('useFuse', () => {
  it('should return cookies', () => {
    const recipe1 = aRecipe('Ultimate Chocolate Chip Cookies')
    const recipes = [recipe1]

    const { result } = renderHook(() => useFuse(recipes, 'cookies'))

    expect(result.current).toEqual([recipe1])
  })
})
