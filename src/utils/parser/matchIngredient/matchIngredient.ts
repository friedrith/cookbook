import Ingredient from 'models/Ingredient'

import excludingWords from './excludingWords.en'

const cleanWord = (word: string) => word.toLowerCase().replace(/s$/, '')

const match = (wordA: string, wordB: string) =>
  cleanWord(wordA) === cleanWord(wordB)

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
