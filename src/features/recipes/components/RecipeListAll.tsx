import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Recipe from 'models/Recipe'
import RecipeListSection from 'features/recipes/components/RecipeListSection'

import sortByUpdatedAt from 'features/recipes/utils/sortByUpdatedAt'
import sortByName from '../utils/sortByName'

interface Props {
  recipes: Recipe[]
}

const RecipeListAll = ({ recipes }: Props) => {
  const { t } = useTranslation()

  const mostRecentRecipes = useMemo(
    () => recipes.sort(sortByUpdatedAt).slice(0, 4),
    [recipes]
  )

  const allRecipes = useMemo(() => recipes.sort(sortByName), [recipes])

  return (
    <>
      {recipes.length > 8 && (
        <RecipeListSection
          title={t('_Most Recents')}
          recipes={mostRecentRecipes}
        />
      )}
      <RecipeListSection
        title={recipes.length > 8 ? t('_All') : ''}
        recipes={allRecipes}
      />
    </>
  )
}

export default RecipeListAll
