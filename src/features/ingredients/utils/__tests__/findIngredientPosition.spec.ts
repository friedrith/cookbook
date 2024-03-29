import findIngredientPosition from '../findIngredientPosition'

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

    expect(findIngredientPosition(ingredient, description)).toEqual(4)
  })

  it('should return true when the description includes exactly the ingredient with case insensitivity', () => {
    const ingredient = anIngredient('Bar')
    const description = 'foo bar'

    expect(findIngredientPosition(ingredient, description)).toEqual(4)
  })

  it('should return true when the description includes a word of the ingredient', () => {
    const ingredient = anIngredient('extra virgin olive oil')
    const description =
      'Put the sweet potatoes into a large bowl and add the oil'

    expect(findIngredientPosition(ingredient, description)).toEqual(11)
  })

  it('should return false when the description includes a too short word of the ingredient', () => {
    const ingredient = anIngredient('sugar of')
    const description = 'A spoon of water'

    expect(findIngredientPosition(ingredient, description)).toEqual(-1)
  })

  it('should return true when the description includes a word of the ingredient with case insensitivity', () => {
    const ingredient = anIngredient('extra virgin olive Oil')
    const description =
      'Put the sweet potatoes into a large bowl and add the oil'

    expect(findIngredientPosition(ingredient, description)).toEqual(11)
  })

  it('should return true when ingredients finish with ,', () => {
    const ingredient = anIngredient('extra virgin olive Oil')

    const description =
      'In a large bowl mix water, milk, oil, sugar, salt and instant yeast.'

    expect(findIngredientPosition(ingredient, description)).toEqual(7)
  })

  it("should return true when ingredients starts with '", () => {
    const ingredient = anIngredient("10 d'eau")

    const description = "Un grand bol de l'eau"

    expect(findIngredientPosition(ingredient, description)).toEqual(5)
  })

  it('should return true when ingredients finish with s', () => {
    const ingredient = anIngredient('brown sugar')

    const description = 'Mix sugars'

    expect(findIngredientPosition(ingredient, description)).toEqual(1)
  })
})
