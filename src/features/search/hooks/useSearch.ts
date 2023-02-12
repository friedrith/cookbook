import { useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useRouter } from 'next/router'
import SearchStatus from '../types/SearchStatus'

import estimateSearchStatus from '../utils/estimateSearchStatus'
import SearchQuery from '../types/SearchQuery'

const ENCODED_HASHTAG = '%23'

const cleanQuery = (query: SearchQuery) =>
  typeof query === 'string' ? query.toLowerCase() : query

const useSearch = () => {
  const router = useRouter()

  const query = typeof router.query.q === 'string' ? router.query.q : undefined

  return useMemo(() => {
    const searchStatus = estimateSearchStatus(query)

    const search = (newQuery: SearchQuery) => {
      if (typeof newQuery === 'string') {
        router.push({ pathname: '/recipes', query: { q: newQuery } })
      } else {
        router.push({ pathname: '/recipes' })
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
