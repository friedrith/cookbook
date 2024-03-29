import { v4 as uuidv4 } from 'uuid'

import Measure from '../models/Measure'
import Ingredient from '../models/Ingredient'
import Step from '../models/Step'

export enum Stat {
  Duration,
  Servings,
}

type Recipe = {
  id: string
  name: string
  keywords: string[]
  imageUrl: string
  stats: { [id: string]: Measure }
  ingredients: string
  steps: string
  createdAt: Date | null
  updatedAt?: Date | null
  originUrl?: string
  author?: string
}

export type FormattedRecipe = {
  id: string
  name: string
  keywords: string[]
  imageUrl: string
  stats: { [id: string]: Measure }
  ingredients: Ingredient[]
  steps: Step[]
  createdAt: Date | null
  updatedAt?: Date | null
  originUrl?: string
  author?: string
}

export default Recipe

export const createRecipe = (): Recipe => ({
  id: uuidv4(),
  name: '',
  keywords: [],
  imageUrl: 'https://images.unsplash.com/photo-1601740982034-56bc80e986ee',
  stats: {},
  ingredients: '',
  steps: '',
  createdAt: null,
  updatedAt: null,
})
