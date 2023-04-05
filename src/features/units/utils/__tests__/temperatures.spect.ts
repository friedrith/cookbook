import Temperature from 'features/units/types/Temperature'
import convertTemperature from '../convertTemperature'

const preheatInCelsius = 'Preheat the oven at 190°C'
const preheatInFarenheit = 'Preheat the oven at 190°F'

describe('convertTemperature', () => {
  it('should replace celsius by fahrenheit', () => {
    const description = preheatInCelsius
    const expectedDescription = 'Preheat the oven at 375°F'
    expect(convertTemperature(description, Temperature.Farenheit)).toEqual(
      expectedDescription,
    )
  })

  it('should replace fahrenheit by celsius', () => {
    const description = preheatInFarenheit
    const expectedDescription = 'Preheat the oven at 90°C'
    expect(convertTemperature(description, Temperature.Celsius)).toEqual(
      expectedDescription,
    )
  })

  it('should not replace fahrenheit when no temperature forced', () => {
    const description = preheatInFarenheit
    expect(convertTemperature(description, Temperature.Unknown)).toEqual(
      description,
    )
  })

  it('should not replace celsius when no temperature forced', () => {
    const description = preheatInCelsius
    expect(convertTemperature(description, Temperature.Unknown)).toEqual(
      description,
    )
  })

  it('should not replace fahrenheit by fahrenheit', () => {
    const description = preheatInFarenheit
    expect(convertTemperature(description, Temperature.Farenheit)).toEqual(
      description,
    )
  })

  it('should not replace celsius by celsius', () => {
    const description = preheatInCelsius
    const expectedDescription = 'Preheat the oven at 190°C'
    expect(convertTemperature(description, Temperature.Celsius)).toEqual(
      expectedDescription,
    )
  })

  it('should not replace celsius by fahrenheit when fahrenheit already in the description', () => {
    const description = 'Preheat the oven at 190°C (375°F)'
    expect(convertTemperature(description, Temperature.Farenheit)).toEqual(
      description,
    )
  })

  it('should not replace fahrenheit by celsius when celsius already in the description', () => {
    const description = 'Preheat the oven at 190°F (90°C)'
    expect(convertTemperature(description, Temperature.Celsius)).toEqual(
      description,
    )
  })

  it('should replace thermostat to celsius', () => {
    const description = 'Preheat the oven at th.7'
    expect(convertTemperature(description, Temperature.Celsius)).toEqual(
      'Preheat the oven at 210°C',
    )
  })

  it('should replace thermostat to farenheit', () => {
    const description = 'Preheat the oven at th.7'
    expect(convertTemperature(description, Temperature.Farenheit)).toEqual(
      'Preheat the oven at 410°F',
    )
  })
})
