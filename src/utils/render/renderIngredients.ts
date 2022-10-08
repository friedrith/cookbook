import Ingredient from 'models/Ingredient'
import renderMeasure from './renderMeasure'

const renderIngredients = (ingredients: Ingredient[]) => {
  return ingredients
    .map(i => `${renderMeasure(i.measure)} ${i.name}`)
    .join('\n')
}

export default renderIngredients
