import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { XIcon, CheckIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

import { useAppDispatch } from 'hooks/redux'
import Page from 'components/templates/Page'
import RecipeEditor from 'components/organisms/RecipeEditor'
import TopBarButton from 'components/molecules/TopBarButton'
import TopBar from 'components/atoms/TopBar'

import parseWrittenRecipe from 'utils/parseWrittenRecipe'
import { addRecipe } from 'store'

const CreateRecipe = () => {
  const [saved, setSaved] = useState(false)

  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [servings, setServings] = useState('')
  const [duration, setDuration] = useState('')
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1601740982034-56bc80e986ee'
  )

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const save = () => {
    try {
      const newRecipe = parseWrittenRecipe(
        recipeName,
        ingredients,
        steps,
        keywords,
        `${servings}`,
        `${duration}`,
        imageUrl,
        { id: uuidv4() }
      )

      dispatch(addRecipe(newRecipe)).unwrap()
      navigate('/recipes')
    } catch (error) {
      console.log('error', error)
    }
  }

  const { t } = useTranslation()

  const disabled = recipeName.length === 0

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <Page title={t('_Create Recipe')}>
      <RecipeEditor
        saved={saved}
        name={recipeName}
        ingredients={ingredients}
        steps={steps}
        duration={duration}
        servings={servings}
        onNameChange={setRecipeName}
        onIngredientsChange={setIngredients}
        onStepsChange={setSteps}
        onDurationChange={setDuration}
        onServingsChange={setServings}
        imageUrl={imageUrl}
        onImageUrlChange={setImageUrl}
        keywords={keywords}
        onKeywordsChange={setKeywords}
        ref={ref}
      />
      <TopBar restRef={ref}>
        {isMaximized => (
          <>
            <TopBarButton url="/recipes" icon={XIcon}>
              <span className="ml-0.5 hidden sm:inline text-normal">
                {t('_Cancel')}
              </span>
            </TopBarButton>
            <div className="flex-1" />
            <TopBarButton
              onClick={save}
              icon={CheckIcon}
              className={classNames(
                'rounded-md ml-3 !text-white !bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                disabled
                  ? '!bg-indigo-300 hover:bg-indigo-700'
                  : '!bg-indigo-600 hover:bg-indigo-700'
              )}
              disabled={disabled}
            >
              <span className="ml-0.5 text-normal">{t('_Create Recipe')}</span>
            </TopBarButton>
          </>
        )}
      </TopBar>
    </Page>
  )
}

export default CreateRecipe
