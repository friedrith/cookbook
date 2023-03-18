import { renderHook } from '@testing-library/react'
import useFuse from '../../features/search/hooks/useFuse'

const aRecipe = (
  name: string,
  keywords = [],
  ingredients = '',
  steps = '',
) => ({
  id: 'foo',
  name,
  ingredients,
  steps,
  imageUrl: '',
  stats: {},
  createdAt: null,
})

describe('useFuse', () => {
  it('should return cookies', () => {
    const recipe1 = aRecipe('Ultimate Chocolate Chip Cookies')
    const recipes = [recipe1]

    const { result } = renderHook(() => useFuse(recipes, 'cookies'))

    expect(result.current).toEqual([recipe1])
  })
})
