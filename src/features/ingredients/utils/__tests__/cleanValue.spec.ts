import { cleanValue } from '../parseIngredient'

describe('parseValue', () => {
  it('should return integer number', () => {
    expect(cleanValue('10')).toEqual(10)
  })

  it('should return float number', () => {
    expect(cleanValue('10.1')).toEqual(10.1)
  })

  it('should return string when fraction', () => {
    expect(cleanValue('1/2')).toEqual('1/2')
  })

  it('should return string when range', () => {
    expect(cleanValue('1-2')).toEqual('1-2')
  })

  it('should return string when range with - at the end', () => {
    expect(cleanValue('1-2-')).toEqual('1-2')
  })
})
