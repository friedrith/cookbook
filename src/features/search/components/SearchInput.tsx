import { forwardRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import useTimeout from '~/src/hooks/useTimeout'
import useSearch from '../useSearch'

interface SearchInputProps {
  className?: string
  disableAutoClose?: boolean
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, disableAutoClose }, ref) => {
    const { t } = useTranslation()

    const { query, isSearchActive, setSearch } = useSearch()

    const setTimeoutSafe = useTimeout()

    return (
      <div className={classNames('relative', className)}>
        <div className="absolute inset-y-0 ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className={classNames(
              'h-5 w-5',
              isSearchActive
                ? 'text-primary-600 font-extrabold'
                : 'text-gray-400',
            )}
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search-recipes"
          className="block w-full ltr:pl-10 ltr:pr-3 rtl:pr-10 rtl:pl-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder={isSearchActive ? t('_Search in recipes') : t('_Search')}
          type="text"
          ref={ref}
          onChange={event => setSearch(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Escape') {
              setSearch(undefined)
            }
          }}
          value={query || ''}
          aria-label={t('_Search in recipes')}
          onFocus={() => {
            if (query === undefined) {
              setSearch('')
            }
          }}
          onBlur={() => {
            if (!disableAutoClose && !query) {
              setTimeoutSafe(() => {
                setSearch(undefined)
              }, 100)
            }
          }}
        />
        {isSearchActive ? (
          <button
            className="absolute inset-y-0 ltr:right-0 ltr:pr-1.5 rtl:left-0 rtl:pl-1.5 flex py-1.5 items-center cursor-pointer "
            onClick={() => {
              setSearch(undefined)
            }}
          >
            <XMarkIcon
              className="h-6 w-6 stroke-1 text-gray-400 rounded-full hover:text-gray-300 block"
              aria-hidden="true"
            />
          </button>
        ) : (
          <div className="absolute inset-y-0 ltr:right-0 ltr:pr-1.5 rtl:left-0 rtl:pl-1.5 flex py-1.5 hidden lg:block pointer-events-none">
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <kbd className="inline-flex items-center rounded-full px-2 text-sm font-sans font-medium text-gray-400 bg-white">
              ⌘K
            </kbd>
          </div>
        )}
      </div>
    )
  },
)

export default SearchInput
