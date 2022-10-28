import Recipe from 'models/Recipe'
import renderRecipe from 'utils/render/renderRecipe'

const sendToClipboard = (text: string) => navigator.clipboard.writeText(text)

enum SharingStatus {
  Shared,
  ShareCancelled,
  CopiedToClipboard,
}

type SharingResult = {
  status: SharingStatus
}

export const canShare = () => typeof navigator.share === 'function'

export const share = async (text: string): Promise<SharingResult> => {
  if (!canShare()) {
    await sendToClipboard(text)
    return { status: SharingStatus.CopiedToClipboard }
  }
  try {
    await navigator.share({ text })
    return { status: SharingStatus.Shared }
  } catch (err) {
    return { status: SharingStatus.ShareCancelled }
  }
}

export const shareRecipe = async (recipe: Recipe): Promise<SharingResult> => {
  return await share(renderRecipe(recipe))
}

export const isCopiedToClipboard = (result: SharingResult) =>
  result.status === SharingStatus.CopiedToClipboard

export const isShared = (result: SharingResult) =>
  result.status === SharingStatus.Shared
