import SearchStatus from '../types/SearchStatus'

const estimateSearchStatus = (
  query: string | undefined | null,
): SearchStatus => {
  if (query === undefined || query === null) return SearchStatus.Unactive

  if (query === '') return SearchStatus.ReadyForSearch

  if (query.startsWith('#')) return SearchStatus.Category

  if (query === '@no category') return SearchStatus.NoCategory

  return SearchStatus.Generic
}

export default estimateSearchStatus
