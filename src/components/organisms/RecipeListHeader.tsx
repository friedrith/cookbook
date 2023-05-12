import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'

import Button from 'components/atoms/Button'
import Logo from 'components/atoms/Logo'
import FixedHeader from 'components/atoms/FixedHeader'
import UserMenu from 'components/organisms/UserMenu'
import SelectMenu from 'components/molecules/SelectMenu'
import NewRecipeForm from 'features/recipes/components/NewRecipeForm'
import Modal from 'components/atoms/Modal'
import usePopup from 'hooks/usePopup'
import ImportHelpPopup from 'components/organisms/ImportHelpPopup'
import classNames from 'classnames'
import CategoriesList from 'features/categories/components/CategoryList'
import Header from 'components/atoms/Header'
import SearchInput from 'features/search/components/SearchInput'
import useSearch from 'features/search/useSearch'
import useEventListener from 'hooks/useEventListener'

type Props = {
  restRef: React.RefObject<HTMLDivElement>
  hideSearch: boolean
  className?: string
}

const RecipeListHeader = ({ restRef, hideSearch, className }: Props) => {
  const { t } = useTranslation()

  const { isSearchActive, setSearch } = useSearch()

  const startSearchOnMobile = () => {
    setSearch('')
    setTimeout(() => {
      if (!inputMobileRef.current) return
      inputMobileRef.current.focus()
    }, 100)
  }

  const newRecipePopup = usePopup()
  const importHelpPopup = usePopup()

  const inputMobileRef = useRef<HTMLInputElement>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  useEventListener(
    'keydown',
    (event: React.KeyboardEvent<HTMLImageElement>) => {
      if (
        event.key === 'k' &&
        (event.metaKey || event.ctrlKey) &&
        inputRef.current
      ) {
        event.preventDefault()
        inputRef?.current?.focus()
      }
    },
  )

  return (
    <>
      <FixedHeader
        restRef={restRef}
        offset={0}
        className={`bg-white ${className}`}
      >
        {isMaximized => (
          <div className={classNames({ shadow: isMaximized })}>
            <Header fullWidth className="border-b border-gray-200">
              <div className="flex-auto flex items-center pointer-events-auto">
                {isSearchActive && (
                  <SearchInput
                    className="flex-1 block md:hidden"
                    disableAutoClose
                    ref={inputMobileRef}
                  />
                )}
                <div
                  className={classNames('flex-1 items-center', {
                    'hidden md:flex': isSearchActive,
                    flex: !isSearchActive,
                  })}
                >
                  <Logo />
                  <div className="flex-1" />
                  {!hideSearch && (
                    <>
                      <div
                        className={classNames(
                          'flex-1 hidden lg:block me-4 ms-0 transition-all',
                          isSearchActive ? 'lg:max-w-xs' : 'lg:max-w-[10rem]',
                        )}
                      >
                        <label htmlFor="search" className="sr-only">
                          {t('_Try banana bread')}
                        </label>
                        <SearchInput ref={inputRef} />
                      </div>
                      <button
                        className="mr-4 hidden md:block lg:hidden text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        onClick={startSearchOnMobile}
                        aria-label={t('_Search in recipes')}
                      >
                        <MagnifyingGlassIcon
                          className="h-8 w-8 stroke-1 "
                          aria-hidden="true"
                        />
                      </button>
                    </>
                  )}
                  <SelectMenu>
                    <NewRecipeForm onHelpRequest={importHelpPopup.open} />
                  </SelectMenu>
                  {!hideSearch && (
                    <button
                      className="ml-4 mr-4 block md:hidden text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={startSearchOnMobile}
                      aria-label={t('_Search in recipes')}
                    >
                      <MagnifyingGlassIcon
                        className="h-8 w-8 stroke-1 "
                        aria-hidden="true"
                      />
                    </button>
                  )}
                  <Button.Icon
                    onClick={newRecipePopup.open}
                    icon={PlusIcon}
                    className="block md:hidden rounded-md !text-white !bg-primary-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    aria-label={t('_Create Recipe')}
                  />
                  <UserMenu />
                </div>
              </div>
            </Header>
            <CategoriesList />
          </div>
        )}
      </FixedHeader>
      <Modal
        title={t('_New Recipe')}
        open={newRecipePopup.isOpen}
        onClose={newRecipePopup.close}
      >
        <NewRecipeForm onHelpRequest={importHelpPopup.open} />
      </Modal>
      <ImportHelpPopup
        open={importHelpPopup.isOpen}
        onClose={importHelpPopup.close}
      />
    </>
  )
}

export default RecipeListHeader
