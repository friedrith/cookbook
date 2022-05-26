import { ClockIcon, UsersIcon } from '@heroicons/react/outline'

import Measure from 'models/Measure'

const groupOfUnits: { [id: string]: any } = {
  time: {
    icon: ClockIcon,
    units: ['min', 'h', 'day'],
  },
  serving: {
    icon: UsersIcon,
    units: ['servings'],
  },
}

type Props = {
  measure: Measure
  children?: React.ReactNode
}

const Stat = ({ measure, children }: Props) => {
  const group = Object.values(groupOfUnits).find((group) =>
    group.units.includes(measure.unit)
  )

  if (!group) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <group.icon className="h-7 w-7" aria-hidden="true" />
      <div className="text-base font-medium text-gray-900">
        {measure.value} {measure.unit}
      </div>
      {children}
    </div>
  )
}

export default Stat
