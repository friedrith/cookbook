import Duration from './Duration'

type Timer = {
  id: string
  recipeId: string
  startedAt: Date
  duration: Duration
  endAt: Date
}

export default Timer

export const timerToDuration = (timer: Timer) => new Date(timer.endAt).getTime()

export const durationLeft = (timer: Timer): Duration =>
  timerToDuration(timer) - new Date().getTime()
