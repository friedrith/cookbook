import Recipe from 'models/Recipe'

import parseLines from 'utils/parser/parseLines'

const renderRecipe = (recipe: Recipe) => {
  return `${recipe.name}

${recipe.keywords.map(k => `#${k}`).join(', ')}

Ingredients
${parseLines(recipe.ingredients)
  .map(s => `- ${s}\n`)
  .join('')}

Steps 
${parseLines(recipe.steps)
  .map(s => `- ${s}\n`)
  .join('')}  
`
}

export default renderRecipe
