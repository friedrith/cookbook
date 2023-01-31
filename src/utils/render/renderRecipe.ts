import * as linksApi from 'utils/api/links.api'

import Recipe from 'models/Recipe'

import parseLines from 'utils/parser/parseLines'
import renderSharingLink from 'utils/render/renderSharingLink'

const renderRecipe = async (
  recipe: Recipe,
  t: (k: string, options?: any) => string,
) => {
  const linkId = await linksApi.create(recipe.id)

  return `${t('_Import this recipe in CookBook', {
    link: renderSharingLink(linkId),
  })}
  
${recipe.name}

${recipe.keywords.map(k => `#${k}`).join(', ')}

${t('_Ingredients')}
${parseLines(recipe.ingredients)
  .map(s => `- ${s}\n`)
  .join('')}
${t('_Steps')} 
${parseLines(recipe.steps)
  .map(s => `- ${s}\n`)
  .join('')}`
}

export default renderRecipe
