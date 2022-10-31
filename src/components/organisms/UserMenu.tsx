/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'
import {
  EllipsisVerticalIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  ArrowTopRightOnSquareIcon,
  CogIcon,
} from '@heroicons/react/24/outline'

import classNames from 'utils/classNames'
import { useAppDispatch } from 'hooks/redux'
import { logout } from 'store'
import { isMobile } from 'utils/platforms/mobile'
import {
  getPWAInstallationPrompt,
  resetPWAInstallationPrompt,
} from 'utils/platforms/pwa'

import useBeforeInstallPrompt from 'hooks/useBeforeInstallPrompt'
import useIsStandalonePWA from 'hooks/useIsStandalonePWA'
import HelpPopup from 'components/organisms/HelpPopup'
import usePopup from 'hooks/usePopup'

const UserMenu = () => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const navigate = useNavigate()

  const isStandalone = useIsStandalonePWA()

  const [appInstallationEnabled, setAppInstallationEnabled] = useState(
    getPWAInstallationPrompt() && !isStandalone
  )

  useBeforeInstallPrompt(() => {
    setAppInstallationEnabled(true && !isStandalone)
  })

  // useBeforeInstallPrompt()

  const installApp = async (event: React.MouseEvent<HTMLElement>) => {
    const deferredPrompt = getPWAInstallationPrompt()

    if (deferredPrompt) {
      deferredPrompt.prompt()

      const { outcome } = await deferredPrompt.userChoice

      console.log(`User response to the install prompt: ${outcome}`)

      resetPWAInstallationPrompt()
    } else {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const helpPopup = usePopup(true)

  return (
    <div className="flex sm:items-center pl-2 md:pl-0">
      {/* Profile dropdown */}
      <Menu as="div" className="relative">
        <div data-tip={t('_Open Menu')}>
          <Menu.Button className="flex max-w-xs items-center rounded-full bg-white hover:text-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="sr-only">{t('_Open Menu')}</span>
            <EllipsisVerticalIcon
              className="block h-6 w-6"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/help"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'group block px-4 py-2 text-sm text-gray-700 cursor-pointer flex items-center'
                  )}
                >
                  <CogIcon
                    className="inline h-6 w-6 mr-2 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {t('_Settings')}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'group block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full text-left flex items-center'
                  )}
                  onClick={helpPopup.open}
                >
                  <QuestionMarkCircleIcon
                    className="inline h-6 w-6 mr-2 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {t('_Help')}
                </button>
              )}
            </Menu.Item>
            {appInstallationEnabled && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'group block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full text-left flex items-center'
                    )}
                    onClick={installApp}
                  >
                    <ArrowTopRightOnSquareIcon
                      className="inline h-6 w-6 mr-2 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {isMobile()
                      ? t('_Install Mobile App')
                      : t('_Install Desktop App')}
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'group block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full text-left flex items-center'
                  )}
                  onClick={() => {
                    dispatch(logout())
                    navigate('/')
                  }}
                >
                  <ArrowRightOnRectangleIcon
                    className="inline h-6 w-6 mr-2 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {t('_Logout')}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <HelpPopup open={helpPopup.isOpen} onClose={helpPopup.close} />
    </div>
  )
}

export default UserMenu
