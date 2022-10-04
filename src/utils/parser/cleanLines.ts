const cleanLine = (line: string) => line.trim().replace(/^-/, '').trim()

const cleanIngredients = (ingredients: string) =>
  ingredients.split('\n').map(cleanLine).filter(Boolean)

export default cleanIngredients
