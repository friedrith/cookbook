import Recipe from 'models/Recipe'

const renderRecipe = (recipe: Recipe) => {
  return `${recipe.name}

${recipe.keywords.map(k => `#${k}`).join(', ')}

Ingredients
${recipe.ingredients}

Steps 
${recipe.steps}  
  `
}

export default renderRecipe
