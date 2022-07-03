import Measure from 'models/Measure'

type Options = {
  explicit?: boolean
}

const renderMeasure = (measure: Measure, { explicit }: Options = {}) => {
  if (measure.unit === 'some') {
    return measure.value > 0 || explicit ? `some` : ''
  }

  return `${measure.value}${measure.unit !== 'count' ? ` ${measure.unit}` : ''}`
}

export default renderMeasure
