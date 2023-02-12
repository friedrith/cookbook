import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import Page from '@/components/templates/Page'
import RecipeEditor from '@/components/organisms/RecipeEditor'
import SavingIndicator from '@/components/molecules/SavingIndicator'
import FixedHeader from '@/components/atoms/FixedHeader'
import Header from '@/components/atoms/Header'
import RecipeHeader from '@/components/molecules/RecipeHeader'
import Recipe from '@/models/Recipe'
import NotFound404 from '@/components/views/NotFound404'
import Loading from '@/components/templates/Loading'
import Button from '@/components/atoms/Button'
import BackButton from '@/components/molecules/BackButton'

import {
  getRecipe,
  updateRecipe,
  addRecipeToDeleteQueue,
  areRecipesFetched,
  addRecipe,
} from '@/store'
import duplicateName from '@/features/recipes/utils/duplicateName'

const RecipeEdit = () => {
  const { recipeId } = useParams()
  const savedRecipe = useAppSelector(state => getRecipe(state, recipeId))
  const areFetched = useAppSelector(areRecipesFetched)

  const [recipe, setRecipe] = useState(savedRecipe)

  const [saved, setSaved] = useState(true)
  const [savedAtLeastOnce, setSavedAtLeastOnce] = useState(false)

  useEffect(() => {
    if (!recipe?.name) {
      setRecipe(savedRecipe)
    }
  }, [savedRecipe, recipe?.name])

  useEffect(() => {
    if (savedRecipe) {
      setRecipe(savedRecipe)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId])

  const dispatch = useAppDispatch()

  const timeout = useRef<undefined | NodeJS.Timeout>(undefined)

  const navigate = useNavigate()

  const ref = useRef<HTMLDivElement | null>(null)

  const { t } = useTranslation()

  if (!recipe || !savedRecipe) {
    if (!areFetched) {
      return <Loading />
    }
    return <NotFound404 />
  }

  const saveDebounced = (newRecipe: Recipe) => {
    clearInterval(timeout.current)
    setSaved(false)
    setRecipe(newRecipe)

    timeout.current = setTimeout(() => {
      if (newRecipe) {
        try {
          dispatch(updateRecipe(newRecipe)).unwrap()

          setSaved(true)
          setSavedAtLeastOnce(true)
        } catch (error) {
          console.log('error', error)
        }
      }
    }, 2000)
  }

  const requestDeleteRecipe = async () => {
    await dispatch(addRecipeToDeleteQueue(recipe)).unwrap()
    navigate(`/recipes`)
  }

  const duplicate = async () => {
    try {
      const newRecipe = await dispatch(
        addRecipe({ ...recipe, name: duplicateName(recipe.name) }),
      ).unwrap()
      navigate(`/recipes/${newRecipe.id}/edit`, { replace: true })
    } catch (error) {
      console.log('error', error)
    }
  }

  const saving = !saved

  return (
    <Page title={recipe.name}>
      <RecipeEditor
        ref={ref}
        saved={saved}
        recipe={recipe}
        onChange={saveDebounced}
      >
        {savedAtLeastOnce && saved && (
          <div className="py-10 pt-10 flex flex-col items-center justify-center">
            <div className="px-2 py-1 rounded font-semibold text-lg bg-teal-100 text-teal-800 flex items-center">
              {t('editor._Saved')}
              <CheckCircleIcon className="h-6 w-6 ml-2" />
            </div>
            <div className="pt-2 text-sm font-medium text-gray-500">
              {t(
                'editor._No need to save manually. Everything is saved in really time.',
              )}
            </div>
          </div>
        )}
        {saving && (
          <div className="py-10 pt-10 flex flex-col items-center justify-center">
            <div className="px-2 py-1 rounded font-semibold text-lg bg-orange-100 text-orange-800 flex items-center">
              {t('editor._Saving in progress...')}
            </div>
          </div>
        )}
        <div className="py-10 pt-20 flex items-center justify-end gap-x-2">
          <Button.White onClick={duplicate}>
            <DocumentDuplicateIcon
              className="h-5 w-5 mr-2"
              aria-hidden="true"
            />
            {t('_duplicate recipe')}
          </Button.White>
          <Button.Black onClick={requestDeleteRecipe}>
            <TrashIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            {t('_delete recipe')}
          </Button.Black>
        </div>
      </RecipeEditor>

      <FixedHeader restRef={ref} className="pointer-events-none">
        {isMaximized => (
          <Header white={isMaximized}>
            <BackButton
              url={`/recipes/${recipe.id}`}
              disabled={saving}
              title={t('_Back to recipe')}
            />
            {isMaximized ? (
              <RecipeHeader
                recipeName={recipe?.name}
                keywords={recipe?.keywords}
              >
                {saving && (
                  <>
                    <SavingIndicator className="ml-5" />
                    <div className="flex-1" />
                  </>
                )}
              </RecipeHeader>
            ) : (
              <>
                {saving && (
                  <>
                    <SavingIndicator className="ml-2" />{' '}
                    <div className="flex-1" />
                  </>
                )}
              </>
            )}
          </Header>
        )}
      </FixedHeader>
    </Page>
  )
}

export default RecipeEdit
