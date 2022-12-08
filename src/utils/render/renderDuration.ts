import Duration from 'models/Duration'

const renderDuration = (duration: Duration): string => {
  if (duration.unit === 'min') {
    return `${duration.time}:00`
  }

  return `${duration.time}`
}

export default renderDuration
