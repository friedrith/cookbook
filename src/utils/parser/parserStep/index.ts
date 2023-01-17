import findIngredientPosition from 'features/ingredients/utils/findIngredientPosition'
import Ingredient, { areEqual } from 'models/Ingredient'
import shortenIngredientName from 'utils/parser/shortenIngredientName'
import { FormattedRecipe } from 'models/Recipe'
import Step from 'models/Step'

const expression =
  /((http:\/\/|https:\/\/|)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?)/gi

export const replaceUrlsByLinks = (
  description: string,
  className: string = ''
) =>
  description.replace(
    expression,
    `<a href="$1" target="_blank" class="${className}">$1</a>`
  )

const notInIfLongerThan =
  (list: Ingredient[], length: number) => (ingredient: Ingredient) =>
    shortenIngredientName(ingredient).length > length
      ? list.every(i => !areEqual(i, ingredient))
      : true

const byIndex = (
  { index: indexA }: { index: number },
  { index: indexB }: { index: number }
) => indexA - indexB

export const getStepsWithIngredients = (recipe: FormattedRecipe) =>
  recipe.steps.reduce(
    (
      acc: { steps: Ingredient[][]; ingredientsAlreadyUsed: Ingredient[] },
      step: Step
    ): { steps: Ingredient[][]; ingredientsAlreadyUsed: Ingredient[] } => {
      const { steps, ingredientsAlreadyUsed } = acc

      const ingredients = recipe.ingredients
        .map(i => ({
          ingredient: i,
          index: findIngredientPosition(i, step.description),
        }))
        .filter(({ index }) => index >= 0)
        .sort(byIndex)
        .map(({ ingredient }) => ingredient)
        .filter(notInIfLongerThan(ingredientsAlreadyUsed, 15))

      return {
        steps: [...steps, ingredients],
        ingredientsAlreadyUsed: [...ingredientsAlreadyUsed, ...ingredients],
      }
    },

    { steps: [], ingredientsAlreadyUsed: [] }
  )?.steps
