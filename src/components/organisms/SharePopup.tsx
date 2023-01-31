import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Recipe from 'models/Recipe'
import Modal, { PopupType } from 'components/atoms/Modal'
import { isCopiedToClipboard, shareText, isShared } from 'utils/share'
import waitFor from 'utils/waitFor'
import renderRecipe from 'utils/render/renderRecipe'
import Button from 'components/atoms/Button'
import TextArea from 'components/atoms/TextArea'

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
      setShareableRecipe(await renderRecipe(recipe, t))
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
