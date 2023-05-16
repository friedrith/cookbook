// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

// import { useAppDispatch, useAppSelector } from '~/src/hooks/redux'
import { FormattedRecipe } from '~/src/types/Recipe'
import Stat from '~/src/components/atoms/Stat'
// import {
//   incrementServingCount,
//   decrementServingCount,
//   getServingCount,
// } from '~/src/store/index'

type Props = {
  recipe: FormattedRecipe
}

const Stats = ({ recipe }: Props) => {
  // const dispatch = useAppDispatch()

  // const increment = () => dispatch(incrementServingCount(recipe.id))
  // const decrement = () => dispatch(decrementServingCount(recipe.id))

  // const servingCount = useAppSelector(state =>
  //   getServingCount(state, recipe.id)
  // )

  return (
    <div className="flex px-4 py-6 justify-evenly items-start">
      {Object.keys(recipe.stats)
        // .filter(statName => statName !== 'servings')
        .map(statName => (
          <Stat
            key={statName}
            type={statName}
            measure={recipe.stats[statName]}
          />
        ))}
      {/*recipe.stats.servings && (
        <Stat
          type="servings"
          key={recipe.stats.servings.unit}
          measure={{ unit: 'servings', value: servingCount }}
        >
          <span className="relative z-0 inline-flex shadow-sm rounded-md opacity-50 hover:opacity-100">
            <Button
              title="Previous"
              className="rounded-l-md"
              onClick={decrement}
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              title="Next"
              className="-ml-px rounded-r-md"
              onClick={increment}
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </span>
        </Stat>
      )*/}
    </div>
  )
}
export default Stats
