import Duration, {
  durationToSeconds,
  hoursToDuration,
} from '../models/Duration'

const oneHour = hoursToDuration(1)

export const renderDuration = (duration: Duration) => {
  const date = new Date(0)

  date.setSeconds(durationToSeconds(duration))

  return date.toISOString().substring(duration > oneHour ? 11 : 14, 19)
}

export const renderDurationPretty = (number: number) =>
  number % oneHour === 0 ? `${number / oneHour}h` : renderDuration(number)
