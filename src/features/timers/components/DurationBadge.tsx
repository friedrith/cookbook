import Badge from '~/src/components/atoms/Badge'
import { PlayIcon } from '@heroicons/react/20/solid'

import { renderDurationPretty } from '../utils/renderDuration'
import { useAppDispatch } from '~/src/hooks/redux'
import useCurrentRecipe from '~/src/hooks/useCurrentRecipe'
import { startTimer } from '../timers.slice'

type Props = {
  className?: string
  duration: number
}

const DurationBadge = ({ className, duration }: Props) => {
  const dispatch = useAppDispatch()

  const [recipe] = useCurrentRecipe()

  if (!recipe) return null

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <Badge
      className={`inline-flex items-center text-white bg-slate-900 ${className}`}
      onClick={() => {
        dispatch(startTimer({ recipeId: recipe.id, duration }))
      }}
    >
      <PlayIcon className="h-3 w-3 text-white mr-1" />
      {renderDurationPretty(duration)}
    </Badge>
  )
}

export default DurationBadge
