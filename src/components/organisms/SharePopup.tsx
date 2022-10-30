import { useState } from 'react'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import Recipe from 'models/Recipe'
import Modal from 'components/atoms/Modal'
import { isCopiedToClipboard, share, isShared } from 'utils/share'
import waitFor from 'utils/waitFor'
import renderRecipe from 'utils/render/renderRecipe'

type Props = {
  open: boolean
  recipe: Recipe
  onClose: () => void
}

const ShareModal = ({ open, recipe, onClose }: Props) => {
  const { t } = useTranslation()

  const [sharedRecipeWithClipboard, setSharedRecipeWithClipboard] =
    useState(false)

  const startSharing = async () => {
    const result = await share(renderRecipe(recipe))

    if (isCopiedToClipboard(result)) {
      setSharedRecipeWithClipboard(true)
      await waitFor(2500)
      onClose()
      setSharedRecipeWithClipboard(false)
    } else if (isShared(result)) {
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} icon={ClipboardDocumentIcon}>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        onClick={startSharing}
      >
        {sharedRecipeWithClipboard
          ? t('_Recipe copied to clipboard')
          : t('_Copy Recipe to clipboard')}
      </button>
    </Modal>
  )
}

export default ShareModal
