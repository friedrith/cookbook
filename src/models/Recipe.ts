import Measure from './Measure'

export type Ingredient = {
  name: string
  measure: Measure
}

export type Step = {
  description: string
  ingredients?: Ingredient[]
}

type Recipe = {
  id: string
  name: string
  keywords: string[]
  imageUrl: string
  stats: { [id: string]: Measure }
  ingredients: Ingredient[]
  steps: Step[]
}

export default Recipe
