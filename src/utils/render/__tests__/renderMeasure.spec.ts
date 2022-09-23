import renderMeasure from 'utils/render/renderMeasure'

describe('renderMeasure', () => {
  it('should return string "some"', () => {
    const measure = {
      value: 10,
      unit: 'some',
    }

    expect(renderMeasure(measure)).toEqual('some')
  })

  it('should return empty string when unit is some without value', () => {
    const measure = {
      value: 0,
      unit: 'some',
    }

    expect(renderMeasure(measure)).toEqual('')
  })

  it('should return string "some" when unit is some without value but with option explicit', () => {
    const measure = {
      value: 0,
      unit: 'some',
    }

    expect(renderMeasure(measure, { explicit: true })).toEqual('some')
  })

  it('should return string without unit when unit is count', () => {
    const measure = {
      value: 10,
      unit: 'count',
    }

    expect(renderMeasure(measure)).toEqual('10')
  })

  it('should return string with unit', () => {
    const measure = {
      value: 10,
      unit: 'g',
    }

    expect(renderMeasure(measure)).toEqual('10 g')
  })

  it('should return basic string if no unit', () => {
    const measure = {
      value: 10,
      unit: 'none',
    }

    expect(renderMeasure(measure)).toEqual('')
  })
})
