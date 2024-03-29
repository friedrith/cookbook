import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShoppingCartIcon, XCircleIcon } from '@heroicons/react/24/outline'

import { FormattedRecipe } from '~/src/types/Recipe'
import usePopup from '~/src/hooks/usePopup'
import SectionTitle from '~/src/components/atoms/SectionTitle'
import Button from '~/src/components/atoms/Button'
import renderIngredients from '~/src/features/ingredients/utils/renderIngredients'
import {
  canShare,
  shareText,
  isShared,
  isCopiedToClipboard,
} from '~/src/utils/services/share'
import { useAppSelector } from '~/src/hooks/redux'
import { getIngredienTemplate } from '~/src/store/index'
import waitFor from '~/src/utils/waitFor'
import SectionAction from '~/src/components/atoms/SectionAction'
import IngredientTable from './IngredientTable'

type Props = {
  formattedRecipe: FormattedRecipe
}

const IngredientList = ({ formattedRecipe }: Props) => {
  const { t } = useTranslation()

  const shoppingBag = usePopup(false)

  const [checkedIngredients, setCheckedIngredients] = useState(
    formattedRecipe.ingredients.map((_, index) => index),
  )

  const [sharedIngredientsWithClipboard, setSharedIngredientsWithClipboard] =
    useState(false)

  const ingredientTemplate = useAppSelector(getIngredienTemplate)

  const toggleCheckedIngredient =
    (ingredientIndex: number) => (event: React.SyntheticEvent) => {
      if (!shoppingBag.isOpen) return

      setCheckedIngredients([...checkedIngredients, ingredientIndex])
      if (checkedIngredients.includes(ingredientIndex)) {
        setCheckedIngredients(
          checkedIngredients.filter(index => index !== ingredientIndex),
        )
      } else {
        setCheckedIngredients([...checkedIngredients, ingredientIndex])
      }

      event.stopPropagation()
    }

  const ingredientsToBeShared = formattedRecipe.ingredients.filter((_, index) =>
    checkedIngredients.includes(index),
  )

  const shareIngredients = async () => {
    const ingredients = renderIngredients(
      ingredientsToBeShared,
      ingredientTemplate,
    )
    const result = await shareText(ingredients)

    if (isCopiedToClipboard(result)) {
      setSharedIngredientsWithClipboard(true)
      await waitFor(5000)
      shoppingBag.close()
      setSharedIngredientsWithClipboard(false)
    } else if (isShared(result)) {
      shoppingBag.close()
    }
  }

  return (
    <div>
      <SectionTitle
        more={
          <SectionAction
            label={
              shoppingBag.isOpen
                ? t('shoppingList.Close shopping list')
                : t('shoppingList.Shopping list')
            }
            onClick={shoppingBag.toggle}
            tooltip={
              shoppingBag.isOpen
                ? t('shoppingList.Close shopping list')
                : t('shoppingList.Create shopping list')
            }
          >
            {shoppingBag.isOpen ? (
              <XCircleIcon
                className="h-7 w-7 focus:outline-none"
                aria-hidden="true"
              />
            ) : (
              <ShoppingCartIcon
                className="h-7 w-7 cursor-pointer focus:outline-none"
                aria-hidden="true"
                onClick={shoppingBag.toggle}
              />
            )}
          </SectionAction>
        }
      >
        {t('_Ingredients')}
      </SectionTitle>
      <IngredientTable
        ingredients={formattedRecipe.ingredients}
        itemOnClick={index => () => toggleCheckedIngredient(index)}
        itemClassName={shoppingBag.isOpen ? 'cursor-pointer' : 'select-text'}
        itemComponent={({ index }) => (
          <td className="w-10 align-middle text-center">
            {shoppingBag.isOpen && (
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                type="checkbox"
                className="relative h-4 w-4 top-[-2px] rounded border-gray-300 text-primary-400 focus:ring-primary-400 cursor-pointer"
                checked={checkedIngredients.includes(index)}
                onChange={toggleCheckedIngredient(index)}
              />
            )}
          </td>
        )}
      />
      {/* <table className="min-w-full divide-y divide-gray-300">
        <tbody className="divide-y divide-gray-200 bg-white">
          {formattedRecipe.ingredients.map((ingredient, index) => (
            <tr
              key={key(ingredient, index)}
              onClick={toggleCheckedIngredient(index)}
              className={`${
                shoppingBag.isOpen ? 'cursor-pointer' : 'select-text'
              } `}
            >
              <td className="w-10 align-middle text-center">
                {shoppingBag.isOpen && (
                  <input
                    id="candidates"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    className="relative h-4 w-4 top-[-2px] rounded border-gray-300 text-primary-400 focus:ring-primary-400 cursor-pointer"
                    checked={checkedIngredients.includes(index)}
                    onChange={toggleCheckedIngredient(index)}
                  />
                )}
              </td>
              <td
                className={classNames(
                  'whitespace-wrap py-4 align-top text-sm font-medium text-gray-900 text-right w-10 max-w-10',
                  renderMeasure(ingredient.measure, { explicit: true }).length >
                    15
                    ? 'whitespace-wrap'
                    : 'whitespace-nowrap',
                )}
              >
                {renderMeasure(ingredient.measure, { explicit: true })}
              </td>
              <td className="px-3 py-4 pr-6 align-top text-sm text-gray-500 w-60">
                {ingredient.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {shoppingBag.isOpen && (
        <div className="mt-4 shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] fixed z-50 bottom-0 left-0 right-0 md:relative p-4 bg-white md:p-0">
          <Button.Primary
            className="w-full justify-center !p-3 "
            disabled={checkedIngredients.length === 0}
            onClick={shareIngredients}
          >
            {sharedIngredientsWithClipboard &&
              t('shoppingList.Shopping list copied to clipboard')}
            {!sharedIngredientsWithClipboard &&
              (canShare()
                ? t('shoppingList.Share shopping list')
                : t('shoppingList.Copy shopping list to clipboard'))}
          </Button.Primary>
        </div>
      )}
    </div>
  )
}

export default IngredientList
