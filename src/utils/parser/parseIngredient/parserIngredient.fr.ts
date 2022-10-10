import Ingredient, { buildIngredient } from 'models/Ingredient'

// const isValue = (value: string) => value.match(/[0-9½]/)

const parseAsExplicitUnitFrench = (line: string): Ingredient | null => {
  const match = line.match(/^([0-9.\s/½]*[0-9½])\s*(.*)\s+(de|d'|d’)\s*(.+)/i)

  if (match) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, unit, _2, name] = match.slice(1)

    // if (isValue(value)) {
    return buildIngredient(name, value, unit)
    // }
  }

  return null
}

// https://en.wikibooks.org/wiki/Cookbook:Units_of_measurement
const units = ['c. à thé', 'tasse', 'c. à café']

const parseAsWithUnitWithoutOf = (line: string): Ingredient | null => {
  const unit = units
    .map(u => {
      const match = line.match(
        new RegExp(`[0-9\\s½]+(${u}[a-z.]*) (de|d'|d’)`, 'i')
      )
      // console.log('match', match)
      return match ? match[1] : null
    })
    .find(Boolean)

  // console.log('unit', unit)

  if (unit) {
    const [value, name] = line.split(new RegExp(`${unit}`, 'i'))
    return buildIngredient(name, value, unit)
  }

  return null
}

const parsers = [parseAsExplicitUnitFrench, parseAsWithUnitWithoutOf]

export default parsers
