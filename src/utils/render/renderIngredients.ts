import Recipe from 'models/Recipe'
import cleanLines from 'utils/parser/cleanLines'

const renderIngredients = (recipe: Recipe) => {
  return cleanLines(recipe.ingredients).join('\n')
}

export default renderIngredients
