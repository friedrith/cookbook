import Recipe from '~/src/types/Recipe'

export const sortByUpdatedAt = (a: Recipe, b: Recipe) => {
  if (a?.updatedAt === null || a?.updatedAt === undefined) {
    if (b?.updatedAt === null || b?.updatedAt === undefined) {
      return 0
    }
    return 1
  }

  if (b?.updatedAt === null || b?.updatedAt === undefined) {
    return -1
  }

  if (a?.updatedAt < b?.updatedAt) {
    return 1
  }

  if (a?.updatedAt > b?.updatedAt) {
    return -1
  }

  return 1
}

export default sortByUpdatedAt
