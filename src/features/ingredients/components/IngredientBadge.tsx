import Badge from '~/src/components/atoms/Badge'
import Ingredient from '~/src/models/Ingredient'

import shortenIngredientName from '~/src/features/ingredients/utils/shortenIngredientName'
import renderMeasure from '~/src/utils/renderMeasure'

type Props = {
  className?: string
  ingredient: Ingredient
}

const IngredientBadge = ({ className, ingredient }: Props) => (
  <Badge className={`bg-indigo-100 text-indigo-800 ${className}`}>
    {`${renderMeasure(ingredient.measure)} ${shortenIngredientName(
      ingredient,
    )}`}
  </Badge>
)

export default IngredientBadge
