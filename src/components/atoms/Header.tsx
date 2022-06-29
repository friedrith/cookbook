import { useRef, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { CogIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { SearchIcon } from '@heroicons/react/solid'

import useEventListener from 'hooks/useEventListener'

type Props = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchValue: string
}

const Header = ({ onSearchChange, searchValue }: Props) => {
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEventListener('keydown', (event: KeyboardEvent<HTMLImageElement>) => {
    if (
      event.key === 'k' &&
      (event.metaKey || event.ctrlKey) &&
      inputRef.current
    ) {
      event.preventDefault()
      inputRef.current.focus()
    }
  })

  return (
    <div className="relative flex items-stretch justify-between">
      <div className="flex-1 hidden lg:block" />
      <div className="flex-1 flex-0 lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          {t('_Try banana bread')}
        </label>
        <div className="relative clas">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={t('_Try banana bread')}
            type="text"
            ref={inputRef}
            onChange={onSearchChange}
            autoComplete="off"
            defaultValue={searchValue}
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 hidden lg:block">
            <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden lg:block" />
      <Link
        to="/recipes/new"
        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {t('_Create Recipe')}
      </Link>
      <div className="ml-2 lg:ml-4 flex items-center">
        <Link
          to="/preferences"
          className="text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <CogIcon className="h-8 w-8 stroke-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export default Header
