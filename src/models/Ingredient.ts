import Measure from './Measure'

type Ingredient = {
  name: string
  measure: Measure
}

export default Ingredient

export const buildIngredient = (
  name: string,
  value: string | number,
  unit: string
): Ingredient => ({
  name,
  measure: {
    unit,
    value,
  },
})
