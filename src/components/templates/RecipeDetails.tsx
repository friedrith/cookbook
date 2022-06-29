import { useRef } from 'react'
import { Link } from 'react-router-dom'

import Box from 'components/atoms/Box'
import Badge from 'components/atoms/Badge'
import Stats from 'components/molecules/Stats'
import IngredientList from 'components/molecules/IngredientList'
import StepList from 'components/molecules/StepList'
import TopBar from 'components/molecules/TopBar'
import MainPage from 'components/templates/MainPage'
import Recipe from 'models/Recipe'

type Props = {
  recipe: Recipe
  progress: number
  changeRecipeProgress: (index: number) => void
}

const RecipeDetails = ({ recipe, progress, changeRecipeProgress }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <>
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
      <TopBar
        recipeName={recipe.name}
        keywords={recipe.keywords}
        restRef={ref}
      />
    </>
  )
}

export default RecipeDetails
