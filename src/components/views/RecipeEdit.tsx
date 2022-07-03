import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import TopBar from 'components/atoms/TopBar'
import MainPage from 'components/templates/MainPage'
import RecipeHeader from 'components/molecules/RecipeHeader'
import Page from 'components/templates/Page'
import PrimaryButton from 'components/atoms/PrimaryButton'
import StatInput from 'components/molecules/StatInput'

import renderWrittenRecipe from 'utils/renderWrittenRecipe'
import parseWrittenRecipe from 'utils/parseWrittenRecipe'
import { getRecipe, updateRecipe } from 'store'
import findUnitIcon from 'utils/findUnitIcon'
import { storeFile } from 'utils/api/firebase'
import useEventListener from 'hooks/useEventListener'

const RecipeEdit = () => {
  const { recipeId } = useParams()
  const recipe = useAppSelector(state => getRecipe(state, recipeId))

  const ref = useRef<HTMLInputElement>(null)

  const { t } = useTranslation()

  const writtenRecipe = recipe ? renderWrittenRecipe(recipe) : undefined

  const [recipeName, setRecipeName] = useState(writtenRecipe?.name || '')
  const [ingredients, setIngredients] = useState(
    writtenRecipe?.ingredients || ''
  )
  const [steps, setSteps] = useState(writtenRecipe?.steps || '')
  const [keywords, setKeywords] = useState(writtenRecipe?.keywords || '')
  const [servings, setServings] = useState(writtenRecipe?.servings || '')
  const [duration, setDuration] = useState(writtenRecipe?.duration || '')
  const [imageUrl, setImageUrl] = useState(writtenRecipe?.imageUrl || '')

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const writtenRecipe = recipe ? renderWrittenRecipe(recipe) : undefined
    setRecipeName(writtenRecipe?.name || '')
    setIngredients(writtenRecipe?.ingredients || '')
    setSteps(writtenRecipe?.steps || '')
    setKeywords(writtenRecipe?.keywords || '')
    setServings(writtenRecipe?.servings || '')
    setDuration(writtenRecipe?.duration || '')
  }, [recipe])

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  useEventListener('drop', event => {
    event.stopPropagation()
    event.preventDefault()
  })

  useEventListener('dragover', event => {
    event.stopPropagation()
    event.preventDefault()
  })

  const onSubmit = () => {
    if (recipe) {
      const updatedRecipe = parseWrittenRecipe(
        recipe,
        recipeName,
        ingredients,
        steps,
        keywords,
        `${servings}`,
        `${duration}`,
        imageUrl
      )

      if (!Array.isArray(updatedRecipe)) {
        try {
          dispatch(updateRecipe(updatedRecipe)).unwrap()

          navigate(`/recipes/${recipeId}`)
        } catch (error) {
          console.log('error', error)
        }
      } else {
        console.log('updatedRecipe', updatedRecipe)
      }
    }
  }

  const changeImageUrl = async (file: File) => {
    setIsUploading(true)
    const newImageUrl = await storeFile(file)

    setImageUrl(newImageUrl)
    setIsUploading(false)
  }

  const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files?.length > 0) {
      await changeImageUrl(event.currentTarget.files[0])
    }
  }

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer.items) {
      const item = event.dataTransfer.items[0]
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file !== null) {
          await changeImageUrl(file)
        }
      }
    }
  }

  const DurationIcon = findUnitIcon('min')
  const ServingsIcon = findUnitIcon('servings')

  if (!recipe) {
    return null
  }

  return (
    <Page title={t('_New Recipe')}>
      <div className="relative h-full">
        <div className="h-24" />
        <TopBar
          restRef={ref}
          backButtonUrl={`/recipes/${recipeId}`}
          children={isMaximized => (
            <>
              {isMaximized ? (
                <RecipeHeader
                  recipeName={recipe.name}
                  keywords={recipe.keywords}
                />
              ) : (
                <div className="flex-1" />
              )}
              <PrimaryButton onClick={onSubmit} className="ml-2">
                {t('_Save')}
              </PrimaryButton>
            </>
          )}
        ></TopBar>
        <MainPage className="flex-1 relative">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6" ref={ref}>
            <div>
              <label
                htmlFor="recipe-name"
                className="block text-sm font-medium text-gray-700"
              >
                {t('_Recipe Name')}
              </label>
              <input
                type="text"
                name="recipe-name"
                id="recipe-name"
                autoComplete="recipe-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={recipeName}
                onChange={e => setRecipeName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium text-gray-700"
              >
                {t('_Ingredients')}
              </label>
              <div className="mt-1">
                <textarea
                  id="ingredients"
                  name="ingredients"
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="- 10 g of sugar"
                  value={ingredients}
                  onChange={e => setIngredients(e.target.value)}
                ></textarea>
              </div>
              {/* <p className="mt-2 text-sm text-gray-500">
                {t('_Markdown format accepted')}
              </p> */}
            </div>
            <div>
              <label
                htmlFor="steps"
                className="block text-sm font-medium text-gray-700"
              >
                {t('_Steps')}
              </label>
              <div className="mt-1">
                <textarea
                  id="steps"
                  name="steps"
                  rows={10}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="- step 1"
                  value={steps}
                  onChange={e => setSteps(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-medium text-gray-700"
              >
                {t('_Keywords')}
              </label>
              <input
                type="text"
                name="keywords"
                id="keywords"
                autoComplete="keywords"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t('_Duration')}
                </label>
                <StatInput
                  className="mt-1"
                  id="duration"
                  value={duration}
                  type="number"
                  onChange={setDuration}
                  placeholder="20"
                  unit="min"
                  min={1}
                  icon={DurationIcon}
                />
              </div>
              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t('_Servings')}
                </label>
                <StatInput
                  className="mt-1"
                  id="servings"
                  value={servings}
                  type="number"
                  onChange={setServings}
                  placeholder="3"
                  icon={ServingsIcon}
                  min={1}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="banner"
                className="block text-sm font-medium text-gray-700"
              >
                {t('_Banner Image')}
              </label>

              <div
                className="flex justify-center items-center px-6 h-64 border-2 border-gray-300 border-dashed rounded-md"
                onDrop={onDrop}
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                {isUploading ? (
                  <svg
                    className="animate-spin h-6 w-6 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>{t('_Upload a file')}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          onChange={onUploadImage}
                        />
                      </label>
                      <p className="pl-1">{t('_or drag and drop')}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {t('_PNG, JPG, GIF up to 10MB')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MainPage>
      </div>
    </Page>
  )
}

export default RecipeEdit
