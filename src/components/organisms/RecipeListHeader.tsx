import { useState, useRef, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchIcon, PlusIcon, XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

import useEventListener from 'hooks/useEventListener'
import Button from 'components/atoms/Button'
import Logo from 'components/atoms/Logo'
import Header from 'components/atoms/Header'
import UserMenu from 'components/organisms/UserMenu'

type Props = {
  restRef: React.RefObject<HTMLDivElement>
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchValue: string
}

const RecipeListHeader = ({ onSearchChange, restRef, searchValue }: Props) => {
  const { t } = useTranslation()

  const [searchOnMobileIsVisible, showSearchOnMobile] = useState(false)

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
    <Header restRef={restRef} offset={0}>
      {isMaximized => (
        <div className="flex-1 flex items-center pointer-events-auto">
          {!searchOnMobileIsVisible && <Logo />}
          <div className="flex-1 hidden lg:block items-center"></div>
          <div
            className={classNames('flex-1 lg:block flex-0 lg:max-w-xs', {
              hidden: !searchOnMobileIsVisible,
            })}
          >
            <label htmlFor="search" className="sr-only">
              {t('_Try banana bread')}
            </label>
            <div className="relative clas">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
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
          {searchOnMobileIsVisible && (
            <button
              className="ml-2 flex items-center block lg:hidden"
              onClick={() => showSearchOnMobile(false)}
            >
              <XIcon
                className="h-8 w-8 stroke-1 text-gray-400 rounded-full hover:text-gray-300"
                aria-hidden="true"
              />
            </button>
          )}
          <div className="flex-1" />
          {/* <PrimaryButton to="/recipes/new" className="ml-2 hidden lg:block">
 {t('_New Recipe')}
</PrimaryButton> */}
          <Button.Primary
            to="/recipes/new"
            className="hidden lg:block rounded-md mr-6 !text-white !bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="ml-0.5 text-normal">{t('_New Recipe')}</span>
          </Button.Primary>

          {!searchOnMobileIsVisible && (
            <div className="flex items-center">
              <Button.Icon
                url="/recipes/new"
                icon={PlusIcon}
                className="block lg:hidden rounded-md mr-2 !text-white !bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
              <button
                className="ml-2 lg:ml-4 block lg:hidden text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => showSearchOnMobile(true)}
              >
                <SearchIcon className="h-8 w-8 stroke-1 " aria-hidden="true" />
              </button>

              {/* <Link
     to="/recipes/new"
     className="mr-4 block lg:hidden text-white border border-transparent rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
   >
     <PlusIcon className="h-8 w-8 stroke-1 " aria-hidden="true" />
   </Link> */}
              <UserMenu />
              {/* <Link
                to="/preferences"
                className="text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <AdjustmentsIcon
                  className="h-8 w-8 stroke-0"
                  aria-hidden="true"
                />
              </Link> */}
            </div>
          )}
        </div>
      )}
    </Header>
  )
}

export default RecipeListHeader
