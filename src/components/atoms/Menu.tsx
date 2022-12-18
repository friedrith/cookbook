import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

type Props = {
  children?: React.ReactNode
  menuButtonClassName?: string
  menuButton: React.ReactNode
  as?: React.ElementType<any>
}

const CustomMenu = ({
  menuButton,
  menuButtonClassName,
  children,
  as,
}: Props) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={as} className={menuButtonClassName}>
        {menuButton}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left z-40 mt-2 w-48  rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default CustomMenu
