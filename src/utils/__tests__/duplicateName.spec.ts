import duplicateName from 'utils/duplicateName'

describe('duplicateName', () => {
  it('should return name with 2 at the end', () => {
    const name = duplicateName('foo')

    expect(name).toEqual('foo 2')
  })

  it('should return name with 2 replaced by 3', () => {
    const name = duplicateName('foo 2')

    expect(name).toEqual('foo 3')
  })
})
