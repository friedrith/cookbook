import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShoppingBagIcon } from '@heroicons/react/outline'

import { FormattedRecipe } from 'models/Recipe'
import usePopup from 'hooks/usePopup'
import Ingredient from 'models/Ingredient'
import SectionTitle from 'components/atoms/SectionTitle'
import renderMeasure from 'utils/render/renderMeasure'
import Button from 'components/atoms/Button'
import { shareIngredients } from 'utils/share'
import { useAppSelector } from 'hooks/redux'
import { getRecipe } from 'store'
import waitFor from 'utils/waitFor'

type Props = {
  recipe: FormattedRecipe
}

const key = (ingredient: Ingredient, index: number) =>
  `${ingredient.name}${index}`

const IngredientList = ({ recipe }: Props) => {
  // const ingredients = useAppSelector(state =>
  //   getIngredientList(state, recipe.id)
  // )

  const { t } = useTranslation()

  const shoppingBag = usePopup(false)

  const [checkedIngredients, setCheckedIngredients] = useState(
    recipe.ingredients.map((_, index) => index)
  )

  const [sharedIngredientsWithClipboard, setSharedIngredientsWithClipboard] =
    useState(false)

  const toggleCheckedIngredient =
    (ingredientIndex: number) => (event: React.SyntheticEvent) => {
      if (!shoppingBag.isOpen) return

      setCheckedIngredients([...checkedIngredients, ingredientIndex])
      if (checkedIngredients.includes(ingredientIndex)) {
        setCheckedIngredients(
          checkedIngredients.filter(index => index !== ingredientIndex)
        )
      } else {
        setCheckedIngredients([...checkedIngredients, ingredientIndex])
      }

      event.stopPropagation()
    }

  const rawRecipe = useAppSelector(state => getRecipe(state, recipe.id))

  if (!rawRecipe) {
    return null
  }

  const ingredientsToBeShared = recipe.ingredients.filter((_, index) =>
    checkedIngredients.includes(index)
  )

  return (
    <div>
      <SectionTitle>
        <div className="flex items-center justify-left">
          <span className="flex-1">{t('_Ingredients')}</span>
          <ShoppingBagIcon
            className="h-7 w-7 text-gray-400 hover:text-indigo-600 cursor-pointer"
            aria-hidden="true"
            onClick={shoppingBag.toggle}
          />
        </div>
      </SectionTitle>
      <table className="min-w-full divide-y divide-gray-300">
        <tbody className="divide-y divide-gray-200 bg-white">
          {recipe.ingredients.map((ingredient, index) => (
            <tr
              key={key(ingredient, index)}
              onClick={toggleCheckedIngredient(index)}
              className={`${
                shoppingBag.isOpen ? 'cursor-pointer' : ''
              } select-text`}
            >
              <td className="w-10 align-middle text-center">
                {shoppingBag.isOpen && (
                  <input
                    id="candidates"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    className="relative h-4 w-4 top-[-2px] rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={checkedIngredients.includes(index)}
                    onChange={toggleCheckedIngredient(index)}
                  />
                )}
              </td>
              <td className="whitespace-nowrap py-4 align-top text-sm font-medium text-gray-900 text-right w-20">
                {renderMeasure(ingredient.measure, { explicit: true })}
              </td>
              <td className="px-3 py-4 pr-6 text-sm text-gray-500 w-60">
                {ingredient.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {shoppingBag.isOpen && (
        <div className="mt-4 shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] fixed z-50 bottom-0 left-0 right-0 md:relative p-4 bg-white md:p-0">
          <Button.Primary
            className="w-full justify-center !p-3 "
            disabled={checkedIngredients.length === 0}
            onClick={async () => {
              const result = await shareIngredients(ingredientsToBeShared)
              if (result.isCopied) {
                setSharedIngredientsWithClipboard(true)
                await waitFor(1000)
                shoppingBag.close()
                await waitFor(500)
                setSharedIngredientsWithClipboard(false)
              } else {
                shoppingBag.close()
              }
            }}
          >
            {sharedIngredientsWithClipboard
              ? t('_Shopping list copied to clipboard')
              : t('_Create shopping list')}
          </Button.Primary>
        </div>
      )}
    </div>
  )
}

export default IngredientList
