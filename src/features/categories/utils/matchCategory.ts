import SearchQuery from 'features/search/types/SearchQuery'
import Category from '../Category'

const matchCategory = (query: SearchQuery, category: Category) => {
  if (typeof query !== 'string' || !query.startsWith('#')) return false

  return query.toLowerCase().substring(1) === category.name.toLowerCase()
}

export default matchCategory
