import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'hooks/redux'

import { getIngredientList } from 'store'
import Recipe from 'models/Recipe'
import SectionTitle from 'components/atoms/SectionTitle'
import renderMeasure from 'utils/renderMeasure'

type Props = {
  recipe: Recipe
}

const IngredientList = ({ recipe }: Props) => {
  const ingredients = useAppSelector((state) =>
    getIngredientList(state, recipe.id)
  )

  const { t } = useTranslation()

  return (
    <div>
      <SectionTitle>{t('_Ingredients')}</SectionTitle>
      <table className="min-w-full divide-y divide-gray-300">
        <tbody className="divide-y divide-gray-200 bg-white">
          {ingredients.map((ingredient) => (
            <tr key={ingredient.name}>
              <td className="whitespace-nowrap py-4 pl-6 text-sm font-medium text-gray-900 text-right w-20">
                {renderMeasure(ingredient.measure)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 pr-6 text-sm text-gray-500 w-60">
                {ingredient.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IngredientList
