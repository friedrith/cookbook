import Measure from '~/src/models/Measure'

type Options = {
  explicit?: boolean
}

// TODO improve predictability of render
const renderMeasure = (measure: Measure, { explicit }: Options = {}) => {
  const { unit } = measure

  if (unit === 'some') {
    return measure.value > 0 || explicit ? `some` : ''
  }

  if (unit === 'none') {
    return ''
  }

  const unitLabel = unit !== 'count' ? ` ${measure.unit}` : ''

  return `${measure.value}${unitLabel}`
}

export default renderMeasure
