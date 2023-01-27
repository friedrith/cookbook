import classNames from 'classnames'
import Recipe from 'models/Recipe'
import RecipePreview from 'features/recipes/components/RecipePreview'
import SectionTitle from 'components/atoms/SectionTitle'

type Props = {
  title?: string
  recipes: Recipe[]
  onClick?: (recipe: Recipe) => void
  className?: string
}

const RecipeListSection = ({
  title,
  recipes,
  onClick = () => {},
  className,
}: Props) => {
  return (
    <div className="pb-10 md:pb-20">
      {title && <SectionTitle>{title}</SectionTitle>}
      <div
        className={classNames(
          'grid gap-x-4 md:gap-x-6 gap-y-8 sm:gap-y-10 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-7',
          className
        )}
      >
        {recipes.map(recipe => (
          <RecipePreview
            key={recipe.id}
            recipe={recipe}
            onClick={() => {
              onClick(recipe)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default RecipeListSection
