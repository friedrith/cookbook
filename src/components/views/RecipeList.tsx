import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useAppSelector } from '@/hooks/redux'
import { getRecipeList, areRecipesFetched } from '@/store'
import RecipeListHeader from '@/components/organisms/RecipeListHeader'
import Container from '@/components/atoms/Container'
import Page from '@/components/templates/Page'
import EmptyMessage from '@/components/atoms/EmptyMessage'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import rememberScroll from '@/utils/services/rememberScroll'
import RecipeListAll from '@/features/recipes/components/RecipeListAll'
import RecipeListSearchResults from '@/features/recipes/components/RecipeListSearchResults'
import NoRecipeList from '@/features/recipes/components/NoRecipeList'
import RecipeListRecentSearches from '@/features/recipes/components/RecipeListRecentSearches'
import { getAvailableCategories } from '@/features/categories/categories.slice'
import shouldShowCategories from '@/features/categories/utils/shouldShowCategories'
import useSearch from '@/features/search/hooks/useSearch'
import RecipeListNoCategories from '@/features/recipes/components/RecipeListNoCategories'
import SearchStatus from '@/features/search/types/SearchStatus'
import PrimaryLoadingSpinner from '@/components/molecules/PrimaryLoadingSpinner'

const scroll = rememberScroll()

const RecipeList = () => {
  const areFetched = useAppSelector(areRecipesFetched)
  const recipes = useAppSelector(getRecipeList)

  const ref = useRef<HTMLDivElement | null>(null)

  const { searchStatus } = useSearch()

  const { t } = useTranslation()

  const availableCategories = useAppSelector(getAvailableCategories)

  return (
    <Page
      title={'Recipes'}
      scroll={scroll.scroll}
      onScroll={v => scroll.onScroll(v)}
    >
      <Container
        className={classNames(
          'bg-white',
          shouldShowCategories(availableCategories) ? 'pt-32' : 'p-10',
        )}
        fullWidth
      >
        {/* {keywordsNotUsed.length > 0 && (
            <KeywordList
              size={BadgeSize.large}
              className="text-center"
              keywords={keywordsNotUsed}
              onChangeQuery={onQueryChange}
            />
          )} */}
        <div className="flex-1 relative z-10 pt-10 md:pt-24">
          <div className="relative z-10 " ref={ref} />
          {searchStatus === SearchStatus.NoCategory && (
            <RecipeListNoCategories recipes={recipes} />
          )}
          {(searchStatus === SearchStatus.Category ||
            searchStatus === SearchStatus.Generic) && (
            <RecipeListSearchResults recipes={recipes} />
          )}
          {recipes.length > 0 && searchStatus === SearchStatus.Unactive && (
            <RecipeListAll recipes={recipes} />
          )}
          {searchStatus === SearchStatus.ReadyForSearch && (
            <RecipeListRecentSearches recipes={recipes} />
          )}

          {recipes.length === 0 && !areFetched && (
            <NoRecipeList>
              <PrimaryLoadingSpinner className="h-4 w-4" />
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
      <RecipeListHeader restRef={ref} hideSearch={recipes.length === 0} />
    </Page>
  )
}

export default RecipeList
