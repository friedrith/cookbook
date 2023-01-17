import Ingredient from 'models/Ingredient'

const excludingWords = ['yours', 'your']

const cleanWord = (word: string) =>
  word
    .trim()
    .replace(/^[.,']/, '')
    .replace(/[.,s']$/, '')
    .toLowerCase()

const match = (wordA: string, wordB: string) => wordA === wordB

const matchingIngredients = (ingredient: Ingredient, description: string) => {
  const indexOfExactIngredient = description
    .toLowerCase()
    .indexOf(ingredient.name.toLowerCase())

  if (indexOfExactIngredient >= 0) return indexOfExactIngredient

  const significantWords = ingredient.name
    .split(/[\s']/)
    .map(cleanWord)
    .filter(word => !excludingWords.find(w => match(word, w)))
    .filter(word => word.length >= 3)

  return description
    .split(/[\s']/)
    .map(cleanWord)
    .findIndex(word => significantWords.some(w => match(word, w)))
}

export default matchingIngredients
