import Recipe from 'models/Recipe'
import cleanIngredients from 'utils/parser/cleanIngredients'

const renderIngredients = (recipe: Recipe) => {
  return cleanIngredients(recipe.ingredients).join('\n')
}

export default renderIngredients
