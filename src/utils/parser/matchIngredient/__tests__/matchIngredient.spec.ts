import matchIngredient from '../matchIngredient'

const anIngredient = (name: string) => ({
  name,
  measure: {
    value: 100,
    unit: '',
  },
})

describe('matchingIngredient', () => {
  it('should return true when the description includes exactly the ingredient', () => {
    const ingredient = anIngredient('bar')
    const description = 'foo bar'

    expect(matchIngredient(ingredient, description)).toEqual(4)
  })

  it('should return true when the description includes exactly the ingredient with case insensitivity', () => {
    const ingredient = anIngredient('Bar')
    const description = 'foo bar'

    expect(matchIngredient(ingredient, description)).toEqual(4)
  })

  it('should return true when the description includes a word of the ingredient', () => {
    const ingredient = anIngredient('extra virgin olive oil')
    const description =
      'Put the sweet potatoes into a large bowl and add the oil'

    expect(matchIngredient(ingredient, description)).toEqual(11)
  })

  it('should return false when the description includes a too short word of the ingredient', () => {
    const ingredient = anIngredient('sugar of')
    const description = 'A spoon of water'

    expect(matchIngredient(ingredient, description)).toEqual(-1)
  })

  it('should return true when the description includes a word of the ingredient with case insensitivity', () => {
    const ingredient = anIngredient('extra virgin olive Oil')
    const description =
      'Put the sweet potatoes into a large bowl and add the oil'

    expect(matchIngredient(ingredient, description)).toEqual(11)
  })
})
