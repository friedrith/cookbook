import React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SquaresPlusIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import Container from 'components/atoms/Container'
import useSearch from 'features/search/useSearch'
import Button from 'components/atoms/Button'
import Modal from 'components/atoms/Modal'
import usePopup from 'hooks/usePopup'
import isRightToLeft from 'utils/platforms/isRightToLeft'

import CategoryPreview from './CategoryPreview'
import matchCategory from '../utils/matchCategory'
import shouldHelpUserAboutCategories from '../utils/shouldHelpUserAboutCategories'

import { getRecipeList } from 'store'
import { useAppSelector } from 'hooks/redux'
import {
  getAvailableCategories,
  getUnusedCategories,
  shouldShowCategories,
} from '../categories.slice'
import SearchStatus from 'features/search/types/SearchStatus'
import useEventListener from 'hooks/useEventListener'
import classNames from 'classnames'

export interface Props {
  className?: string
}

const CategoriesList = React.forwardRef<HTMLDivElement, Props>(
  // eslint-disable-next-line sonarjs/cognitive-complexity
  ({ className }, ref) => {
    const { query, searchStatus, setCategory, setSearch } = useSearch()

    const availableCategories = useAppSelector(getAvailableCategories)
    const areCategoriesVisible = useAppSelector(shouldShowCategories)

    const { t } = useTranslation()

    const recipes = useAppSelector(getRecipeList)

    const helpPopup = usePopup()

    const recipesWithoutCategories = recipes.filter(
      r => r.keywords.length === 0,
    )

    const unusedCategories = useAppSelector(getUnusedCategories)

    const listRef = useRef<HTMLDivElement>(null)
    const listContainerRef = useRef<HTMLDivElement>(null)

    const [isLeftArrowVisible, showLeftArrow] = useState(false)

    const [isRightArrowVisible, showRightArrow] = useState(false)

    const updateArrows = useCallback(() => {
      if (isRightToLeft()) {
        showRightArrow(listRef.current?.scrollLeft !== 0)

        if (listContainerRef.current && listRef.current) {
          showLeftArrow(
            listRef.current?.scrollWidth !==
              listRef.current?.offsetWidth + listRef.current?.scrollLeft,
          )
        }
      } else {
        showLeftArrow(listRef.current?.scrollLeft !== 0)

        if (listContainerRef.current && listRef.current) {
          showRightArrow(
            listRef.current?.scrollWidth !==
              listRef.current?.offsetWidth + listRef.current?.scrollLeft,
          )
        }
      }
    }, [])

    useEffect(() => {
      updateArrows()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipes])

    useEventListener('scroll', updateArrows, listRef.current)

    useEventListener('resize', updateArrows)

    if (!areCategoriesVisible) return <></>

    return (
      <>
        <div className={className} ref={ref}>
          <Container
            fullWidth
            className="relative h-26 !p-0 md:!px-4 lg:!px-16"
          >
            <div className="w-full h-24 overflow-hidden relative">
              <div className="overflow-x-scroll scroll-smooth	" ref={listRef}>
                <div
                  className="pt-1 md:pt-2 pb-10 flex items-center gap-x-0 md:gap-x-2 lg:gap-x-4"
                  ref={listContainerRef}
                >
                  {availableCategories.map(c => (
                    <CategoryPreview
                      key={c.name}
                      category={c}
                      active={matchCategory(query, c)}
                      onClick={() => {
                        const newCategory = matchCategory(query, c)
                          ? undefined
                          : c.name
                        setCategory(newCategory)
                      }}
                    />
                  ))}
                  {shouldHelpUserAboutCategories(
                    recipes,
                    availableCategories,
                  ) && searchStatus !== SearchStatus.NoCategory ? (
                    <Button.White
                      className="ml-5 hidden md:inline-flex items-center"
                      onClick={helpPopup.open}
                    >
                      <SquaresPlusIcon className="h-4 w-4 mr-2 stroke-2" />
                      <span className="text-xs font-semibold">
                        {t('Add more categories')}
                      </span>
                    </Button.White>
                  ) : null}
                  {searchStatus === SearchStatus.NoCategory ? (
                    <Button.White
                      className="ml-5 hidden md:inline-flex"
                      onClick={() => setSearch(undefined)}
                    >
                      <span className="text-xs font-semibold">
                        {t('_Show all recipes')}
                      </span>
                    </Button.White>
                  ) : null}
                  {isLeftArrowVisible && (
                    <>
                      <div className="hidden absolute top-0 bottom-0 left-0 w-16 md:flex flex-col justify-center items-start">
                        <div className="absolute top-0 bottom-0 left-0 bg-white w-6" />
                        <div className="absolute top-0 bottom-0 left-6 bg-gradient-to-r from-white to-transparent w-10" />
                        <Button.Circle
                          aria-label="fdf"
                          className="relative"
                          onClick={() => {
                            if (listRef.current) {
                              listRef.current.scrollLeft -=
                                listRef.current.clientWidth / 2
                            }
                          }}
                        >
                          <ChevronLeftIcon className="h-6 w-6 stroke-2" />
                        </Button.Circle>
                      </div>
                      {/* <div className="absolute block md:hidden top-0 bottom-0 left-0 bg-white w-4" /> */}
                      <div className="absolute block md:hidden top-0 bottom-0 left-0 bg-gradient-to-r from-white to-transparent w-10" />
                    </>
                  )}
                  {isRightArrowVisible && (
                    <>
                      <div className="hidden absolute top-0 bottom-0 right-0 w-16 md:flex flex-col justify-center items-end">
                        <div className="absolute top-0 bottom-0 right-0 bg-white w-6" />
                        <div className="absolute top-0 bottom-0 right-6 bg-gradient-to-l from-white to-transparent w-10" />
                        <Button.Circle
                          aria-label="fdf"
                          className="relative"
                          onClick={() => {
                            if (listRef.current) {
                              listRef.current.scrollLeft +=
                                listRef.current.clientWidth / 2
                            }
                          }}
                        >
                          <ChevronRightIcon className="h-6 w-6 stroke-2" />
                        </Button.Circle>
                      </div>
                      {/* <div className="absolute block md:hidden top-0 bottom-0 right-0 bg-white w-4" /> */}
                      <div className="absolute block md:hidden top-0 bottom-0 right-0 bg-gradient-to-l from-white to-transparent w-10" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Modal
          open={helpPopup.isOpen}
          onClose={helpPopup.close}
          title={t('_How to add categories?')}
          description={
            <>
              <p>
                {t('_Some categories are not used', {
                  categoriesCount: unusedCategories.length,
                })}
              </p>
              <div className="relative py-5">
                <div
                  className={classNames(
                    'grid grid-cols-3  overflow-hidden relative',
                    { 'h-[145px]': unusedCategories.length > 6 },
                  )}
                >
                  {unusedCategories.slice(0, 6).map(c => (
                    <CategoryPreview
                      key={c.name}
                      category={c}
                      className="!m-0"
                    />
                  ))}
                  {unusedCategories.length > 6 && (
                    <div className="absolute h-28 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-white" />
                  )}
                </div>
                {unusedCategories.length > 6 && (
                  <div className="text-xs font-semibold text-gray-900">
                    {t('And many more...')}
                  </div>
                )}
              </div>
              <p className="pt-2">
                {t('_Add some suggested keywords to your recipes')}
                {t('_They could help you to find your recipes even easier')}
              </p>
            </>
          }
        >
          <Button.Black
            className="w-full"
            onClick={() => {
              setSearch('@no category')
              helpPopup.close()
            }}
          >
            {t('_Show the recipes without categories', {
              recipesCount: recipesWithoutCategories.length,
            })}
          </Button.Black>
        </Modal>
      </>
    )
  },
)

export default CategoriesList
