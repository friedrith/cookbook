import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Page from 'components/templates/Page'
import RecipeEditor from 'components/organisms/RecipeEditor'
import SavingIndicator from 'components/molecules/SavingIndicator'
import TopBar from 'components/atoms/TopBar'
import RecipeHeader from 'components/molecules/RecipeHeader'
import Recipe from 'models/Recipe'
import NotFound404 from 'components/views/NotFound404'
import Loading from 'components/views/Loading'
import Button from 'components/atoms/Button'

import {
  getRecipe,
  updateRecipe,
  addRecipeToDeleteQueue,
  areRecipesFetched,
} from 'store'

const RecipeEdit = () => {
  const { recipeId } = useParams()
  const savedRecipe = useAppSelector(state => getRecipe(state, recipeId))
  const areFetched = useAppSelector(areRecipesFetched)

  const [recipe, setRecipe] = useState(savedRecipe)

  const [saved, setSaved] = useState(true)

  useEffect(() => {
    if (!recipe?.name) {
      setRecipe(savedRecipe)
    }
  }, [savedRecipe, recipe?.name])

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
        } catch (error) {
          console.log('error', error)
        }
      }
    }, 500)
  }

  const requestDeleteRecipe = async () => {
    await dispatch(addRecipeToDeleteQueue(recipe)).unwrap()
    navigate(`/recipes`)
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
        <div className="py-10 flex justify-center">
          <Button.Error onClick={requestDeleteRecipe}>
            <TrashIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            {t('_delete recipe')}
          </Button.Error>
        </div>
      </RecipeEditor>

      <TopBar restRef={ref}>
        {isMaximized => (
          <>
            <Button.Icon url={`/recipes/${recipe.id}`} icon={ArrowLeftIcon} />
            {isMaximized ? (
              <RecipeHeader
                recipeName={recipe?.name}
                keywords={recipe?.keywords}
              >
                {saving && <SavingIndicator className="ml-5" />}
              </RecipeHeader>
            ) : (
              <>{saving && <SavingIndicator className="ml-2" />}</>
            )}
          </>
        )}
      </TopBar>
    </Page>
  )
}

export default RecipeEdit
