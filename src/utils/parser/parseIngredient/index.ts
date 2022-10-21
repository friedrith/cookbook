import Ingredient from 'models/Ingredient'
import ParsingError from 'models/ParsingError'

import parseIngredientCommon from './parserIngredient.common'
import parseIngredientEn from './parserIngredient.en'
import parseIngredientFr from './parserIngredient.fr'

const parsers = [
  ...parseIngredientEn,
  ...parseIngredientFr,
  ...parseIngredientCommon,
]

export const parseValue = (value: string | number) => {
  if (typeof value === 'number') return value

  const cleanedValue = value.trim()

  const number = parseFloat(cleanedValue)

  return `${number}` === cleanedValue ? number : cleanedValue
}

const cleanIngredient = (ingredient: Ingredient) => ({
  ...ingredient,
  name: ingredient.name.trim(),
  measure: {
    unit: ingredient.measure.unit.trim(),
    value: parseValue(ingredient.measure.value),
  },
})

const parseIngredient = (line: string): Ingredient | ParsingError => {
  const ingredient = parsers
    .map(parser => parser(line))
    .filter(Boolean)
    .map(i => i as Ingredient)[0]

  return ingredient
    ? cleanIngredient(ingredient)
    : {
        source: 'ingredients',
        message: `impossible to parse ingredient ${ingredient}`,
      }
}

export default parseIngredient
