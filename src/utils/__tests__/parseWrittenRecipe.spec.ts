import parseWrittenRecipe from 'utils/parseWrittenRecipe'

const emptyRecipe = {
  id: '',
  imageUrl: '',
  name: 'Recipe',
  ingredients: [],
  steps: [],
  keywords: [],
  stats: {},
}

describe('parseWrittenRecipe', () => {
  it('should return basic recipe', () => {
    const expectedRecipe = {
      id: '',
      imageUrl: '',
      name: 'Recipe 2',
      ingredients: [],
      steps: [],
      keywords: [],
      stats: {},
    }

    const recipe = parseWrittenRecipe(
      emptyRecipe,
      'Recipe 2',
      '',
      '',
      '',
      '',
      '',
      ''
    )

    expect(recipe).toEqual(expectedRecipe)
  })

  it('should return recipe with multiple ingredients', () => {
    const expectedRecipe = {
      id: '',
      imageUrl: '',
      name: 'Recipe 2',
      ingredients: [
        {
          name: 'yolk',
          measure: { value: 1, unit: 'count' },
        },
        {
          name: 'eggs',
          measure: { value: 2, unit: 'count' },
        },
        {
          name: 'milk',
          measure: { value: 100, unit: 'ml' },
        },
      ],
      steps: [],
      keywords: [],
      stats: {},
    }

    const recipe = parseWrittenRecipe(
      emptyRecipe,
      'Recipe 2',
      '- 1 yolk\n- 2 eggs\n100 ml of milk',
      '',
      '',
      '',
      '',
      ''
    )

    expect(recipe).toEqual(expectedRecipe)
  })

  it('should return recipe with ingredients including some', () => {
    const expectedRecipe = {
      id: '',
      imageUrl: '',
      name: 'Recipe 2',
      ingredients: [
        {
          name: 'yolk',
          measure: { value: 1, unit: 'count' },
        },
        {
          name: 'coffee',
          measure: { value: 1, unit: 'some' },
        },
        {
          name: 'milk',
          measure: { value: 0, unit: 'some' },
        },
      ],
      steps: [],
      keywords: [],
      stats: {},
    }

    const recipe = parseWrittenRecipe(
      emptyRecipe,
      'Recipe 2',
      '- 1 yolk\n- some coffee\n- milk',
      '',
      '',
      '',
      '',
      ''
    )

    expect(recipe).toEqual(expectedRecipe)
  })
})
