import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { XIcon } from '@heroicons/react/outline'

import Select from 'components/atoms/Select'
import { setTheme, getTheme } from 'utils/theme'

const themes = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
]

const languages = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' }
  // { value: 'es', label: 'Español' },
]

const Preferences = ({ open, onClose }) => {
  const { t, i18n } = useTranslation()

  const [theme, setNewTheme] = useState(themes.find(({ value }) => value === getTheme()))

  const currentLanguage = languages.find(({ value }) => value === i18n.language) || languages[0]

  const changeLanguage = ({ value }) => i18n.changeLanguage(value)

  const changeTheme = newTheme => {
    setNewTheme(newTheme)
    setTheme(newTheme.value)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {t('preferences')}
              </Dialog.Title>
              <div className="py-5 flex items-center justify-center">
                <Select options={languages} onChange={changeLanguage} value={currentLanguage} label={t('language')} />
              </div>
              <div className="py-5 flex items-center justify-center">
                <Select options={themes} onChange={changeTheme} value={theme} label={t('theme')} />
              </div>

              {/* <p className="text-sm text-gray-500">
                Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
              </p> */}

              <div className="mt-4 text-right">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onClose}
                >
                  {t('close')}
                </button>
              </div>
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

Preferences.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

Preferences.defaultProps = {
  open: false,
  onClose: () => {}
}

export default Preferences
