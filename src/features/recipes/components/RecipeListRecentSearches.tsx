import { useTranslation } from 'react-i18next'

import Recipe from 'models/Recipe'
import RecipeListSection from 'features/recipes/components/RecipeListSection'

import { useAppSelector } from 'hooks/redux'
import { getRecentSearches } from '../recipes.slice'
import RecipeListAll from './RecipeListAll'

interface Props {
  recipes: Recipe[]
}

const RecipeListRecentSearches = ({ recipes }: Props) => {
  const { t } = useTranslation()

  const recentSearches = useAppSelector(getRecentSearches)

  return (
    <>
      {recentSearches.length > 0 ? (
        <RecipeListSection
          title={t('_Recent Searches')}
          recipes={recentSearches}
        />
      ) : (
        <RecipeListAll recipes={recipes} />
      )}
    </>
  )
}

export default RecipeListRecentSearches
