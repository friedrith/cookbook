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

const useFuse = (list: any[], query: string) => {
  const fuse = useRef(initializeFuse(list))

  useEffect(() => {
    fuse.current.setCollection(list)
  }, [list])

  const searchedRecipes = useMemo(() => {
    if (query) {
      return fuse.current
        .search(query)
        .sort(sortByScore)
        .map(i => i.item)
    }
    return [...list].sort(sortByName)
  }, [query, list])

  return searchedRecipes
}

export default useFuse
