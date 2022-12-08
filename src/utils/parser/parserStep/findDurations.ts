import Duration from 'models/Duration'

export const findDurations = (description: string): Duration[] => {
  const match = description.match(/([0-9]+)\s*(min)/g)

  if (match) {
    return match.map(m => ({ time: parseInt(m), unit: 'min' }))
  }

  return []
}
