import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector } from 'hooks/redux'
import { getRecipe } from 'store'
import parseRecipe from 'features/recipes/utils/parseRecipe'
import Recipe, { FormattedRecipe } from 'types/Recipe'

const useCurrentRecipe = (): [Recipe | undefined, FormattedRecipe | null] => {
  const { recipeId } = useParams()

  const recipe = useAppSelector(state => getRecipe(state, recipeId))

  return useMemo(() => [recipe, recipe ? parseRecipe(recipe) : null], [recipe])
}

export default useCurrentRecipe
