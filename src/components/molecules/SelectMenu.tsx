import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

type Props = {
  button: React.ReactNode
  children: React.ReactNode
}

const SelectMenu = ({ button, children }: Props) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>{button}</Popover.Button>
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
