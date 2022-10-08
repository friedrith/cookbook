import parseLines from '../parseLines'

describe('parseLines', () => {
  it('should return remove -', () => {
    const text = '-foo\n- bar'
    const expectedLines = ['foo', 'bar']

    expect(parseLines(text)).toEqual(expectedLines)
  })

  it('should return remove - on windows', () => {
    const text = '-foo\r\n- bar'
    const expectedLines = ['foo', 'bar']

    expect(parseLines(text)).toEqual(expectedLines)
  })

  it('should return remove empty lines', () => {
    const text = '-foo\n\n- bar'
    const expectedLines = ['foo', 'bar']

    expect(parseLines(text)).toEqual(expectedLines)
  })

  it('should return remove empty space around', () => {
    const text = '-foo\n\n    - bar baz    '
    const expectedLines = ['foo', 'bar baz']

    expect(parseLines(text)).toEqual(expectedLines)
  })
})
