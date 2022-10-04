import cleanLines from '../cleanLines'

describe('cleanLines', () => {
  it('should return remove -', () => {
    const text = '-foo\n- bar'
    const expectedLines = ['foo', 'bar']

    expect(cleanLines(text)).toEqual(expectedLines)
  })

  it('should return remove empty lines', () => {
    const text = '-foo\n\n- bar'
    const expectedLines = ['foo', 'bar']

    expect(cleanLines(text)).toEqual(expectedLines)
  })

  it('should return remove empty space around', () => {
    const text = '-foo\n\n    - bar baz    '
    const expectedLines = ['foo', 'bar baz']

    expect(cleanLines(text)).toEqual(expectedLines)
  })
})
