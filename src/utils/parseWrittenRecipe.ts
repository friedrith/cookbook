import Recipe from 'models/Recipe'
import Ingredient from 'models/Ingredient'

type ParsingError = {
  source: string
  message: string
}

const parseAsExplicitSome = (line: string): Ingredient | null => {
  const matchExplicitSome = line.match(/^some ([a-zA-Z]+)/)

  if (matchExplicitSome) {
    const [name] = matchExplicitSome.slice(1)
    return {
      name,
      measure: {
        unit: 'some',
        value: 1,
      },
    }
  }

  return null
}

const parseAsImplicitSome = (line: string): Ingredient | null => {
  const matchExplicitSome = line.match(/^([a-zA-Z]+)/)

  if (matchExplicitSome) {
    const [name] = matchExplicitSome
    return {
      name,
      measure: {
        unit: 'some',
        value: 0,
      },
    }
  }

  return null
}

const parseAsExplicitUnit = (line: string): Ingredient | null => {
  const match = line.match(/^([0-9]+[.0-9]*)\s*([a-zA-Z]*) of ([a-zA-Z]+)/)

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

  return null
}

const parseWithoutUnit = (line: string): Ingredient | null => {
  const matchWithoutUnit = line.match(/^([0-9]+[.0-9]*) ([a-zA-Z]+)/)

  if (matchWithoutUnit) {
    const [value, name] = matchWithoutUnit.slice(1)
    return {
      name,
      measure: {
        unit: 'count',
        value: parseFloat(value),
      },
    }
  }

  return null
}

export const parseIngredient = (line: string): Ingredient | ParsingError => {
  const ingredient = [
    parseAsExplicitSome,
    parseAsImplicitSome,
    parseAsExplicitUnit,
    parseWithoutUnit,
  ]
    .map(parser => parser(line))
    .filter(Boolean)
    .map(i => i as Ingredient)[0]

  return ingredient
    ? ingredient
    : {
        source: 'ingredients',
        message: `impossible to parse ingredient ${ingredient}`,
      }
}

export const parseStep = (step: string, ingredients: Ingredient[]) => ({
  description: step,
  ingredients: ingredients.filter(i =>
    i.name
      .split(' ')
      .filter(w => w.length > 3)
      .some(w => step.includes(w))
  ),
})

const parseWrittenRecipe = (
  recipe: Recipe,
  name: string,
  newIngredients: string,
  newSteps: string,
  keywords: string,
  servings: string,
  duration: string,
  imageUrl: string
): Recipe | ParsingError[] => {
  const newIngredientsParsed = newIngredients
    .split('\n')
    .map(i => i.replace(/^-/, '').trim())
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
      .filter(s => s.trim())
      .filter(Boolean)
      .map(i => i.replace(/^-/, '').trim())
      .map(step => parseStep(step, ingredients)),
    keywords: keywords.split(' ').filter(Boolean),
    stats,
    imageUrl,
  }
}

export default parseWrittenRecipe
