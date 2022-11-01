import Temperature from 'models/Temperature'

export const choices = [
  {
    label: 'settings.temperatures.keepUnchanged',
    symbol: '',
    value: Temperature.Unknown,
  },
  {
    label: 'settings.temperatures.Farenheit',
    symbol: '°F',
    value: Temperature.Farenheit,
  },
  {
    label: 'settings.temperatures.Celsius',
    symbol: '°C',
    value: Temperature.Celsius,
  },
]

const round = (x: number) => Math.ceil(x / 5) * 5

const cToF = (celsius: number) => round((celsius * 9) / 5 + 32)

const fToC = (fahrenheit: number) => round(((fahrenheit - 32) * 5) / 9)

export const replaceTemperature = (
  description: string,
  temperature: Temperature
) => {
  if (temperature === Temperature.Unknown) return description

  if (temperature === Temperature.Farenheit) {
    if (description.includes('°F')) return description
    return description.replace(
      /[0-9]+°C/g,
      celsius => `${cToF(parseInt(celsius, 10))}°F`
    )
  }

  if (temperature === Temperature.Celsius) {
    if (description.includes('°C')) return description
    return description.replace(
      /[0-9]+°F/g,
      farenheit => `${fToC(parseInt(farenheit, 10))}°C`
    )
  }

  return description
}