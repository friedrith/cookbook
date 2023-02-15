import { useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import SearchStatus from '../types/SearchStatus'

import estimateSearchStatus from '../utils/estimateSearchStatus'
import SearchQuery from '../types/SearchQuery'

const cleanQuery = (query: SearchQuery) =>
  typeof query === 'string' ? query.toLowerCase() : query

const useSearch = () => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const query = searchParams.has('q') ? searchParams.get('q') : undefined

  return useMemo(() => {
    const searchStatus = estimateSearchStatus(query)

    const search = (newQuery: SearchQuery) => {
      if (typeof newQuery === 'string') {
        router.push(`/recipes?${new URLSearchParams({ q: newQuery })}`)
      } else {
        router.push('/recipes')
      }
    }

    return {
      query: cleanQuery(query),
      searchStatus,
      isSearchActive: searchStatus !== SearchStatus.Unactive,
      setSearch: (newQuery: SearchQuery) => {
        search(newQuery)
      },
      buildCategory: (newQuery: string | undefined) =>
        typeof newQuery === 'string' ? `#${newQuery}` : undefined,
    }
  }, [query, router])
}

export default useSearch
