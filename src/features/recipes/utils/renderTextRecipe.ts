import * as linksApi from '~/src/utils/api/links.api'

import Recipe from '~/src/types/Recipe'

import parseLines from '~/src/utils/parseLines'
import { renderSharingLink } from '~/src/utils/urls/sharingLinks'

const renderTextRecipe = async (
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
  .join('')}`.trim()
}

export default renderTextRecipe
