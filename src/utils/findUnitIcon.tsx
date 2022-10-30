import { ClockIcon, UsersIcon } from '@heroicons/react/24/outline'

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

const Default = () => <div />

const findUnitIcon = (unit: string) =>
  groupOfUnits.find(group => group.units.includes(unit))?.icon || Default

export default findUnitIcon
