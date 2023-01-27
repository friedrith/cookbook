import { useEffect, useRef, useMemo } from 'react'
import Fuse from 'fuse.js'

const initializeFuse = (recipes: Recipe[]) =>
  new Fuse(recipes, {
    keys: ['name', 'keywords', 'ingredients', 'steps'],
    minMatchCharLength: 1,
    includeScore: true,
  })

const sortByScore = (a, b) => a.score - b.score

const sortByName = (a, b) => {
  return a.name.localeCompare(b.name)
}

const useFuse = (list: Recipe[], query: string) => {
  const fuse = useRef(initializeFuse(list))

  useEffect(() => {
    fuse.current.setCollection(list)
  }, [list])

  const search = (query, list) =>
    query
      ? fuse.current
          .search(query)
          .sort(sortByScore)
          .filter(item => item.score < 0.5)
          .map(i => i.item)
      : [...list].sort(sortByName)

  const searchedRecipes = useMemo(() => {
    const keywords = (query.match(/#([a-zA-Z]*)/) || []).slice(1)

    const queryWithoutKeywords = query.replace(/#[a-zA-Z]*/i, '').trim()

    return search(queryWithoutKeywords, list).filter(r =>
      keywords.every(keyword => r.keywords.find(k => k.includes(keyword))),
    )
  }, [query, list])

  return searchedRecipes
}

export default useFuse
