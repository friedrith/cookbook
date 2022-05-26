import { Ingredient } from 'models/Recipe'

const matchingIngredients =
  (description: string) => (ingredient: Ingredient) => {
    return description.includes(ingredient.name)
  }

export default matchingIngredients
