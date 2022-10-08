import Ingredient from 'models/Ingredient'
import renderMeasure from './renderMeasure'
import { endOfLine } from 'utils/platform'

const renderIngredients = (ingredients: Ingredient[]) => {
  return ingredients
    .map(i => {
      const measure = renderMeasure(i.measure)

      return `${measure}${measure ? ' ' : ''}${i.name}`
    })
    .join(endOfLine())
}

export default renderIngredients
