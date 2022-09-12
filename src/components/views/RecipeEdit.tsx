import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Page from 'components/templates/Page'
import RecipeEditor from 'components/organisms/RecipeEditor'
import TopBarButton from 'components/molecules/TopBarButton'
import Saved from 'components/molecules/Saved'
import TopBar from 'components/atoms/TopBar'
import RecipeHeader from 'components/molecules/RecipeHeader'

import renderWrittenRecipe from 'utils/renderWrittenRecipe'
import parseWrittenRecipe from 'utils/parseWrittenRecipe'
import { getRecipe, updateRecipe, deleteRecipe } from 'store'

const RecipeEdit = () => {
  const { recipeId } = useParams()
  const recipe = useAppSelector(state => getRecipe(state, recipeId))

  const [saved, setSaved] = useState(false)

  const writtenRecipe = recipe ? renderWrittenRecipe(recipe) : undefined

  const [recipeName, setRecipeName] = useState(writtenRecipe?.name || '')
  const [ingredients, setIngredients] = useState(
    writtenRecipe?.ingredients || ''
  )
  const [steps, setSteps] = useState(writtenRecipe?.steps || '')
  const [keywords, setKeywords] = useState<string[]>(
    writtenRecipe?.keywords || []
  )
  const [servings, setServings] = useState(writtenRecipe?.servings || '')
  const [duration, setDuration] = useState(writtenRecipe?.duration || '')
  const [imageUrl, setImageUrl] = useState(writtenRecipe?.imageUrl || '')

  useEffect(() => {
    if (!recipeName) {
      const writtenRecipe = recipe ? renderWrittenRecipe(recipe) : undefined
      setRecipeName(writtenRecipe?.name || '')
      setIngredients(writtenRecipe?.ingredients || '')
      setSteps(writtenRecipe?.steps || '')
      setKeywords(writtenRecipe?.keywords || [])
      setServings(writtenRecipe?.servings || '')
      setDuration(writtenRecipe?.duration || '')
    }
  }, [recipe])

  const dispatch = useAppDispatch()

  const timeout = useRef<undefined | NodeJS.Timeout>(undefined)

  const navigate = useNavigate()

  const ref = useRef<HTMLDivElement | null>(null)

  if (!recipe) {
    return null
  }

  const saveDebounced = (
    newRecipeName: string,
    newIngredients: string,
    newSteps: string,
    newKeywords: string[],
    newServings: number | string,
    newDuration: number | string,
    newImageUrl: string
  ) => {
    clearInterval(timeout.current)
    setSaved(false)

    timeout.current = setTimeout(() => {
      if (recipe) {
        try {
          const updatedRecipe = parseWrittenRecipe(
            newRecipeName,
            newIngredients,
            newSteps,
            newKeywords,
            `${newServings}`,
            `${newDuration}`,
            newImageUrl,
            recipe
          )

          dispatch(updateRecipe(updatedRecipe)).unwrap()

          setSaved(true)
        } catch (error) {
          console.log('error', error)
        }
      }
    }, 500)
  }

  const requestDeleteRecipe = async () => {
    await dispatch(deleteRecipe(recipe)).unwrap()
    navigate('/recipes')
  }

  return (
    <Page title={recipe.name}>
      <RecipeEditor
        ref={ref}
        saved={saved}
        name={recipeName}
        ingredients={ingredients}
        steps={steps}
        duration={duration}
        servings={servings}
        onNameChange={name => {
          setRecipeName(name)
          saveDebounced(
            name,
            ingredients,
            steps,
            keywords,
            servings,
            duration,
            imageUrl
          )
        }}
        onIngredientsChange={ingredients => {
          setIngredients(ingredients)
          saveDebounced(
            recipeName,
            ingredients,
            steps,
            keywords,
            servings,
            duration,
            imageUrl
          )
        }}
        onStepsChange={steps => {
          setSteps(steps)
          saveDebounced(
            recipeName,
            ingredients,
            steps,
            keywords,
            servings,
            duration,
            imageUrl
          )
        }}
        onDurationChange={duration => {
          setDuration(duration)
          saveDebounced(
            recipeName,
            ingredients,
            steps,
            keywords,
            servings,
            duration,
            imageUrl
          )
        }}
        onServingsChange={servings => {
          setServings(servings)
          saveDebounced(
            recipeName,
            ingredients,
            steps,
            keywords,
            servings,
            duration,
            imageUrl
          )
        }}
        imageUrl={imageUrl}
        onImageUrlChange={imageUrl => {
          setImageUrl(imageUrl)
          saveDebounced(
            recipeName,
            ingredients,
            steps,
            keywords,
            servings,
            duration,
            imageUrl
          )
        }}
        keywords={keywords}
        onKeywordsChange={keywords => {
          setKeywords(keywords)
          saveDebounced(
            recipeName,
            ingredients,
            steps,
            keywords,
            servings,
            duration,
            imageUrl
          )
        }}
      ></RecipeEditor>

      <TopBar restRef={ref}>
        {isMaximized => (
          <>
            <TopBarButton url="/recipes" icon={ArrowLeftIcon}>
              {false && (
                <div className="absolute bottom-0 right-0 w-0 h-0 hidden sm:block">
                  <div className="rounded-full absolute top-[-0.375rem] left-[-0.375rem] w-3 h-3 bg-lime-600" />
                  <Saved className="absolute top-0 left-0" />
                </div>
              )}
            </TopBarButton>
            {isMaximized ? (
              <RecipeHeader
                recipeName={recipeName}
                keywords={keywords}
                saved={saved}
              />
            ) : (
              <>{saved && <Saved className="ml-2" />}</>
            )}
            <div className="flex-1" />
            <TopBarButton onClick={requestDeleteRecipe} icon={TrashIcon} />
          </>
        )}
      </TopBar>
    </Page>
  )
}

export default RecipeEdit
