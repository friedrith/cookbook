import Ingredient from 'models/Ingredient'

const matchingIngredients =
  (description: string) => (ingredient: Ingredient) => {
    return (
      description.includes(ingredient.name) ||
      ingredient.name
        .split(' ')
        .filter(w => w.length >= 3)
        .some(w => description.split(' ').some(w1 => w1 === w))
    )
  }

export default matchingIngredients
