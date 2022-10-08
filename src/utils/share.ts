import Recipe from 'models/Recipe'
import Ingredient from 'models/Ingredient'
import renderRecipe from 'utils/render/renderRecipe'
import renderIngredients from 'utils/render/renderIngredients'

const sendToClipboard = (text: string) => navigator.clipboard.writeText(text)

enum SharingStatus {
  Share,
  Clipboard,
}

type SharingResult = {
  status: SharingStatus
  isCopied: boolean
}

const share = async (text: string): Promise<SharingResult> => {
  try {
    await navigator.share({ text })
    return { status: SharingStatus.Share, isCopied: false }
  } catch (err) {
    console.error('Share Api is not working')
    sendToClipboard(text)
    return { status: SharingStatus.Clipboard, isCopied: true }
  }
}

export const shareIngredients = async (
  ingredients: Ingredient[]
): Promise<SharingResult> => {
  return await share(renderIngredients(ingredients))
}

export const shareRecipe = async (recipe: Recipe): Promise<SharingResult> => {
  return await share(renderRecipe(recipe))
}

export const isCopiedToClipboard = (status: SharingStatus) =>
  status === SharingStatus.Clipboard
