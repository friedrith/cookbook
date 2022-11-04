type Recipe = {
  id: string
  name: string
  keywords: string[]
  imageUrl: string
  stats: {}
  ingredients: string
  steps: string
  createdAt: string
  updatedAt?: string
  originUrl?: string
  author?: string
  userId: string
}

export default Recipe
