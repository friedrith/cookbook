import Ingredient, { buildIngredient } from 'models/Ingredient'

// const isValue = (value: string) => value.match(/[0-9½]/)

// const parseAsExplicitUnitFrench = (line: string): Ingredient | null => {
//   const match = line.match(/^([0-9.\s/½]*[0-9½])\s*(.*)\s+(de|d'|d’)\s*(.+)/i)

//   if (match) {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const [value, unit, _2, name] = match.slice(1)

//     // if (isValue(value)) {
//     return buildIngredient(name, value, unit)
//     // }
//   }

//   return null
// }

// https://en.wikibooks.org/wiki/Cookbook:Units_of_measurement
const units = [
  'c\\. à thé',
  'tasse',
  'c\\. à café',
  'c\\.à\\.s',
  'c\\.à\\.c',
  'cuillère à thé',
  'cuillière à café',
  'c. à soupe',
  'cl',
  'l',
  'L',
  'g',
]

const parseKnownUnit = (line: string): Ingredient | null => {
  const result = units
    .map(u => {
      const match = line.match(
        new RegExp(`([0-9\\s/½]+)[ ]*(${u})[ ]+(de|d'|d’|)*(.*)`, 'i'),
      )
      return match ? { value: match[1], unit: match[2], name: match[4] } : null
    })
    .find(Boolean)

  if (result) {
    const { name, value, unit } = result

    return buildIngredient(name, value, unit)
  }

  return null
}

const parsers = [parseKnownUnit]

export default parsers
