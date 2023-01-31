import shortedIngredientName from '../shortenIngredientName'

const anIngredient = (name: string) => ({
  name,
  measure: {
    value: 100,
    unit: '',
  },
})

describe('shortedIngredientName', () => {
  it('should return the same name if the ingredient name is short', () => {
    const ingredient = anIngredient('sugar')
    expect(shortedIngredientName(ingredient)).toEqual('sugar')
  })

  it('should return the shorten name if the ingredient name is long with :', () => {
    const ingredient = anIngredient(
      'spices or spice combination: chipotle powder, smoked paprika, Chinese five-spice, pumpkin pie spice, garam masala, Cajun seasoning, etc.',
    )
    expect(shortedIngredientName(ingredient)).toEqual(
      'spices or spice combination',
    )
  })
})
