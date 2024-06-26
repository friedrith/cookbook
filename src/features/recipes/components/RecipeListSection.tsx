import classNames from 'classnames'
import Recipe from '~/src/types/Recipe'
import RecipePreview from '~/src/features/recipes/components/RecipePreview'
import SectionTitle from '~/src/components/atoms/SectionTitle'

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
          'grid gap-x-4 md:gap-x-6 gap-y-8 sm:gap-y-10 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-7',
          className,
        )}
      >
        {recipes.filter(Boolean).map(recipe => (
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
