import renderIngredients from '../renderIngredients'

describe('renderIngredients', () => {
  it('should return a list of ingredients', () => {
    const ingredients = [
      { name: 'sugar', measure: { value: '', unit: 'some' } },
      { name: 'flour', measure: { value: 120, unit: 'g' } },
    ]
    const expectedIngredients = `sugar\n120 g flour`

    expect(renderIngredients(ingredients)).toEqual(expectedIngredients)
  })
})
