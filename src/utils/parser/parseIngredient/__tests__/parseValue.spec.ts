import { parseValue } from '../'

describe('parseValue', () => {
  it('should return integer number', () => {
    expect(parseValue('10')).toEqual(10)
  })

  it('should return float number', () => {
    expect(parseValue('10.1')).toEqual(10.1)
  })

  it('should return string when fraction', () => {
    expect(parseValue('1/2')).toEqual('1/2')
  })

  it('should return string when range', () => {
    expect(parseValue('1-2')).toEqual('1-2')
  })
})
