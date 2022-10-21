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

    expect(matchIngredient(description)(ingredient)).toEqual(true)
  })

  it('should return true when the description includes a word of the ingredient', () => {
    const ingredient = anIngredient('extra virgin olive oil')
    const description =
      'Put the sweet potatoes into a large bowl and add the oil'

    expect(matchIngredient(description)(ingredient)).toEqual(true)
  })

  it('should return false when the description includes a too short word of the ingredient', () => {
    const ingredient = anIngredient('sugar of')
    const description = 'A spoon of water'

    expect(matchIngredient(description)(ingredient)).toEqual(false)
  })
})
