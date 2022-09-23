const cleanLine = (line: string) => line.replace(/^-/, '').trim()

const noEmptyLine = (line: string) => line !== ''

const cleanIngredients = (ingredients: string) =>
  ingredients.split('\n').map(cleanLine).filter(noEmptyLine)

export default cleanIngredients
