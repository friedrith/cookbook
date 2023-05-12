import React, { useEffect, useRef, useState } from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Logo from 'components/atoms/Logo'
import CategoriesList from 'features/categories/components/CategoryList'
import useEventListener from 'hooks/useEventListener'
import useSearch from 'features/search/useSearch'
import SearchInput from 'features/search/components/SearchInput'
import Header from 'components/atoms/Header'

const MobileRecipeListHeader: React.FC = props => {
  const categoryListRef = useRef<HTMLDivElement>(null)

  const shouldBeSticky = () =>
    categoryListRef.current?.getBoundingClientRect().y === 0

  const [isSticky, setIsSticky] = useState(shouldBeSticky())

  useEventListener('scroll', () => {
    setIsSticky(shouldBeSticky())
  })

  const { isSearchActive } = useSearch()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchActive) {
      inputRef?.current?.focus()
    }
  }, [isSearchActive])

  return (
    <>
      <Header className="block md:hidden border-b border-gray-200">
        {isSearchActive ? (
          <SearchInput className="w-full" ref={inputRef} disableAutoClose />
        ) : (
          <>
            <Logo />

            <Link to="/preferences">
              <Cog6ToothIcon className="h-9 w-9 stroke-1 antialiased" />
            </Link>
          </>
        )}
      </Header>
      <CategoriesList
        ref={categoryListRef}
        className={classNames('block md:hidden sticky top-0 z-50 bg-white', {
          shadow: isSticky,
        })}
      />
    </>
  )
}

export default MobileRecipeListHeader
