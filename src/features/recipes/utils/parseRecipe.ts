import Recipe, { FormattedRecipe } from '@/models/Recipe'
import Ingredient from '@/models/Ingredient'
import parseIngredient from '@/features/ingredients/utils/parseIngredient'
import parseLines from '../../../utils/parseLines'
import cleanKeywords from '@/features/categories/utils/cleanKeywords'

export const parseStep = (step: string, ingredients: Ingredient[]) => ({
  description: step,
  ingredients: ingredients.filter(i =>
    i.name
      .split(' ')
      .filter(w => w.length > 3)
      .some(w => step.includes(w)),
  ),
})

const parseRecipe = (recipe: Recipe): FormattedRecipe => {
  // const stats = {}

  // if (recipe.stats.servings) {
  //   Object.assign(stats, {
  //     ...stats,
  //     servings: {
  //       value: parseInt(recipe.stats.servings.value, 10),
  //       unit: 'count',
  //     },
  //   })
  // }

  // if (recipe.stats.duration) {
  //   Object.assign(stats, {
  //     ...stats,
  //     duration: {
  //       value: parseInt(recipe.stats.duration.value, 10),
  //       unit: 'min',
  //     },
  //   })
  // }

  const ingredients = parseLines(recipe.ingredients)
    .map(parseIngredient)
    .filter(e => !('source' in e))
    .map(e => e as Ingredient)

  return {
    ...recipe,
    ingredients,
    steps: parseLines(recipe.steps).map(step => parseStep(step, ingredients)),
    keywords: cleanKeywords(recipe.keywords),
  }
}

export default parseRecipe
