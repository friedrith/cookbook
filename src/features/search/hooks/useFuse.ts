import { useEffect, useRef, useMemo } from 'react'
import Fuse from 'fuse.js'
import Recipe from '~src/types/Recipe'

const initializeFuse = (recipes: Recipe[]) =>
  new Fuse(recipes, {
    keys: ['name', 'keywords', 'ingredients', 'steps'],
    minMatchCharLength: 1,
    includeScore: true,
  })

const sortByScore = (a: Fuse.FuseResult<Recipe>, b: Fuse.FuseResult<Recipe>) =>
  a.score !== undefined && b.score !== undefined ? a.score - b.score : 0

const sortByName = (a: Recipe, b: Recipe) => {
  return a.name.localeCompare(b.name)
}

const useFuse = (list: Recipe[], query: string) => {
  const fuse = useRef(initializeFuse(list))

  useEffect(() => {
    fuse.current.setCollection(list)
  }, [list])

  const search = (query: string, list: Recipe[]) =>
    query
      ? fuse.current
          .search(query)
          .sort(sortByScore)
          .filter(item => item?.score && item.score < 0.5)
          .map(i => i.item)
      : [...list].sort(sortByName)

  return useMemo(() => {
    const keywords = (query.match(/#([a-zA-Z]*)/) || []).slice(1)

    const queryWithoutKeywords = query.replace(/#[a-zA-Z]*/i, '').trim()

    return search(queryWithoutKeywords, list).filter(r =>
      keywords.every(keyword =>
        r.keywords.find(k => k.toLowerCase().includes(keyword.toLowerCase())),
      ),
    )
  }, [query, list])
}

export default useFuse
