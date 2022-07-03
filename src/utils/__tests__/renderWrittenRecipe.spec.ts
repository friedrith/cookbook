import renderWrittenRecipe from 'utils/renderWrittenRecipe'

const emptyRecipe = {
  id: '',
  imageUrl: '',
  name: 'Recipe',
  ingredients: [],
  steps: [],
  keywords: [],
  stats: {},
}

describe('renderWrittenRecipe', () => {
  it('should render recipe', () => {
    const expectedWrittenRecipe = {
      name: 'Recipe',
      ingredients: ``,
      steps: ``,
      keywords: ``,
      duration: undefined,
      servings: undefined,
      imageUrl: '',
    }

    expect(renderWrittenRecipe(emptyRecipe)).toEqual(expectedWrittenRecipe)
  })

  it('should render recipe with simple ingredients', () => {
    const recipe = {
      ...emptyRecipe,
      ingredients: [{ name: 'yolk', measure: { value: 1, unit: 'count' } }],
    }
    const expectedWrittenRecipe = {
      name: 'Recipe',
      ingredients: `- 1 yolk`,
      steps: ``,
      keywords: ``,
      duration: undefined,
      servings: undefined,
      imageUrl: '',
    }

    expect(renderWrittenRecipe(recipe)).toEqual(expectedWrittenRecipe)
  })

  it('should render recipe with ingredients with "some" when written by user', () => {
    const recipe = {
      ...emptyRecipe,
      ingredients: [{ name: 'yolk', measure: { value: 1, unit: 'some' } }],
    }
    const expectedWrittenRecipe = {
      name: 'Recipe',
      ingredients: `- some yolk`,
      steps: ``,
      keywords: ``,
      duration: undefined,
      servings: undefined,
      imageUrl: '',
    }

    expect(renderWrittenRecipe(recipe)).toEqual(expectedWrittenRecipe)
  })

  it('should render recipe with ingredients without "some" when not written by user', () => {
    const recipe = {
      ...emptyRecipe,
      ingredients: [{ name: 'yolk', measure: { value: 0, unit: 'some' } }],
    }
    const expectedWrittenRecipe = {
      name: 'Recipe',
      ingredients: `- yolk`,
      steps: ``,
      keywords: ``,
      duration: undefined,
      servings: undefined,
      imageUrl: '',
    }

    expect(renderWrittenRecipe(recipe)).toEqual(expectedWrittenRecipe)
  })
})
