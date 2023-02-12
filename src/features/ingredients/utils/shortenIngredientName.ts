import Ingredient from '@/models/Ingredient'

const shortedIngredientName = (ingredient: Ingredient) => {
  if (ingredient.name.length > 15) {
    const shorterName = ingredient.name.split(/[.:]/)?.[0]

    if (shorterName.length > 5) {
      return shorterName
    }
  }

  return ingredient.name
}

export default shortedIngredientName
