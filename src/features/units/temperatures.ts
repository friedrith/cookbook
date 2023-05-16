import Temperature from '~/src/features/units/types/Temperature'

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
