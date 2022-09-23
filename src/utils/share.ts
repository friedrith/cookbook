import Recipe from 'models/Recipe'
import renderRecipe from 'utils/render/renderRecipe'
import renderIngredients from 'utils/render/renderIngredients'

const sendToClipboard = (text: string) => navigator.clipboard.writeText(text)

enum SharingStatus {
  Share,
  Clipboard,
}

const share = async (text: string): Promise<SharingStatus> => {
  try {
    await navigator.share({ text })
    return SharingStatus.Share
  } catch (err) {
    console.error('Share Api is not working')
    sendToClipboard(text)
    return SharingStatus.Clipboard
  }
}

export const shareIngredients = async (
  recipe: Recipe
): Promise<SharingStatus> => {
  return await share(renderIngredients(recipe))
}

export const shareRecipe = async (recipe: Recipe): Promise<SharingStatus> => {
  return await share(renderRecipe(recipe))
}

export const isCopiedToClipboard = (status: SharingStatus) =>
  status === SharingStatus.Clipboard
