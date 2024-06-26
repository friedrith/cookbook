import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '~/src/hooks/redux'
import Page from '~/src/components/templates/Page'
import RecipeEditor from '~/src/features/recipes/components/RecipeEditor'
import FixedHeader from '~/src/components/atoms/FixedHeader'
import BackButton from '~/src/components/molecules/BackButton'

import { createRecipe } from '~/src/types/Recipe'
import { addRecipe } from '~/src/store/index'
import Button from '~/src/components/atoms/Button'
import DeleteConfirmationPopup from '~/src/features/recipes/components/DeleteConfirmationPopup'
import usePopup from '~/src/hooks/usePopup'
import useEventListener from '~/src/hooks/useEventListener'
import Header from '~/src/components/atoms/Header'

const RecipeNew = () => {
  const [recipe, setRecipe] = useState(createRecipe())

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const save = async () => {
    if (disabled) return
    try {
      const newRecipe = await dispatch(addRecipe(recipe)).unwrap()
      navigate(`/recipes/${newRecipe.id}`, { replace: true })
    } catch (error) {
      console.error('error', error)
    }
  }

  const deleteConfirmationPopup = usePopup()

  const { t } = useTranslation()

  const disabled = recipe.name.length === 0

  const ref = useRef<HTMLDivElement | null>(null)

  const confirmLosing = () => {
    navigate(-1)
  }

  useEventListener('beforeunload', event => {
    if (!disabled) {
      ;(event || window.event).returnValue = t('_If you leave')
      return t('_If you leave')
    }
  })

  return (
    <Page title={t('_Create Recipe')}>
      <RecipeEditor recipe={recipe} onChange={setRecipe} ref={ref}>
        <div className="flex justify-center">
          <Button.Primary onClick={save} disabled={disabled}>
            {t('_Save new recipe')}
          </Button.Primary>
        </div>
      </RecipeEditor>
      <FixedHeader restRef={ref}>
        {isMaximized => (
          <Header white={isMaximized}>
            {disabled ? (
              <BackButton url="/recipes" title={t('_Back to recipes')} />
            ) : (
              <Button.Icon
                icon={ArrowLeftIcon}
                title={t('_Back to recipes')}
                onClick={deleteConfirmationPopup.open}
              />
            )}
            <div className="flex-1" />
          </Header>
        )}
      </FixedHeader>
      <DeleteConfirmationPopup
        open={deleteConfirmationPopup.isOpen}
        onClose={deleteConfirmationPopup.close}
        onSubmit={confirmLosing}
      />
    </Page>
  )
}

export default RecipeNew
