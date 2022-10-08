import Recipe from 'models/Recipe'
import { endOfLine } from 'utils/platform'

const renderRecipe = (recipe: Recipe) => {
  return `${recipe.name}

${recipe.keywords.map(k => `#${k}`).join(', ')}

Ingredients
${recipe.ingredients}

Steps 
${recipe.steps}  
  `.replace(/\n/, endOfLine())
}

export default renderRecipe
