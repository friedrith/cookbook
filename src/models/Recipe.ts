import Measure from './Measure'
import Ingredient from './Ingredient'

export enum Stat {
  Duration,
  Servings,
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
