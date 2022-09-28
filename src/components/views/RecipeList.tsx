import { useRef, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from 'hooks/redux'
import { getRecipeList, areRecipesFetched } from 'store'
import RecipeListHeader from 'components/organisms/RecipeListHeader'
import RecipePreview from 'components/molecules/RecipePreview'
import LargeMainPage from 'components/templates/LargeMainPage'
import Page from 'components/templates/Page'
import EmptyMessage from 'components/atoms/EmptyMessage'
import RecipeListSection from 'components/organisms/RecipeListSection'
import useFuse from 'hooks/useFuse'
import { sortByUpdatedAt } from 'models/Recipe'

const RecipeList = () => {
  const areFetched = useAppSelector(areRecipesFetched)
  const recipes = useAppSelector(getRecipeList)
  let [searchParams, setSearchParams] = useSearchParams()

  const ref = useRef<HTMLDivElement | null>(null)

  const [query, setQuery] = useState(searchParams.get('q') || '')

  const searchedRecipes = useFuse(recipes, query)

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

  const mostRecentRecipes = useMemo(
    () => recipes.sort(sortByUpdatedAt).slice(0, 4),
    [recipes]
  )

  return (
    <Page title={'Recipes'}>
      <LargeMainPage className="flex-1 relative z-10">
        <div className="pt-20">
          <div ref={ref} />
          {searchedRecipes.length > 0 && query && (
            <RecipeListSection
              title={t('_Results')}
              recipes={searchedRecipes}
            />
          )}
          {searchedRecipes.length > 0 && !query && (
            <>
              <RecipeListSection
                title={t('_Most Recents')}
                recipes={mostRecentRecipes}
              />
              <RecipeListSection title={t('_All')} recipes={searchedRecipes} />
            </>
          )}
          {searchedRecipes.length === 0 && (
            <div className="flex justify-center p-5">
              <div className="text-base text-gray-500 text-center">
                {areFetched &&
                  searchedRecipes.length === 0 &&
                  recipes.length > 0 && (
                    <EmptyMessage
                      title={t('_No Recipes found')}
                      message={t('_Try a different search.')}
                    />
                  )}
                {areFetched && recipes.length === 0 && (
                  <EmptyMessage
                    title={t('_No Recipes created')}
                    message={t('_Get started by creating a new recipe')}
                  />
                )}
                {!areFetched && <EmptyMessage title={t('_Loading')} />}
              </div>
            </div>
          )}
        </div>
      </LargeMainPage>
      <RecipeListHeader
        restRef={ref}
        onSearchChange={onQueryChange}
        searchValue={query}
      />
    </Page>
  )
}

export default RecipeList