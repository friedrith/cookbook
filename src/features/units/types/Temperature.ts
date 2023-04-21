enum Temperature {
  Farenheit = 'Farenheit',
  Celsius = 'Celsius',
  Unknown = 'Unknown',
}

export default Temperature

export const convertToTemperature = (s: string): Temperature => {
  const temperature = Object.values(Temperature).find(t => t === s)

  return temperature
    ? Temperature[temperature as keyof typeof Temperature]
    : Temperature.Unknown
}
