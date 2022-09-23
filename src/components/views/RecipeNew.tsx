import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { XIcon, CheckIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { useAppDispatch } from 'hooks/redux'
import Page from 'components/templates/Page'
import RecipeEditor from 'components/organisms/RecipeEditor'
import TopBar from 'components/atoms/TopBar'
import { createRecipe } from 'models/Recipe'
import { addRecipe } from 'store'
import Button from 'components/atoms/Button'

const RecipeNew = () => {
  const [recipe, setRecipe] = useState(createRecipe())

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const save = () => {
    try {
      dispatch(addRecipe(recipe)).unwrap()
      navigate('/recipes')
    } catch (error) {
      console.log('error', error)
    }
  }

  const { t } = useTranslation()

  const disabled = recipe.name.length === 0

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <Page title={t('_Create Recipe')}>
      <RecipeEditor recipe={recipe} onChange={setRecipe} ref={ref} />
      <TopBar restRef={ref}>
        {isMaximized => (
          <>
            <Button.Icon url="/recipes" icon={XIcon} label={t('_Cancel')} />
            <div className="flex-1" />
            <Button.Icon
              onClick={save}
              icon={CheckIcon}
              className={classNames(
                'rounded-md ml-3 !text-white !bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                disabled ? 'opacity-70' : 'opacity-100'
              )}
              disabled={disabled}
              label={t('_Create Recipe')}
            />
          </>
        )}
      </TopBar>
    </Page>
  )
}

export default RecipeNew
