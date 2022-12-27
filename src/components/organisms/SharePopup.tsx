import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Recipe from 'models/Recipe'
import Modal, { PopupType } from 'components/atoms/Modal'
import { isCopiedToClipboard, share, isShared } from 'utils/share'
import waitFor from 'utils/waitFor'
import renderRecipe from 'utils/render/renderRecipe'
import Button from 'components/atoms/Button'
import ShareIcon from 'assets/ShareIcon'

type Props = {
  open: boolean
  recipe: Recipe
  onClose: () => void
}

const SharePopup = ({ open, recipe, onClose }: Props) => {
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
    <Modal
      type={PopupType.Black}
      open={open}
      onClose={onClose}
      icon={ShareIcon}
    >
      <Button.Black className="w-full" onClick={startSharing}>
        {sharedRecipeWithClipboard
          ? t('_Recipe copied to clipboard')
          : t('_Copy Recipe to clipboard')}
      </Button.Black>
    </Modal>
  )
}

export default SharePopup
