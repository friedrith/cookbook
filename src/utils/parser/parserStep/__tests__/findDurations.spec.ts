import { findDurations } from '../findDurations'

describe('findDurations', () => {
  it('should return a duration', () => {
    expect(findDurations('10 or 20 min')).toEqual([{ time: 20, unit: 'min' }])
  })

  it('should return 2 durations', () => {
    expect(findDurations('10 or 20 min ... 5 minutes')).toEqual([
      { time: 20, unit: 'min' },
      { time: 5, unit: 'min' },
    ])
  })
})
