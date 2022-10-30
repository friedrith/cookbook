import Ingredient from 'models/Ingredient'

import excludingWords from './excludingWords.en'

const cleanWord = (word: string) => word.toLowerCase().replace(/s$/, '')

const match = (wordA: string, wordB: string) =>
  cleanWord(wordA) === cleanWord(wordB)

const matchingIngredients = (ingredient: Ingredient, description: string) => {
  const indexOfExactIngredient = description
    .toLowerCase()
    .indexOf(ingredient.name.toLowerCase())

  if (indexOfExactIngredient >= 0) return indexOfExactIngredient

  const significantWords = ingredient.name
    .split(' ')
    .filter(word => !excludingWords.find(w => match(word, w)))
    .filter(word => word.length >= 3)

  return description
    .split(' ')
    .findIndex(word => significantWords.some(w => match(word, w)))
}

export default matchingIngredients
