import Temperature from 'models/Temperature'
import { replaceTemperature } from '../temperatures'

describe('replaceTemperature', () => {
  it('should replace celsius by fahrenheit', () => {
    const description = 'Preheat the oven at 190°C'
    const expectedDescription = 'Preheat the oven at 375°F'
    expect(replaceTemperature(description, Temperature.Farenheit)).toEqual(
      expectedDescription
    )
  })

  it('should replace fahrenheit by celsius', () => {
    const description = 'Preheat the oven at 190°F'
    const expectedDescription = 'Preheat the oven at 90°C'
    expect(replaceTemperature(description, Temperature.Celsius)).toEqual(
      expectedDescription
    )
  })

  it('should not replace fahrenheit when no temperature forced', () => {
    const description = 'Preheat the oven at 190°F'
    expect(replaceTemperature(description, Temperature.Unknown)).toEqual(
      description
    )
  })

  it('should not replace celsius when no temperature forced', () => {
    const description = 'Preheat the oven at 190°C'
    expect(replaceTemperature(description, Temperature.Unknown)).toEqual(
      description
    )
  })

  it('should not replace fahrenheit by fahrenheit', () => {
    const description = 'Preheat the oven at 190°F'
    const expectedDescription = 'Preheat the oven at 190°F'
    expect(replaceTemperature(description, Temperature.Farenheit)).toEqual(
      expectedDescription
    )
  })

  it('should not replace celsius by celsius', () => {
    const description = 'Preheat the oven at 190°C'
    const expectedDescription = 'Preheat the oven at 190°C'
    expect(replaceTemperature(description, Temperature.Celsius)).toEqual(
      expectedDescription
    )
  })

  it('should not replace celsius by fahrenheit when fahrenheit already in the description', () => {
    const description = 'Preheat the oven at 190°C (375°F)'
    expect(replaceTemperature(description, Temperature.Farenheit)).toEqual(
      description
    )
  })

  it('should not replace fahrenheit by celsius when celsius already in the description', () => {
    const description = 'Preheat the oven at 190°F (90°C)'
    expect(replaceTemperature(description, Temperature.Celsius)).toEqual(
      description
    )
  })
})
