import Badge from 'components/atoms/Badge'
import Ingredient from 'models/Ingredient'

import shortenIngredientName from 'utils/parser/shortenIngredientName'
import renderMeasure from 'utils/render/renderMeasure'

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