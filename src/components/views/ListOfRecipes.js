import { useRef, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SearchIcon } from '@heroicons/react/solid'
import Fuse from 'fuse.js'

import { getListOfRecipes } from 'store'
import Header from 'components/molecules/Header2'
import { useEffect } from 'react'

export const ListOfRecipes = () => {
  const recipes = useSelector(getListOfRecipes)
  const fuse = useRef()
  const [query, setQuery] = useState('')

  useEffect(() => {
    fuse.current = new Fuse(recipes, {
      keys: ['title', 'keywords'],
      minMatchCharLength: 1
    })
  }, [recipes])

  const searchedRecipes = useMemo(() => (query ? fuse.current.search(query).map(i => i.item) : recipes), [fuse.current, query])

  const onQueryChange = event => {
    const newQuery = event.target.value

    setQuery(newQuery)
  }

  return (
    <>
      <Header>
        <div className="px-2 flex items-center lg:px-0">
          <div className="flex-shrink-0">
            <Link to="/recipes">
              <img className="block h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg" alt="Workflow" />
            </Link>
          </div>
        </div>
        <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
          <div className="max-w-lg w-full lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search"
                value={query}
                onChange={onQueryChange}
                className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </div>
        </div>
      </Header>
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8 py-5">
        <div className="bg-white shadow overflow-hidden rounded-md ">
          <ul role="list" className="divide-y divide-gray-200  ">
            {searchedRecipes.map(recipe => (
              <li
                key={recipe.id}
                className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              >
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1">
                    <Link to={`/recipes/${recipe.id}`} className="block focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900 truncate">{recipe.title}</p>
                      <div className="pt-1">
                        {recipe.keywords.map(keyword => (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 mr-2"
                            key={keyword}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ListOfRecipes
