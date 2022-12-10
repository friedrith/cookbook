import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import Button from 'components/atoms/Button'

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
            as={Button.Primary}
            className="hidden md:block"
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
