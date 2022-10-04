import parseIngredients from '../parseIngredients'

import allFixtures from '../__fixtures__/'

describe('parseIngredients', () => {
  describe('Some explicit', () => {
    it('should return some as unit when some is explicit', () => {
      const ingredient = 'some milk'
      const expectedIngredient = {
        name: 'milk',
        measure: {
          unit: 'some',
          value: 1,
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })

    it('should return some as unit with Some is explicit', () => {
      const ingredient = 'Some milk'
      const expectedIngredient = {
        name: 'milk',
        measure: {
          unit: 'some',
          value: 1,
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })
  })

  describe('Unit explicit', () => {
    it('should return the unit', () => {
      const ingredient = '10g of sugar'
      const expectedIngredient = {
        name: 'sugar',
        measure: {
          unit: 'g',
          value: 10,
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })

    it('should return the unit with space between number and unit', () => {
      const ingredient = '10 g of sugar'
      const expectedIngredient = {
        name: 'sugar',
        measure: {
          unit: 'g',
          value: 10,
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })

    it('should return the unit with no unit', () => {
      const ingredient = '10 of sugar'
      const expectedIngredient = {
        name: 'sugar',
        measure: {
          unit: '',
          value: 10,
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })

    it('should return the unit with fraction', () => {
      const ingredient = '1/2 cup of milk'
      const expectedIngredient = {
        name: 'milk',
        measure: {
          unit: 'cup',
          value: '1/2',
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })

    it('should return the unit with sophisticated fraction', () => {
      const ingredient = '1 1/2 cup of milk'
      const expectedIngredient = {
        name: 'milk',
        measure: {
          unit: 'cup',
          value: '1 1/2',
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })
  })

  describe('No unit', () => {
    it('should return as a count', () => {
      const ingredient = '10 bananas'
      const expectedIngredient = {
        name: 'bananas',
        measure: {
          unit: 'count',
          value: 10,
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })

    it('should return as a count event for fraction', () => {
      const ingredient = '1/2 bananas'
      const expectedIngredient = {
        name: 'bananas',
        measure: {
          unit: 'count',
          value: '1/2',
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })
  })

  describe('default', () => {
    it('should return everything in the same in case no other parser is useful', () => {
      const ingredient = 'bananas'
      const expectedIngredient = {
        name: 'bananas',
        measure: {
          unit: 'none',
          value: 0,
        },
      }

      expect(parseIngredients(ingredient)).toEqual([expectedIngredient])
    })
  })

  allFixtures.forEach(fixtures => {
    Object.entries(fixtures).forEach(([text, expectedIngredient]) => {
      it(`should parse ${text}`, () => {
        expect(parseIngredients(text)).toEqual([expectedIngredient])
      })
    })
  })
})
