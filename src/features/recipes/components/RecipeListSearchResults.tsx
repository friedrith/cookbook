import { useTranslation } from 'react-i18next'

import Recipe from 'models/Recipe'
import RecipeListSection from 'features/recipes/components/RecipeListSection'
import useFuse from 'hooks/useFuse'
import NoRecipeList from 'features/recipes/components/NoRecipeList'
import EmptyMessage from 'components/atoms/EmptyMessage'
import { useAppDispatch } from 'hooks/redux'
import { addRecentSearch } from 'features/recipes/recipes.slice'

interface Props {
  recipes: Recipe[]
  query: string
}

const RecipeListSearchResults = ({ recipes, query }: Props) => {
  const { t } = useTranslation()

  const searchedRecipes = useFuse(recipes, query)

  const dispatch = useAppDispatch()

  return searchedRecipes.length > 0 ? (
    <RecipeListSection
      title={t('_Results')}
      recipes={searchedRecipes}
      onClick={recipe => {
        dispatch(addRecentSearch(recipe))
      }}
    />
  ) : (
    <NoRecipeList>
      <EmptyMessage
        title={t('_No Recipes found')}
        message={t('_Try a different search.')}
      />
    </NoRecipeList>
  )
}

export default RecipeListSearchResults
