import Recipe, { Step } from 'models/Recipe'
import Ingredient from 'models/Ingredient'
import Measure from 'models/Measure'
import renderMeasure from './renderMeasure'

const addListBulletPoint = (line: string) => `- ${line}`

const excludedUnits = ['count', 'some']

const connectionWord = (measure: Measure) =>
  excludedUnits.includes(measure.unit) ? '' : 'of'

const renderIngredientLine = (ingredient: Ingredient) =>
  [
    renderMeasure(ingredient.measure),
    connectionWord(ingredient.measure),
    ingredient.name,
  ]
    .filter(Boolean)
    .join(' ')

const renderStepLine = (step: Step) => `${step.description}`

const renderWrittenRecipe = (recipe: Recipe) => ({
  name: recipe.name,
  ingredients: recipe.ingredients
    .map(renderIngredientLine)
    .map(addListBulletPoint)
    .join('\n'),
  steps: recipe.steps.map(renderStepLine).map(addListBulletPoint).join('\n'),
  keywords: recipe.keywords,
  servings: recipe.stats?.servings?.value,
  duration: recipe.stats?.duration?.value,
  imageUrl: recipe.imageUrl,
})

export default renderWrittenRecipe
