import thumbnailUrl from '~/src/utils/urls/thumbnailUrl'

describe('thumbnailUrl', () => {
  it('should url with prefix thumb_', () => {
    const url =
      'https://firebasestorage.googleapis.com/v0/b/cookbook-11f64.appspot.com/o/images%2Fbanner%2F42e47d9d-8bf8-1221-b194-88824668856d.jpeg?alt=media&token=70e75bb8-a96b-1221-a8e3-7d9564a551ee'

    const expectedUrl = `https://firebasestorage.googleapis.com/v0/b/cookbook-11f64.appspot.com/o/images%2Fbanner%2Fthumb_42e47d9d-8bf8-1221-b194-88824668856d.jpeg?alt=media&token=70e75bb8-a96b-1221-a8e3-7d9564a551ee`

    expect(thumbnailUrl(url)).toEqual(expectedUrl)
  })
})
