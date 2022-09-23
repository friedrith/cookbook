import Ingredient from 'models/Ingredient'
import ParsingError from 'models/ParsingError'

export const parseAsExplicitSome = (line: string): Ingredient | null => {
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

export const parseAsImplicitSome = (line: string): Ingredient | null => {
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

export const parseAsExplicitUnit = (line: string): Ingredient | null => {
  const match = line.match(
    /^([0-9]+[.0-9]*|[0-9]+\/[0-9]+)\s*([a-zA-Z]*)\s*of\s*([a-zA-Z]+)/
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

  return null
}

export const parseWithoutUnit = (line: string): Ingredient | null => {
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

export const parseDefault = (line: string): Ingredient | null => {
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
    parseAsImplicitSome,
    parseAsExplicitUnit,
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

const cleanLine = (line: string) => line.replace(/^-/, '').trim()

const noEmptyLine = (line: string) => line !== ''

const parseIngredients = (ingredientsText: string): Ingredient[] => {
  return ingredientsText
    .split('\n')
    .map(cleanLine)
    .filter(noEmptyLine)
    .map(parseIngredient)
    .filter(e => !('source' in e))
    .map(e => e as Ingredient)
}

export default parseIngredients
