import Ingredient from 'models/Ingredient'
import ParsingError from 'models/ParsingError'

import cleanLines from './cleanLines'

const parseAsExplicitSome = (line: string): Ingredient | null => {
  const matchExplicitSome = line.match(/^some (.+)/i)

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

const parseValue = (value: string) => {
  const number = parseFloat(value)

  return `${number}` === value ? number : value
}

const parseAsExplicitUnit = (line: string): Ingredient | null => {
  const match = line.match(
    /^(([0-9]|\.|\s|\/)*[0-9])\s*([a-zA-Z]*)\s*of\s*(.+)/i
  )

  if (match) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, _, unit, name] = match.slice(1)
    return {
      name,
      measure: {
        unit,
        value: parseValue(value),
      },
    }
  }

  return null
}

const parseAsExplicitUnitFrench = (line: string): Ingredient | null => {
  const match = line.match(
    /^(([0-9]|\.|\s|\/)*[0-9])\s*([a-zA-Z]*)\s*(de|d')\s*(.+)/i
  )

  if (match) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, _, unit, _2, name] = match.slice(1)
    return {
      name,
      measure: {
        unit,
        value: parseValue(value),
      },
    }
  }

  return null
}

const parseWithoutUnit = (line: string): Ingredient | null => {
  const matchWithoutUnit = line.match(/^(([0-9]|\.|\s|\/)*[0-9]) (.+)/)

  if (matchWithoutUnit) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, _, name] = matchWithoutUnit.slice(1)
    return {
      name,
      measure: {
        unit: 'count',
        value: parseValue(value),
      },
    }
  }

  return null
}

const parseDefault = (line: string): Ingredient | null => {
  return {
    name: line,
    measure: {
      unit: 'none',
      value: 0,
    },
  }
}

export const parseIngredient = (line: string): Ingredient | ParsingError => {
  const ingredient = [
    parseAsExplicitSome,
    parseAsExplicitUnit,
    parseAsExplicitUnitFrench,
    parseWithoutUnit,
    parseDefault,
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

const parseIngredients = (ingredientsText: string): Ingredient[] => {
  return cleanLines(ingredientsText)
    .map(parseIngredient)
    .filter(e => !('source' in e))
    .map(e => e as Ingredient)
}

export default parseIngredients
