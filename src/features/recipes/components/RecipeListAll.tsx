import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Recipe from 'types/Recipe'
import RecipeListSection from 'features/recipes/components/RecipeListSection'

import sortByUpdatedAt from 'features/recipes/utils/sortByUpdatedAt'
import sortByName from 'features/recipes/utils/sortByName'
import useEventListener from 'hooks/useEventListener'

interface Props {
  recipes: Recipe[]
}

const getNumberOfMostRecents = () => {
  if (window.innerWidth > 2200) {
    return 7
  }
  if (window.innerWidth > 1536) {
    return 6
  }
  if (window.innerWidth > 1280) {
    return 5
  }
  if (window.innerWidth > 1024) {
    return 4
  }
  return 4
}

const RecipeListAll = ({ recipes }: Props) => {
  const { t } = useTranslation()

  const [mostRecentRecipes, setMostRecentRecipes] = useState(
    [...recipes].sort(sortByUpdatedAt).slice(0, getNumberOfMostRecents()),
  )

  useEventListener('resize', () => {
    setMostRecentRecipes(
      [...recipes].sort(sortByUpdatedAt).slice(0, getNumberOfMostRecents()),
    )
  })

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
