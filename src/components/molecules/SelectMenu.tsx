import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  children: React.ReactNode
}

const SelectMenu = ({ children }: Props) => {
  const { t } = useTranslation()

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className="hidden md:block bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white "
            aria-label={t('_New Recipe')}
          >
            <span className="ml-0.5 text-normal">{t('_New Recipe')}</span>
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel className="absolute cursor-default right-0 z-10 mt-2 w-96 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
              {children}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default SelectMenu
