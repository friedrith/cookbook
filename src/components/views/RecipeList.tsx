import { useRef, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from 'hooks/redux'
import { getRecipeList, areRecipesFetched } from 'store'
import Header from 'components/atoms/Header'
import RecipePreview from 'components/molecules/RecipePreview'
import LargeMainPage from 'components/templates/LargeMainPage'
import Page from 'components/templates/Page'
import EmptyMessage from 'components/atoms/EmptyMessage'
import useFuse from 'hooks/useFuse'

const RecipeList = () => {
  const areFetched = useAppSelector(areRecipesFetched)
  const recipes = useAppSelector(getRecipeList)
  let [searchParams, setSearchParams] = useSearchParams()

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
    </Page>
  )
}

export default RecipeList
