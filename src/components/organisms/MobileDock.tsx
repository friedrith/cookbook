import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import {
  HomeIcon as HomeOutlineIcon,
  MagnifyingGlassIcon as MagnifyingGlassOutlineIcon,
  PlusCircleIcon as PlusCircleOutlineIcon,
} from '@heroicons/react/24/outline'

import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid'
import ImportHelpPopup from './ImportHelpPopup'
import usePopup from '~/src/hooks/usePopup'
import Modal from '~/src/components/atoms/Modal'
import NewRecipeForm from '~/src/features/recipes/components/NewRecipeForm'
import useSearch from '~/src/features/search/useSearch'

const MobileDock = () => {
  const { t } = useTranslation()

  const newRecipePopup = usePopup()
  const importHelpPopup = usePopup()

  const { isSearchActive, setSearch } = useSearch()

  const location = useLocation()

  const items = [
    {
      Icon: HomeIcon,
      IconOutline: HomeOutlineIcon,
      id: 'home',
      label: '_Home',
      onClick: () => {
        setSearch(null)
      },
      isActive:
        !isSearchActive &&
        !newRecipePopup.isOpen &&
        !location.pathname.includes('/shopping-list'),
    },
    {
      Icon: MagnifyingGlassIcon,
      IconOutline: MagnifyingGlassOutlineIcon,
      id: 'search',
      label: '_Search',
      onClick: () => setSearch(''),
      isActive: isSearchActive,
    },
    {
      Icon: PlusCircleIcon,
      IconOutline: PlusCircleOutlineIcon,
      id: 'new-recipe',
      label: '_New Recipe',
      onClick: () => newRecipePopup.open(),
      isActive: newRecipePopup.isOpen,
    },
    // {
    //   Icon: ShoppingCartIcon,
    //   IconOutline: ShoppingCartOutlineIcon,
    //   id: 'shopping-bag',
    //   label: 'shoppingList.Shopping list',
    //   onClick: () => navigate('/recipes/shopping-list'),
    //   isActive: location.pathname.includes('/shopping-list'),
    // },
  ]

  return (
    <div className="block md:hidden bg-white fixed z-50 bottom-0 left-0 right-0 shadow flex items-stretch shadow border-t border-gray-200">
      {items
        .map(i => (i.isActive ? { ...i, IconOutline: i.Icon } : i))
        .map(({ IconOutline, id, label, onClick, isActive }) => (
          <button
            className={classNames(
              'flex-1 flex flex-col items-center justify-center outline-none p-3 focus:outline-none',
              isActive ? 'text-black' : 'text-gray-400',
            )}
            key={id}
            onClick={onClick}
          >
            <IconOutline className="h-8 w-8 stroke-1 antialiased" />
            <div className="text-xs">{t(label)}</div>
          </button>
        ))}
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
    </div>
  )
}

export default MobileDock
