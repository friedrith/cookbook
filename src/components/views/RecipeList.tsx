import { useRef, useEffect, useState, useMemo } from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { SearchIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import Fuse from 'fuse.js'

import { getRecipeList } from 'store'
import Header from 'components/atoms/Header'
import RecipePreview from 'components/molecules/RecipePreview'

const RecipeList = () => {
  const recipes = useSelector(getRecipeList)
  const fuse = useRef(
    new Fuse(recipes, {
      keys: ['title', 'keywords'],
      minMatchCharLength: 1,
    })
  )
  let [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    fuse.current = new Fuse(recipes, {
      keys: ['description', 'name'],
      minMatchCharLength: 1,
    })
  }, [recipes])

  const searchedRecipes = useMemo(
    () => (query ? fuse.current.search(query).map((i) => i.item) : recipes),
    [query, recipes]
  )

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value

    setQuery(newQuery)
    if (newQuery) {
      setSearchParams({ q: newQuery })
    } else {
      setSearchParams({})
    }
  }

  const { t } = useTranslation()

  return (
    <>
      <Header onSearchChange={onQueryChange} searchValue={query} />
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {searchedRecipes.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {searchedRecipes.map((recipe) => (
                <RecipePreview key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center p-5">
              <p className="text-base text-gray-500">
                {t('_No Recipes found.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default RecipeList
