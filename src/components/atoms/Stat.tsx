import Measure from 'models/Measure'
import findUnitIcon from 'utils/findUnitIcon'
import renderMeasure from 'utils/renderMeasure'

type Props = {
  measure: Measure
  type: string
  children?: React.ReactNode
}

const Stat = ({ measure, children }: Props) => {
  const Icon = findUnitIcon(measure.unit)

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
