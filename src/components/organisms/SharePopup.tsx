import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Recipe from '@/models/Recipe'
import Modal, { PopupType } from '@/components/atoms/Modal'
import {
  isCopiedToClipboard,
  shareText,
  isShared,
} from '@/utils/services/share'
import waitFor from '@/utils/waitFor'
import renderTextRecipe from '@/features/recipes/utils/renderTextRecipe'
import Button from '@/components/atoms/Button'
import TextArea from '@/components/atoms/TextArea'
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

  const [shareableRecipe, setShareableRecipe] = useState('')

  useEffect(() => {
    const createShareable = async () => {
      setShareableRecipe(await renderTextRecipe(recipe, t))
    }
    createShareable().catch(console.error)
  }, [recipe, t])

  const startSharingText = async () => {
    const result = await shareText(shareableRecipe)

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
      icon={ShareIcon}
      type={PopupType.Black}
      open={open}
      onClose={onClose}
      title={t('_Share Recipe')}
    >
      <TextArea.Normal
        value={shareableRecipe}
        className="h-32 resize-none"
        id="recipe"
        onChange={() => {}}
      />
      <Button.Black className="w-full mt-4" onClick={startSharingText}>
        {sharedRecipeWithClipboard
          ? t('_Recipe copied to clipboard')
          : t('_Copy Recipe to clipboard')}
      </Button.Black>
    </Modal>
  )
}

export default SharePopup
