const sendToClipboard = (text: string) => navigator.clipboard.writeText(text)

enum SharingStatus {
  Shared,
  ShareCancelled,
  CopiedToClipboard,
  Downloaded,
}

type SharingResult = {
  status: SharingStatus
}

export const canShare = () => typeof navigator.share === 'function'

export const shareText = async (text: string): Promise<SharingResult> => {
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

export const isCopiedToClipboard = (result: SharingResult) =>
  result.status === SharingStatus.CopiedToClipboard

export const isShared = (result: SharingResult) =>
  result.status === SharingStatus.Shared
