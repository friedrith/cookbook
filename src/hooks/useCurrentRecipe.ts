import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '~/src/hooks/redux'
import { getRecipe } from '~/src/store/index'
import parseRecipe from '~/src/features/recipes/utils/parseRecipe'
import Recipe, { FormattedRecipe } from '~/src/types/Recipe'

const useCurrentRecipe = (): [Recipe | undefined, FormattedRecipe | null] => {
  const { recipeId } = useParams()

  const recipe = useAppSelector(state => getRecipe(state, recipeId))

  return useMemo(() => [recipe, recipe ? parseRecipe(recipe) : null], [recipe])
}

export default useCurrentRecipe
