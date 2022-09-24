import { useState } from 'react'
import { ShareIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import Recipe from 'models/Recipe'
import Modal from 'components/atoms/Modal'
import { shareRecipe, shareIngredients, isCopiedToClipboard } from 'utils/share'

type Props = {
  open: boolean
  recipe: Recipe
  onClose: () => void
}

const waitFor = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds))

const ShareModal = ({ open, recipe, onClose }: Props) => {
  const { t } = useTranslation()

  const [sharedIngredientsWithClipboard, setSharedIngredientsWithClipboard] =
    useState(false)

  const [sharedRecipeWithClipboard, setSharedRecipeWithClipboard] =
    useState(false)

  return (
    <Modal open={open} onClose={onClose} icon={ShareIcon}>
      <button
        type="button"
        className="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        onClick={async () => {
          const result = await shareIngredients(recipe)
          setSharedIngredientsWithClipboard(isCopiedToClipboard(result))
          await waitFor(1000)
          onClose()
          await waitFor(500)
          setSharedIngredientsWithClipboard(false)
        }}
      >
        {sharedIngredientsWithClipboard
          ? t('_Ingredients copied to clipboard')
          : t('_Share Ingredients')}
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        onClick={async () => {
          const result = await shareRecipe(recipe)
          setSharedRecipeWithClipboard(isCopiedToClipboard(result))
          await waitFor(1000)
          onClose()
          await waitFor(500)
          setSharedIngredientsWithClipboard(false)
        }}
      >
        {sharedRecipeWithClipboard
          ? t('_Recipe copied to clipboard')
          : t('_Share Recipe')}
      </button>
    </Modal>
  )
}

export default ShareModal
