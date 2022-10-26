import Ingredient from 'models/Ingredient'

import excludingWords from './excludingWords.en'

const match = (wordA: string, wordB: string) =>
  wordA.toLowerCase() === wordB.toLowerCase()

const matchingIngredients =
  (description: string) => (ingredient: Ingredient) => {
    return (
      description.toLowerCase().includes(ingredient.name.toLowerCase()) ||
      ingredient.name
        .split(' ')
        .filter(word => !excludingWords.find(w => match(word, w)))
        .filter(word => word.length >= 3)
        .some(word => description.split(' ').some(w => match(word, w)))
    )
  }

export default matchingIngredients
