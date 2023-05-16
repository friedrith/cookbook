// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { ShoppingBagIcon, XCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import { FormattedRecipe } from '~/src/types/Recipe'
// import usePopup from '~/src/hooks/usePopup'
import Ingredient from '~/src/models/Ingredient'
// import SectionTitle from '~/src/components/atoms/SectionTitle'
import renderMeasure from '~/src/utils/renderMeasure'
// import Button from '~/src/components/atoms/Button'
// import renderIngredients from '~/src/utils/render/renderIngredients'
// import { canShare, share, isShared, isCopiedToClipboard } from '~/src/utils/share'
import { useAppSelector } from '~/src/hooks/redux'
import { getRecipe } from '~/src/store/index'
// import waitFor from '~/src/utils/waitFor'

type Props = {
  recipe: FormattedRecipe
}

const key = (ingredient: Ingredient, index: number) =>
  `${ingredient.name}${index}`

const IngredientListFocus = ({ recipe }: Props) => {
  // const { t } = useTranslation()

  const rawRecipe = useAppSelector(state => getRecipe(state, recipe.id))

  if (!rawRecipe) {
    return null
  }

  const smaller = recipe.ingredients.length > 7

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <tbody className="divide-y divide-gray-200 bg-white">
        {recipe.ingredients.map((ingredient, index) => (
          <tr key={key(ingredient, index)} className="select-text">
            <td
              className={classNames(
                'whitespace-wrap align-top text-md font-medium text-gray-900 text-right w-20',
                renderMeasure(ingredient.measure, { explicit: true }).length >
                  15
                  ? 'whitespace-wrap'
                  : 'whitespace-nowrap',
                smaller ? 'py-3' : 'py-4',
              )}
            >
              {renderMeasure(ingredient.measure, { explicit: true })}
            </td>
            <td
              className={classNames(
                'px-3 pr-6 align-top text-md text-gray-500 w-60',
                smaller ? 'py-3' : 'py-4',
              )}
            >
              {ingredient.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IngredientListFocus
