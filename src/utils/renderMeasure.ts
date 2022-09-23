import Measure from 'models/Measure'

type Options = {
  explicit?: boolean
}

// TODO improve predictability of render
const renderMeasure = (measure: Measure, { explicit }: Options = {}) => {
  if (measure.unit === 'some') {
    return measure.value > 0 || explicit ? `some` : ''
  }

  if (measure.unit === 'none') {
    return ''
  }

  return `${measure.value}${measure.unit !== 'count' ? ` ${measure.unit}` : ''}`
}

export default renderMeasure
