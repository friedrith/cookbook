import Recipe from 'models/Recipe'

const sortByName = (a: Recipe, b: Recipe) => a.name.localeCompare(b.name)

export default sortByName
