import { replaceUrlsByLinks } from '../parseStep'

describe('replaceUrlsByLinks', () => {
  it('should return when no url', () => {
    expect(replaceUrlsByLinks('foo')).toEqual('foo')
  })

  it('should return when simple url', () => {
    expect(replaceUrlsByLinks('foo http://foo.com')).toEqual(
      'foo <a href="http://foo.com" target="_blank" class="">http://foo.com</a>',
    )
  })

  it('should return when url without http', () => {
    expect(replaceUrlsByLinks('foo foo.com')).toEqual(
      'foo <a href="foo.com" target="_blank" class="">foo.com</a>',
    )
  })

  it('should return when url without http with classname', () => {
    expect(replaceUrlsByLinks('foo foo.com', 'bar')).toEqual(
      'foo <a href="foo.com" target="_blank" class="bar">foo.com</a>',
    )
  })
})
