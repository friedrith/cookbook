import Measure from 'models/Measure'

const renderMeasure = (measure: Measure) =>
  `${measure.value}${measure.unit !== 'count' ? ` ${measure.unit}` : ''}`

export default renderMeasure
