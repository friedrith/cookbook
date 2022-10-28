import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'hooks/redux'
import Page from 'components/templates/Page'
import RecipeEditor from 'components/organisms/RecipeEditor'
import Header from 'components/atoms/Header'
import BackButton from 'components/molecules/BackButton'

import { createRecipe } from 'models/Recipe'
import { addRecipe } from 'store'
import Button from 'components/atoms/Button'
import DeleteConfirmationPopup from 'components/organisms/DeleteConfirmationPopup'
import usePopup from 'hooks/usePopup'
import useEventListener from 'hooks/useEventListener'

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
      console.log('error', error)
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
    return
  })

  return (
    <Page title={t('_Create Recipe')}>
      <RecipeEditor recipe={recipe} onChange={setRecipe} ref={ref} />
      <Header restRef={ref}>
        {isMaximized => (
          <>
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
            <Button.Icon
              onClick={save}
              icon={CheckIcon}
              // className={classNames(
              //   'rounded-md ml-3 !text-white !bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              // )}
              blur={disabled}
              disabled={disabled}
              title="Save new recipe"
            />
          </>
        )}
      </Header>
      <DeleteConfirmationPopup
        open={deleteConfirmationPopup.isOpen}
        onClose={deleteConfirmationPopup.close}
        onSubmit={confirmLosing}
      />
    </Page>
  )
}

export default RecipeNew
