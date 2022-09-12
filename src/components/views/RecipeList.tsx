import { useRef, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import Fuse from 'fuse.js'

import { useAppSelector } from 'hooks/redux'
import Recipe from 'models/Recipe'
import { getRecipeList, areRecipesFetched } from 'store'
import Header from 'components/atoms/Header'
import RecipePreview from 'components/molecules/RecipePreview'
import LargeMainPage from 'components/templates/LargeMainPage'
import Page from 'components/templates/Page'

const initializeFuse = (recipes: Recipe[]) =>
  new Fuse(recipes, {
    keys: ['title', 'keywords'],
    minMatchCharLength: 1,
  })

const RecipeList = () => {
  const areFetched = useAppSelector(areRecipesFetched)
  const recipes = useAppSelector(getRecipeList)
  const fuse = useRef(initializeFuse(recipes))
  let [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    fuse.current = initializeFuse(recipes)
  }, [recipes])

  const searchedRecipes = useMemo(
    () => (query ? fuse.current.search(query).map(i => i.item) : recipes),
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
    <Page>
      <LargeMainPage>
        <Header onSearchChange={onQueryChange} searchValue={query} />
        <div className="lg:pt-6">
          {searchedRecipes.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {searchedRecipes.map(recipe => (
                <RecipePreview key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center p-5">
              <p className="text-base text-gray-500">
                {areFetched ? t('_No Recipes found.') : t('_Loading')}
              </p>
            </div>
          )}
        </div>
      </LargeMainPage>
    </Page>
  )
}

export default RecipeList
