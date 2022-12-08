/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  EllipsisVerticalIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  ArrowTopRightOnSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

import { useAppDispatch } from 'hooks/redux'
import { logout } from 'store'
import { isMobile } from 'utils/platforms/mobile'
import {
  getPWAInstallationPrompt,
  resetPWAInstallationPrompt,
} from 'utils/platforms/pwa'
import MenuItem from 'components/atoms/MenuItem'
import Menu from 'components/atoms/Menu'

import useBeforeInstallPrompt from 'hooks/useBeforeInstallPrompt'
import useIsStandalonePWA from 'hooks/useIsStandalonePWA'
import HelpPopup from 'components/organisms/HelpPopup'
import usePopup from 'hooks/usePopup'
import SettingsPopup from './SettingsPopup'

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

  const installApp = async (event: React.SyntheticEvent) => {
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

  const helpPopup = usePopup(false)

  const settingsPopup = usePopup(false)

  const menuOptions = [
    {
      icon: UserCircleIcon,
      label: '_Settings',
      onClick: settingsPopup.open,
    },
    {
      icon: ArrowTopRightOnSquareIcon,
      label: isMobile() ? '_Install Mobile App' : '_Install Desktop App',
      disabled: appInstallationEnabled,
      onClick: installApp,
    },
    {
      icon: QuestionMarkCircleIcon,
      label: '_Help',
      onClick: helpPopup.open,
    },
    {
      icon: ArrowRightOnRectangleIcon,
      label: '_Logout',
      onClick: () => {
        dispatch(logout())
        navigate('/')
      },
    },
  ]

  return (
    <div className="flex sm:items-center pl-2 md:pl-0">
      {/* Profile dropdown */}
      <Menu
        as="button"
        menuButtonClassName="flex max-w-xs items-center rounded-full bg-white hover:text-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        menuButton={
          <>
            <span className="sr-only">{t('_Open Menu')}</span>
            <EllipsisVerticalIcon
              className="block h-6 w-6"
              aria-hidden="true"
            />
          </>
        }
      >
        <>
          {menuOptions
            .filter(({ disabled }) => !disabled)
            .map(({ label, onClick, icon }) => (
              <MenuItem icon={icon} onClick={onClick}>
                {t(label)}
              </MenuItem>
            ))}
        </>
      </Menu>
      <HelpPopup open={helpPopup.isOpen} onClose={helpPopup.close} />
      <SettingsPopup
        open={settingsPopup.isOpen}
        onClose={settingsPopup.close}
      />
    </div>
  )
}

export default UserMenu
