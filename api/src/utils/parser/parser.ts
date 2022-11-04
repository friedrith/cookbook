import * as genericParser from './utils/genericParser'

// inspired from https://github.com/SoTrxII/marmiton-api/blob/master/src/components/recipes-parser.ts
export const parseRecipe = async (url: string, dom: string) => {
  return genericParser.parseRecipe(dom)
}
