import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { useAppSelector } from '~/src/hooks/redux'
import { getRecipeList, areRecipesFetched } from '~/src/store/index'
import RecipeListHeader from '~/src/components/organisms/RecipeListHeader'
import Container from '~/src/components/atoms/Container'
import Page from '~/src/components/templates/Page'
import EmptyMessage from '~/src/components/atoms/EmptyMessage'
import PrimaryLoadingSpinner from '~/src/components/molecules/PrimaryLoadingSpinner'
import rememberScroll from '~/src/utils/services/rememberScroll'
import RecipeListAll from '~/src/features/recipes/components/RecipeListAll'
import RecipeListSearchResults from '~/src/features/recipes/components/RecipeListSearchResults'
import NoRecipeList from '~/src/features/recipes/components/NoRecipeList'
import RecipeListRecentSearches from '~/src/features/recipes/components/RecipeListRecentSearches'
import { shouldShowCategories } from '~/src/features/categories/categories.slice'
import useSearch from '~/src/features/search/useSearch'
import RecipeListNoCategories from '~/src/features/recipes/components/RecipeListNoCategories'
import SearchStatus from '~/src/features/search/types/SearchStatus'
import MobileRecipeListHeader from '~/src/components/organisms/MobileRecipeListHeader'
import MobileDock from '~/src/components/organisms/MobileDock'

const scroll = rememberScroll()

const HEADER_HEIGHT = 64

const RecipeList = () => {
  const areFetched = useAppSelector(areRecipesFetched)
  const recipes = useAppSelector(getRecipeList)

  const ref = useRef<HTMLDivElement | null>(null)

  const { searchStatus, isSearchActive } = useSearch()

  const { t } = useTranslation()

  const areCategoriesVisible = useAppSelector(shouldShowCategories)

  const isMobile = window.innerWidth < 768

  const windowHeight =
    window.innerHeight + (!isSearchActive ? HEADER_HEIGHT : 0)

  return (
    <Page
      title={t('_Recipes')}
      scroll={scroll.scroll}
      onScroll={v => scroll.onScroll(v)}
    >
      <div
        className={classNames(
          'bg-white min-h-[100vh] md:h-auto',
          areCategoriesVisible ? 'md:mt-32' : 'md:m-10',
        )}
        style={{
          minHeight: isMobile ? windowHeight : 'auto',
        }}
      >
        <MobileRecipeListHeader />

        <Container fullWidth>
          <div className="flex-1 relative z-10 pt-5 md:pt-24">
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
                <PrimaryLoadingSpinner />
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
      </div>

      <RecipeListHeader
        restRef={ref}
        hideSearch={recipes.length === 0}
        className="hidden md:block"
      />
      <MobileDock />
    </Page>
  )
}

export default RecipeList
