import { HTMLElement, parse } from 'node-html-parser'

const getCleanText = (e: HTMLElement) => {
  return (
    e?.text
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
      .replace(/(\d)([A-Za-z]{2,})/, '$1 $2')
  )
}

// inspired from https://github.com/SoTrxII/marmiton-api/blob/master/src/components/recipes-parser.ts
export const parseRecipe = (dom: string) => {
  // Set "raw" attributes. These doesn't need any processing steps
  const recipeRoot = parse(dom)

  let recipe: any = recipeRoot
    .querySelectorAll('script[type="application/ld+json"]')
    .map(el => JSON.parse(getCleanText(el.childNodes[0] as HTMLElement)))
    // Not really needed but just to be sure
    .find(r => r['@type'] === 'Recipe')

  if (recipe === undefined) {
    throw new Error('impossible to find recipe')
  }

  return {
    name: recipe.name || '',
    keywords: recipe.keywords
      .split(',')
      .map((k: string) => k.trim())
      .filter(Boolean),
    imageUrl: recipe.image[recipe.image.length - 1] || '',
    stats: {},
    ingredients: recipe.recipeIngredient
      .map((l: string) => `- ${l}`)
      .join('\n'),
    steps: recipe.recipeInstructions
      .map((l: { text: string }): string => l.text)
      .map((l: string) => `- ${l}`)
      .join('\n'),
    author: recipe.author,
  }
}
