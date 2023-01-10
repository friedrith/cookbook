import { HTMLElement, parse } from 'node-html-parser'
import { first, last } from 'lodash'
import * as schemaOrgParser from './schemaOrgParser'
import authorizedKeywords from './authorizedKeywords'

export const getCleanText = (e: HTMLElement) => {
  return (
    e?.innerText
      ?.trim()

      // Replace unicode codes with characters
      .replace(/\\u([\d\w]{4})/gi, (match, grp) =>
        String.fromCharCode(parseInt(grp, 16))
      )
      // Remove all tabs, and linebreaks
      .replace(/[\n\r\t]/g, '')
      // Allow only a single space between words
      .replace(/\s+/, ' ')
    // If there is no space between the first digit and a word (ingredients)
    // add it
    // .replace(/(\d)([A-Za-z]{2,})/, '$1 $2')
  )
}

export const mergeItems = (items: any) => {
  if (Array.isArray(items)) {
    return items.map((l: string) => `- ${l}`).join('\n')
  }

  return `- ${items}`
}

export const parseKeywords = (recipe: { keywords?: string | Array<string> }) =>
  Array.isArray(recipe.keywords)
    ? recipe.keywords
    : (recipe.keywords || '')
        .split(',')
        .map((k: string) => k.trim())
        .filter(Boolean)
        .filter(k => authorizedKeywords.includes(k))

const findImageUrl = (recipe: any) => {
  return (
    [
      schemaOrgParser.parse(recipe.image, last),
      recipe?.video?.thumbnailUrl,
      recipe?.thumbnailUrl,
    ].find(Boolean) || ''
  )
}

export const cleanRecipe = (recipe: any) => {
  return {
    name: recipe.name || '',
    keywords: parseKeywords(recipe),
    stats: {},
    ingredients: mergeItems(recipe.recipeIngredient),
    steps: mergeItems(schemaOrgParser.parse(recipe.recipeInstructions)),
    author: schemaOrgParser.parse(recipe.author, first),
    imageUrl: findImageUrl(recipe),
  }
}

export const findRecipe = (root: any) =>
  root
    .querySelectorAll('script[type="application/ld+json"]')
    .map((el: any) => JSON.parse(getCleanText(el as HTMLElement)))
    .flatMap((e: any) => schemaOrgParser.parse(e))
    .flatMap((recipe: any) =>
      schemaOrgParser.hasType(recipe, 'Recipe')
        ? recipe
        : schemaOrgParser.searchInGraph(recipe)
    )
    .find((recipe: any) => schemaOrgParser.hasType(recipe, 'Recipe'))

export const parseRecipe = async (
  dom: string,
  callback = (recipe: any) => ({})
) => {
  const root = parse(dom)

  let recipe: any = findRecipe(root)

  if (!recipe) {
    throw new Error('impossible to find recipe')
  }

  return {
    ...cleanRecipe(recipe),
    ...callback(recipe),
  }
}
