import findDurations from '../findDurations'

const aDuration = (minutes: number) => minutes * 60 * 1000

describe('findDurations', () => {
  it('should return 1 minute', () => {
    expect(findDurations('1min')).toEqual([aDuration(1)])
  })

  it('should return 2 minutes', () => {
    expect(findDurations('2 minutes')).toEqual([aDuration(2)])
  })

  it('should return durations', () => {
    expect(findDurations('10 à 20 min')).toEqual([aDuration(10), aDuration(20)])
  })

  it('should return durations ordered', () => {
    expect(findDurations('20 minutes foo 10 min')).toEqual([
      aDuration(10),
      aDuration(20),
    ])
  })

  it('should return durations unique', () => {
    expect(findDurations('20 minutes foo 20 min')).toEqual([aDuration(20)])
  })

  it('should return durations as hours', () => {
    expect(findDurations('1 hour')).toEqual([aDuration(60)])
  })
})
