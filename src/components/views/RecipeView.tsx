import { useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/outline'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Box from 'components/atoms/Box'
import Badge from 'components/atoms/Badge'
import IngredientList from 'components/organisms/IngredientList'
import StepList from 'components/molecules/StepList'
import Header from 'components/atoms/Header'
import RecipeHeader from 'components/molecules/RecipeHeader'
import Page from 'components/templates/Page'
import ImageBanner from 'components/molecules/ImageBanner'
import Loading from 'components/views/Loading'
import NotFound404 from 'components/views/NotFound404'
import Button from 'components/atoms/Button'
import SharePopup from 'components/organisms/SharePopup'
import usePopup from 'hooks/usePopup'

import {
  getRecipe,
  getRecipeProgress,
  setRecipeProgress,
  areRecipesFetched,
} from 'store'
import LargeMainPage from 'components/templates/LargeMainPage'
import parseRecipe from 'utils/parser/parseRecipe'

const position = (isMaximized: boolean) =>
  isMaximized ? `md:fixed md:top-[-1rem]` : 'relative'

const RecipeDetails = () => {
  const { recipeId } = useParams()
  const recipe = useAppSelector(state => getRecipe(state, recipeId))
  const areFetched = useAppSelector(areRecipesFetched)

  const progress = useAppSelector(state => getRecipeProgress(state, recipeId))

  const dispatch = useAppDispatch()

  const ref = useRef<HTMLInputElement>(null)

  const [isMaximized, setMaximized] = useState(false)

  const sharePopup = usePopup()

  const formattedRecipe = useMemo(
    () => (recipe ? parseRecipe(recipe) : null),
    [recipe]
  )

  if (!recipe || !formattedRecipe) {
    if (!areFetched) {
      return <Loading />
    }
    return <NotFound404 />
  }

  const changeRecipeProgress = (index: number) => {
    dispatch(setRecipeProgress({ recipeId, index }))
  }

  return (
    <Page title={recipe.name}>
      <ImageBanner imageUrl={recipe.imageUrl} alt={recipe.name} />
      <LargeMainPage className="flex-1 relative z-10">
        <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
          <div ref={ref} />
          <div className="flex-[0_0_400px] lg:max-w-screen-md relative top-[-7rem]">
            <Box className={`p-4 md:w-[400px] ${position(isMaximized)}`}>
              <h1 className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900 break-words overflow-hidden text-center lg:text-left pb-2">
                {formattedRecipe.name}
              </h1>
              <div className="text-center lg:text-left">
                {formattedRecipe.keywords.map(keyword => (
                  <Link
                    key={keyword}
                    className="mr-1"
                    to={`/recipes?q=${keyword}`}
                  >
                    <Badge>{keyword}</Badge>
                  </Link>
                ))}
              </div>
              {/* <Stats recipe={formattedRecipe} /> */}
              <div className="pt-6">
                <IngredientList recipe={formattedRecipe} />
              </div>
            </Box>
          </div>

          <div className="flex-1 relative pl-4 top-[-5rem] lg:top-[0rem]">
            <StepList
              recipe={formattedRecipe}
              progress={progress}
              onSelectStep={changeRecipeProgress}
            />
          </div>
        </div>
      </LargeMainPage>
      <Header restRef={ref} onMaximizedChanged={setMaximized}>
        {isMaximized => (
          <>
            <Button.Icon url="/recipes" icon={ArrowLeftIcon} />
            {isMaximized ? (
              <RecipeHeader
                recipeName={formattedRecipe.name}
                keywords={formattedRecipe.keywords}
              />
            ) : (
              <div className="flex-1" />
            )}
            {/* <Button.Icon
              className="mr-3"
              onClick={sharePopup.open}
              icon={ShareIcon}
              blur
            /> */}
            <Button.Icon
              url={`/recipes/${recipeId}/edit`}
              icon={PencilIcon}
              blur
            />
          </>
        )}
      </Header>
      <SharePopup
        recipe={recipe}
        open={sharePopup.isOpen}
        onClose={sharePopup.close}
      />
    </Page>
  )
}

export default RecipeDetails
