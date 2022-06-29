import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PencilIcon } from '@heroicons/react/outline'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Box from 'components/atoms/Box'
import Badge from 'components/atoms/Badge'
import Stats from 'components/molecules/Stats'
import IngredientList from 'components/molecules/IngredientList'
import StepList from 'components/molecules/StepList'
import TopBar from 'components/atoms/TopBar'
import MainPage from 'components/templates/MainPage'
import classNames from 'utils/classNames'
import RecipeHeader from 'components/molecules/RecipeHeader'
import Page from 'components/templates/Page'

import { getRecipe, getRecipeProgress, setRecipeProgress } from 'store'

const RecipeDetails = () => {
  const { recipeId } = useParams()
  const recipe = useAppSelector((state) => getRecipe(state, recipeId))

  const progress = useAppSelector((state) => getRecipeProgress(state, recipeId))

  const dispatch = useAppDispatch()

  const ref = useRef<HTMLInputElement>(null)

  if (!recipe) {
    return null
  }

  const changeRecipeProgress = (index: number) => {
    dispatch(setRecipeProgress({ recipeId, index }))
  }

  return (
    <Page className="relative h-full" title={recipe.name}>
      <div className="h-96 fixed w-full overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="h-96 w-full object-center object-cover"
        />
      </div>
      <div className="h-96" />

      <MainPage className="flex-1 relative z-10">
        <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
          <Box
            className="p-4 flex-[0_0_400px] lg:max-w-screen-md relative top-[-7rem]"
            ref={ref}
          >
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate text-center lg:text-left pb-2">
              {recipe.name}
            </h1>
            <div className="text-center lg:text-left">
              {recipe.keywords.map((keyword) => (
                <Link
                  key={keyword}
                  className="mr-1"
                  to={`/recipes?q=${keyword}`}
                >
                  <Badge>{keyword}</Badge>
                </Link>
              ))}
            </div>
            <Stats recipe={recipe} />
            <div className="">
              <IngredientList recipe={recipe} />
            </div>
          </Box>
          <div className="flex-1 relative pl-4 top-[-7rem] lg:top-[0rem]">
            <StepList
              recipe={recipe}
              progress={progress}
              onSelectStep={changeRecipeProgress}
            />
          </div>
        </div>
      </MainPage>
      <TopBar restRef={ref} backButtonUrl="/recipes">
        {(isMaximized) => (
          <>
            {isMaximized ? (
              <RecipeHeader
                recipeName={recipe.name}
                keywords={recipe.keywords}
              />
            ) : (
              <div className="flex-1" />
            )}
            <Link
              className={classNames(
                'p-2 text-base font-medium text-gray-900 hover:text-gray-900 flex h-15 w-15 items-center cursor-pointer mt-4 lg:mt-6',
                isMaximized ? '' : 'bg-white shadow rounded-md'
              )}
              to="/recipes"
            >
              <PencilIcon className="h-7 w-7" aria-hidden="true" />
            </Link>
          </>
        )}
      </TopBar>
    </Page>
  )
}

export default RecipeDetails
