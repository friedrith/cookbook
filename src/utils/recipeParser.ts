import Recipe from 'models/Recipe'
import Ingredient from 'models/Ingredient'

type ParsingError = {
  source: string
  message: string
}

const parseIngredient = (ingredient: string): Ingredient | ParsingError => {
  console.log('parseIngredient', ingredient)
  const match = ingredient.match(
    /^([0-9]+[.0-9]*)\s*([a-zA-Z]*) of ([a-zA-Z]+)/
  )

  if (match) {
    const [value, unit, name] = match.slice(1)
    return {
      name,
      measure: {
        unit,
        value: parseFloat(value),
      },
    }
  }

  const matchWithoutUnit = ingredient.match(/^([0-9]+[.0-9]*) ([a-zA-Z]+)/)

  if (matchWithoutUnit) {
    const [name, value] = matchWithoutUnit.slice(1)
    return {
      name,
      measure: {
        unit: 'count',
        value: parseFloat(value),
      },
    }
  }

  return {
    source: 'ingredients',
    message: `impossible to parse ingredient ${ingredient}`,
  }
}

const parseStep = (step: string, ingredients: Ingredient[]) => ({
  description: step,
  ingredients: ingredients.filter(i =>
    i.name
      .split(' ')
      .filter(w => w.length > 3)
      .some(w => step.includes(w))
  ),
})

export const convertToRecipe = (
  recipe: Recipe,
  name: string,
  newIngredients: string,
  newSteps: string,
  keywords: string,
  servings: string,
  duration: string
): Recipe | ParsingError[] => {
  const newIngredientsParsed = newIngredients
    .split('\n')
    .map(i => i.replace(/^- /, ''))
    .filter(i => i !== '')
    .map(parseIngredient)

  const ingredients = newIngredientsParsed
    .filter(e => !('source' in e))
    .map(e => e as Ingredient)

  const errors = [
    ...newIngredientsParsed
      .filter(e => 'source' in e)
      .map(e => e as ParsingError),
  ]

  if (errors.length > 0) {
    return errors
  }

  const stats = {}

  if (servings) {
    Object.assign(stats, {
      ...stats,
      servings: { value: parseInt(servings, 10), unit: 'count' },
    })
  }

  if (duration) {
    Object.assign(stats, {
      ...stats,
      duration: { value: parseInt(duration, 10), unit: 'min' },
    })
  }

  return {
    ...recipe,
    name,
    ingredients,
    steps: newSteps
      .split('\n')
      .map(i => i.replace(/^- /, ''))
      .map(step => parseStep(step, ingredients)),
    keywords: keywords.split(' '),
    stats,
  }
}
