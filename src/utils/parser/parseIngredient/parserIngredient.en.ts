import Ingredient, { buildIngredient } from 'models/Ingredient'

const parseAsExplicitSome = (line: string): Ingredient | null => {
  const matchExplicitSome = line.match(/^some (.+)/i)

  if (matchExplicitSome) {
    const [name] = matchExplicitSome.slice(1)

    return buildIngredient(name, 1, 'some')
  }

  return null
}

const parseAsWithOfAndUnit = (line: string): Ingredient | null => {
  const match = line.match(
    /^(([0-9]|\.|\s|\/)*[0-9])\s*([a-zA-Z]*)\s*of\s*(.+)/i,
  )

  if (match) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, _, unit, name] = match.slice(1)
    return buildIngredient(name, value, unit)
  }

  return null
}

// https://en.wikibooks.org/wiki/Cookbook:Units_of_measurement
const units = [
  'ml',
  'teaspoon',
  'tsp',
  'tablespoon',
  'tbs',
  'fl oz',
  'cup',
  'pint',
  'gallon',
  'mg',
  // 'g',
  'kg',
  'pound',
  'lb',
  'ounce',
  'oz',
  // 'l',
]

const parseAsWithUnitWithoutOf = (line: string): Ingredient | null => {
  const unit = units
    .map(u => {
      const match = line.match(new RegExp(`[0-9\\s-]+(${u}[a-z.]*) (of|)`, 'i'))
      return match ? match[1] : null
    })
    .find(Boolean)

  if (unit) {
    const [value, name] = line.split(new RegExp(`${unit}`, 'i'))
    return buildIngredient(name.trim(), value.trim(), unit)
  }

  return null
}

const parsers = [
  parseAsExplicitSome,
  parseAsWithOfAndUnit,
  parseAsWithUnitWithoutOf,
]

export default parsers
