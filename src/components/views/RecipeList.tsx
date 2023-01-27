import { useRef, useState, useMemo } from 'react'
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
import LoadingSpinner from 'components/atoms/LoadingSpinner'
import rememberScroll from 'utils/rememberScroll'
import KeywordList from 'features/keywords/components/KeywordList'
import { BadgeSize } from 'components/atoms/Badge'
import RecipeListAll from 'features/recipes/components/RecipeListAll'
import RecipeListSearchResults from 'features/recipes/components/RecipeListSearchResults'
import NoRecipeList from 'features/recipes/components/NoRecipeList'
import RecipeListRecentSearches from 'features/recipes/components/RecipeListRecentSearches'

const scroll = rememberScroll()

const RecipeList = () => {
  const areFetched = useAppSelector(areRecipesFetched)
  const recipes = useAppSelector(getRecipeList)
  let [searchParams, setSearchParams] = useSearchParams()

  const ref = useRef<HTMLDivElement | null>(null)

  const [query, setQuery] = useState(searchParams.get('q') || undefined)

  const isSearchActivated = searchParams.get('q') !== null

  const onQueryChange = (newQuery: string | undefined) => {
    setQuery(newQuery)

    if (newQuery !== undefined) {
      setSearchParams({ q: newQuery })
    } else {
      setSearchParams({})
    }
  }

  const { t } = useTranslation()

  const keywords = useAppSelector(getAllKeywordSortedByFrequency)

  const keywordsNotUsed = useMemo(
    () => keywords.filter(k => !(query || '').includes(k)),
    [keywords, query]
  )

  return (
    <Page
      title={'Recipes'}
      scroll={scroll.scroll}
      onScroll={v => scroll.onScroll(v)}
    >
      <Container className="bg-white" fullWidth>
        <div className="relative z-10 pt-16">
          <div ref={ref} />
          {keywordsNotUsed.length > 0 && (
            <KeywordList
              size={BadgeSize.large}
              className="text-center"
              keywords={keywordsNotUsed}
              onChangeQuery={onQueryChange}
            />
          )}
        </div>
        <div className="flex-1 relative z-10 pt-16">
          {recipes.length > 0 && query && (
            <RecipeListSearchResults recipes={recipes} query={query} />
          )}
          {recipes.length > 0 && !query && !isSearchActivated && (
            <RecipeListAll recipes={recipes} />
          )}
          {recipes.length > 0 && !query && isSearchActivated && (
            <RecipeListRecentSearches recipes={recipes} />
          )}

          {recipes.length === 0 && !areFetched && (
            <NoRecipeList>
              <LoadingSpinner />
            </NoRecipeList>
          )}
          {recipes.length === 0 && areFetched && (
            <NoRecipeList>
              <EmptyMessage
                title={t('_No Recipes created')}
                message={t('_Get started by creating a new recipe')}
              />
            </NoRecipeList>
          )}
        </div>
      </Container>
      <RecipeListHeader
        restRef={ref}
        onSearchChange={onQueryChange}
        searchValue={query}
        hideSearch={recipes.length === 0}
        searchActive={isSearchActivated}
        onFocusChange={() => {}}
      />
    </Page>
  )
}

export default RecipeList
