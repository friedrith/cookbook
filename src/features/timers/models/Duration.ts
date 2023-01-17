type Duration = number // in ms

export default Duration

export const secondsToDuration = (seconds: number) => seconds * 1000
export const minutesToDuration = (minutes: number) =>
  secondsToDuration(minutes * 60)
export const hoursToDuration = (hours: number) => minutesToDuration(hours * 60)
export const durationToSeconds = (duration: Duration) => duration / 1000

export const ascendingOrder = (a: Duration, b: Duration) => a - b

export const durationLessThan = (duration: Duration, milliseconds: number) =>
  duration < milliseconds
