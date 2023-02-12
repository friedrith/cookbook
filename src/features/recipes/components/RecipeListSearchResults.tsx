import { useTranslation } from 'react-i18next'

import Recipe from '@/models/Recipe'
import RecipeListSection from '@/features/recipes/components/RecipeListSection'
import useFuse from '@/features/search/hooks/useFuse'
import NoRecipeList from '@/features/recipes/components/NoRecipeList'
import EmptyMessage from '@/components/atoms/EmptyMessage'
import { useAppDispatch } from '@/hooks/redux'
import { addRecentSearch } from '@/features/recipes/recipes.slice'
import { firstLetterUppercase } from '@/utils/string'
import useSearch from '@/features/search/hooks/useSearch'
import SearchStatus from '@/features/search/types/SearchStatus'

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
