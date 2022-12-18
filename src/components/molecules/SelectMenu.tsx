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
            <span className="ltr:ml-0.5 rtl:mr-0.5 text-normal">
              {t('_New Recipe')}
            </span>
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel className="absolute cursor-default w-96 z-10 mt-2 ltr:right-0  ltr:origin-top-right rtl:left-0 rtl:origin-top-left overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
              {children}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default SelectMenu
