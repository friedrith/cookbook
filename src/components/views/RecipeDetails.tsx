import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { Helmet } from 'react-helmet'

import { useAppSelector, useAppDispatch } from 'hooks/redux'
import Box from 'components/atoms/Box'
import Badge from 'components/atoms/Badge'
import Stats from 'components/molecules/Stats'
import IngredientList from 'components/molecules/IngredientList'
import StepList from 'components/molecules/StepList'
import TopBar from 'components/molecules/TopBar'

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
    <div className="relative h-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{recipe.name} - CookBook</title>
      </Helmet>

      <div className="h-96 fixed w-full overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="h-96 w-full object-center object-cover"
        />
      </div>
      <div className="h-96" />

      <div className="flex-1 bg-white relative z-10 px-4 lg:px-10 ">
        <div className="max-w-screen-xl m-auto flex flex-col items-stretch lg:flex-row lg:items-start">
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
      </div>
      <TopBar recipe={recipe} restRef={ref} />
    </div>
  )
}

export default RecipeDetails
