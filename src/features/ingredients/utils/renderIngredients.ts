import Ingredient from 'models/Ingredient'
import renderMeasure from '../../../utils/renderMeasure'
import { endOfLine } from 'utils/platforms/platform'

const renderIngredient = (ingredient: string, template: string) => {
  if (template.length === 0) return ingredient

  return template.replace('$1', ingredient)
}

const renderIngredients = (ingredients: Ingredient[], template: string) => {
  return ingredients
    .map(i => {
      const measure = renderMeasure(i.measure)

      return `${measure}${measure ? ' ' : ''}${i.name}`
    })
    .map(i => renderIngredient(i, template))
    .join(endOfLine())
}

export default renderIngredients
