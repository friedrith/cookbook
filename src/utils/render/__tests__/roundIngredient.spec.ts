import roundIngredient from '../roundIngredient'

describe('roundIngredient', () => {
  it('should return rouned roundMeasure for count', () => {
    const ingredient = {
      name: 'yolks',
      measure: {
        value: 2.1,
        unit: 'count',
      },
    }

    const expectedIngredient = {
      name: 'yolks',
      measure: {
        value: 2.1,
        unit: 'count',
      },
    }

    expect(roundIngredient(ingredient)).toEqual(expectedIngredient)
  })
})
