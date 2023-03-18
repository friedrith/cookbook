import { useTranslation } from 'react-i18next'

import Recipe from 'types/Recipe'
import RecipeListSection from 'features/recipes/components/RecipeListSection'

interface Props {
  recipes: Recipe[]
}

const RecipeListNoCategories = ({ recipes }: Props) => {
  const { t } = useTranslation()

  const recipesWithoutCategories = recipes.filter(r => r.keywords.length === 0)

  return (
    <RecipeListSection
      title={t('_Recipes without categories')}
      recipes={recipesWithoutCategories}
    />
  )
}

export default RecipeListNoCategories
