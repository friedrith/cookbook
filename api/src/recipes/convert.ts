const convert = (recipe: any) => ({
  ...recipe,
  createdAt: new Date(recipe.createdAt),
  updatedAt: recipe.updatedAt ? new Date(recipe.updatedAt) : null,
})

export default convert
