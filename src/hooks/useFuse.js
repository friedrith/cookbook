import { useEffect, useRef, useMemo } from 'react'
import Fuse from 'fuse.js'

const initializeFuse = (recipes: Recipe[]) =>
  new Fuse(recipes, {
    keys: ['name', 'keywords', 'ingredients', 'steps'],
    minMatchCharLength: 1,
  })

const useFuse = (list: any[], query: string) => {
  const fuse = useRef(initializeFuse(list))

  useEffect(() => {
    fuse.current.setCollection(list)
  }, [list])

  const searchedRecipes = useMemo(
    () => (query ? fuse.current.search(query).map(i => i.item) : list),
    [query, list]
  )

  return searchedRecipes
}

export default useFuse
