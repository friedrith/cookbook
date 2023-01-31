import { ClockIcon, UsersIcon } from '@heroicons/react/24/outline'

import Measure from 'models/Measure'
import renderMeasure from 'utils/renderMeasure'

type Props = {
  measure: Measure
  type: string
  children?: React.ReactNode
}

const Stat = ({ measure, type, children }: Props) => {
  const Icon = type === 'servings' ? UsersIcon : ClockIcon

  if (!Icon) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <Icon className="h-7 w-7" aria-hidden="true" />
      <div className="text-base font-medium text-gray-900">
        {renderMeasure(measure)}
      </div>
      {children}
    </div>
  )
}

export default Stat
