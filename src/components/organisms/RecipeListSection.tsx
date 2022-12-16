import classNames from 'classnames'

import Recipe from 'models/Recipe'
import RecipePreview from 'components/molecules/RecipePreview'
import useFullWidth from 'hooks/useFullWidth'

type Props = {
  title?: string
  recipes: Recipe[]
}

const RecipeListSection = ({ title, recipes }: Props) => {
  const isFullWidth = useFullWidth()

  return (
    <div className="pb-10 md:pb-20">
      {title && (
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-2 text-sm text-gray-500">{title}</span>
          </div>
        </div>
      )}
      <div
        className={classNames(
          'mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4',
          {
            'xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-7': isFullWidth,
          }
        )}
      >
        {recipes.map(recipe => (
          <RecipePreview key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default RecipeListSection
