import Ingredient, { buildIngredient } from '@/models/Ingredient'

const parseWithoutUnit = (line: string): Ingredient | null => {
  const matchWithoutUnit = line.match(/^(([0-9]|\.|\s|\/|-)*[0-9]) (.+)/)

  if (matchWithoutUnit) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, _, name] = matchWithoutUnit.slice(1)

    return buildIngredient(name, value, 'count')
  }

  return null
}

const parseDefault = (line: string): Ingredient | null => {
  return buildIngredient(line, 0, 'none')
}

const parsers = [parseWithoutUnit, parseDefault]

export default parsers
