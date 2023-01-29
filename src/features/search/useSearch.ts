import { useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import SearchStatus from './types/SearchStatus'

import estimateSearchStatus from './utils/estimateSearchStatus'
import SearchQuery from './types/SearchQuery'

const ENCODED_HASHTAG = '%23'

const cleanQuery = (query: SearchQuery) =>
  typeof query === 'string' ? query.toLowerCase() : query

const useSearch = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [_, setSearchParams] = useSearchParams()

  const searchParams = new URLSearchParams(window.location.search)

  console.log('searchParams', searchParams)

  const query =
    typeof searchParams.get('q') === 'string'
      ? searchParams.get('q')
      : undefined

  console.log('query', query)

  return useMemo(() => {
    const searchStatus = estimateSearchStatus(query)

    console.log('useMemo.query', query, cleanQuery(query))

    return {
      query: cleanQuery(query),
      searchStatus,
      isSearchActive: searchStatus !== SearchStatus.Unactive,
      setSearch: (newQuery: SearchQuery) => {
        if (location.pathname !== '/recipes') {
          navigate(`/recipes?q=${newQuery}`)
        } else {
          if (typeof newQuery === 'string') {
            setSearchParams({ q: newQuery })
          } else {
            setSearchParams({})
          }
        }
      },
      setCategory: (newQuery: string | undefined) => {
        if (location.pathname !== '/recipes') {
          navigate(`/recipes?q=${ENCODED_HASHTAG}${newQuery}`)
        } else {
          if (newQuery !== undefined) {
            setSearchParams({ q: `#${newQuery}` })
          } else {
            setSearchParams({})
          }
        }
      },
    }
  }, [query, location, navigate, setSearchParams])
}

export default useSearch
