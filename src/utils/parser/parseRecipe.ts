import Recipe, { FormattedRecipe } from 'models/Recipe'
import Ingredient from 'models/Ingredient'
import parseIngredients from './parseIngredients'

export const parseStep = (step: string, ingredients: Ingredient[]) => ({
  description: step,
  ingredients: ingredients.filter(i =>
    i.name
      .split(' ')
      .filter(w => w.length > 3)
      .some(w => step.includes(w))
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

  const ingredients = parseIngredients(recipe.ingredients)

  return {
    ...recipe,
    ingredients,
    steps: recipe.steps
      .split('\n')
      .filter(s => s.trim())
      .filter(Boolean)
      .map(i => i.replace(/^-/, '').trim())
      .map(step => parseStep(step, ingredients)),
    keywords: recipe.keywords.filter(Boolean),
  }
}

export default parseRecipe
