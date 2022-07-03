import Ingredient from 'models/Ingredient'

const matchingIngredients =
  (description: string) => (ingredient: Ingredient) => {
    return description.includes(ingredient.name)
  }

export default matchingIngredients
