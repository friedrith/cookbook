enum Unit {
  SI = 'SI',
  Unknown = 'Unknown',
}

export default Unit

// export const convertToTemperature = (s: string): Temperature => {
//   const temperature = Object.values(Temperature).find(t => t === s)

//   console.log('temperature', temperature)

//   return temperature
//     ? Temperature[temperature as keyof typeof Temperature]
//     : Temperature.Unknown
// }
