import Ingredient, { buildIngredient } from 'models/Ingredient'

const parseAsExplicitUnitFrench = (line: string): Ingredient | null => {
  const match = line.match(
    /^(([0-9]|\.|\s|\/)*[0-9])\s*([a-zA-Z]*)\s*(de|d')\s*(.+)/i
  )

  if (match) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, _, unit, _2, name] = match.slice(1)

    return buildIngredient(name, value, unit)
  }

  return null
}

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

const parsers = [parseAsExplicitUnitFrench, parseWithoutUnit, parseDefault]

export default parsers
