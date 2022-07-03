import { ClockIcon, UsersIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'

const groupOfUnits = [
  {
    icon: ClockIcon,
    units: ['min', 'h', 'day'],
  },
  {
    icon: UsersIcon,
    units: ['servings'],
  },
]

const findUnitIcon = (unit: string) =>
  groupOfUnits.find(group => group.units.includes(unit))?.icon || Fragment

export default findUnitIcon
