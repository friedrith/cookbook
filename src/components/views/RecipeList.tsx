import { useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from 'hooks/redux'
import {
  getRecipeList,
  areRecipesFetched,
  getAllKeywordSortedByFrequency,
} from 'store'
import RecipeListHeader from 'components/organisms/RecipeListHeader'
import Container from 'components/atoms/Container'
import Page from 'components/templates/Page'
import EmptyMessage from 'components/atoms/EmptyMessage'
import RecipeListSection from 'components/organisms/RecipeListSection'
import useFuse from 'hooks/useFuse'
import { sortByUpdatedAt } from 'models/Recipe'
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import rememberScroll from 'utils/rememberScroll'
import KeywordList from 'components/organisms/KeywordList'

const scroll = rememberScroll()

const RecipeList = () => {
  const areFetched = useAppSelector(areRecipesFetched)
  const recipes = useAppSelector(getRecipeList)
  let [searchParams, setSearchParams] = useSearchParams()

  const ref = useRef<HTMLDivElement | null>(null)

  const query = searchParams.get('q') || ''

  const searchedRecipes = useFuse(recipes, query)

  const onQueryChange = (newQuery: string) => {
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

  const keywords = useAppSelector(getAllKeywordSortedByFrequency)

  const keywordsNotUsed = useMemo(
    () => keywords.filter(k => !query.includes(k)),
    [keywords, query]
  )

  return (
    <Page
      title={'Recipes'}
      scroll={scroll.scroll}
      onScroll={v => scroll.onScroll(v)}
    >
      <Container className="bg-white ">
        <div className="relative z-10 pt-24">
          <div ref={ref} />
          {keywordsNotUsed.length > 0 && (
            <>
              <span className="bg-white ltr:pr-2 rtl:pl-2 text-sm text-gray-500">
                {t('Categories')}
              </span>
              <KeywordList keywords={keywordsNotUsed} />
            </>
          )}
        </div>
        <div className="flex-1 relative z-10 pt-10">
          {searchedRecipes.length > 0 && query && (
            <RecipeListSection
              title={t('_Results')}
              recipes={searchedRecipes}
            />
          )}
          {searchedRecipes.length > 0 && !query && (
            <>
              {searchedRecipes.length > 8 && (
                <RecipeListSection
                  title={t('_Most Recents')}
                  recipes={mostRecentRecipes}
                />
              )}
              <RecipeListSection
                title={searchedRecipes.length > 8 ? t('_All') : ''}
                recipes={searchedRecipes}
              />
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
                {!areFetched && <LoadingSpinner />}
              </div>
            </div>
          )}
        </div>
      </Container>
      <RecipeListHeader
        restRef={ref}
        onSearchChange={onQueryChange}
        searchValue={query}
        hideSearch={recipes.length === 0}
      />
    </Page>
  )
}

export default RecipeList
