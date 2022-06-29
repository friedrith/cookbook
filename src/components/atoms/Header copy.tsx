import { Fragment, useRef, KeyboardEvent } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { MenuIcon, XIcon, CogIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { useDispatch } from 'react-redux'
import { SearchIcon } from '@heroicons/react/solid'

// import Preferences from 'components/molecules/Preferences'
import Avatar from 'components/atoms/Avatar'
import usePopup from 'hooks/usePopup'
import useEventListener from 'hooks/useEventListener'
// import { logout } from 'store'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

type Navigation = Array<{
  name: string
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}>

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const MobileMenuButton = ({ open }: { open: boolean }) => {
  return (
    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  )
}

const MobileMenu = ({ navigation }: { navigation: Navigation }) => {
  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="pt-4 pb-3 border-t border-secondary-700 dark:border-dark-secondary-700">
        <div className="px-5 flex items-center">
          <div className="flex-shrink-0 ">
            <Avatar />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-primary-700 dark:text-gray-400">
              {user.name}
            </div>
            <div className="text-sm font-medium text-primary-500  dark:text-gray-500">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={item.onClick}
              className="w-full block rounded-md py-2 px-3 text-base font-medium text-primary-700  dark:text-gray-400 hover:bg-secondary-700 hover:bg-opacity-75 text-left"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </Disclosure.Panel>
  )
}

const DesktopUserDropDown = ({ navigation }: { navigation: Navigation }) => {
  return (
    <Menu as="div" className="ml-3 relative flex-shrink-0">
      <div>
        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Open user menu</span>
          <Avatar />
          {/* <img className="rounded-full h-8 w-8" src={user.imageUrl} alt="" /> */}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {navigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'w-full text-left block px-4 py-2 text-sm text-gray-700'
                  )}
                  onClick={item.onClick}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

type Props = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchValue: string
}

const Header = ({ onSearchChange, searchValue }: Props) => {
  const preferenceModal = usePopup()

  // const dispatch = useDispatch()

  const navigate = useNavigate()

  const { t } = useTranslation()

  const userNavigation = [
    {
      name: t('_settings'),
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        event.preventDefault()
        preferenceModal.open()
      },
    },
    {
      name: t('_sign out'),
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('close')
        event.stopPropagation()
        event.preventDefault()
        // dispatch(logout())
        navigate('/')
      },
    },
  ]

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
    <>
      {/* <Preferences open={isOpen} onClose={closeModal} /> */}

      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="">
              <div className="relative h-16 flex items-center justify-between">
                <div className="flex-1 hidden lg:block" />
                <div className="flex-auto flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      {t('_Try banana bread')}
                    </label>
                    <div className="relative">
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
                </div>
                <div className="flex-1 lg:block" />
                {/* <div className="flex items-center lg:hidden">
                  <MobileMenuButton open={open} />
                </div> */}
                <div className="lg:ml-4">
                  <div className="flex items-center">
                    <Link
                      to="/preferences"
                      className="text-gray-400 rounded-full hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <CogIcon
                        className="h-8 w-8 stroke-1"
                        aria-hidden="true"
                      />
                    </Link>
                    {/* <DesktopUserDropDown navigation={userNavigation} /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <MobileMenu navigation={userNavigation} /> */}
          </>
        )}
      </Disclosure>
    </>
  )
}

export default Header
