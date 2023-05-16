import classNames from 'classnames'
import Ingredient from '~/src/models/Ingredient'
import renderMeasure from '~/src/utils/renderMeasure'

interface Props {
  ingredients: Ingredient[]
  itemClassName?: string
  itemComponent?: React.FC<{ index: number }>
  itemOnClick?: (index: number) => () => void
}

const key = (ingredient: Ingredient, index: number) =>
  `${ingredient.name}${index}`

const IngredientTable: React.FC<Props> = ({
  ingredients,
  itemClassName,
  itemOnClick = () => () => {},
  itemComponent: ItemComponent = () => <></>,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <tbody className="divide-y divide-gray-200 bg-white">
        {ingredients.map((ingredient, index) => (
          <tr
            key={key(ingredient, index)}
            onClick={itemOnClick(index)}
            className={itemClassName}
          >
            <ItemComponent index={index} />
            <td
              className={classNames(
                'whitespace-wrap py-4 align-top text-sm font-medium text-gray-900 text-right w-10 max-w-10',
                renderMeasure(ingredient.measure, { explicit: true }).length >
                  15
                  ? 'whitespace-wrap'
                  : 'whitespace-nowrap',
              )}
            >
              {renderMeasure(ingredient.measure, { explicit: true })}
            </td>
            <td className="px-3 py-4 pr-6 align-top text-sm text-gray-500 w-60">
              {ingredient.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IngredientTable
