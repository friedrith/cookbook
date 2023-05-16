import { useTranslation } from 'react-i18next'

import Recipe from '~/src/types/Recipe'
import RecipeListSection from '~/src/features/recipes/components/RecipeListSection'
import useFuse from '~/src/features/search/hooks/useFuse'
import NoRecipeList from '~/src/features/recipes/components/NoRecipeList'
import EmptyMessage from '~/src/components/atoms/EmptyMessage'
import { useAppDispatch } from '~/src/hooks/redux'
import { addRecentSearch } from '~/src/features/recipes/recipes.slice'
import { firstLetterUppercase } from '~/src/utils/string'
import useSearch from '~/src/features/search/useSearch'
import SearchStatus from '~/src/features/search/types/SearchStatus'

interface Props {
  recipes: Recipe[]
}

const RecipeListSearchResults = ({ recipes }: Props) => {
  const { t } = useTranslation()

  const { query, searchStatus } = useSearch()

  const searchedRecipes = useFuse(recipes, query || '')

  const dispatch = useAppDispatch()

  if (typeof query !== 'string') return <></>

  return searchedRecipes.length > 0 ? (
    <RecipeListSection
      title={
        searchStatus === SearchStatus.Category
          ? t(`_Category's Recipes`, {
              category: firstLetterUppercase(query.slice(1).toLowerCase()),
            })
          : t('_Results')
      }
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
