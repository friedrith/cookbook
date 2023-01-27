import classNames from 'classnames'
import { forwardRef } from 'react'
import { Menu } from '@headlessui/react'

type Props = {
  icon?:
    | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode
      }>
  onClick?: (event: React.SyntheticEvent) => void
  children?: React.ReactNode
  disabled?: boolean
  className?: string
}

const MenuItem = forwardRef(
  (
    { icon: Icon, onClick, children, disabled, className }: Props,
    ref: React.ForwardedRef<HTMLButtonElement | null>,
  ) => {
    return (
      <Menu.Item>
        {({ active }) => (
          <button
            ref={ref}
            className={classNames(
              className,
              disabled ? 'opacity-50' : '',
              active ? 'bg-gray-100' : '',
              'group block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full flex items-center hover:bg-gray-100 hover:text-gray-900 relative z-auto whitespace-nowrap',
            )}
            onClick={onClick}
            disabled={disabled}
          >
            {Icon && (
              <Icon
                className="inline h-6 w-6 ltr:mr-2 rtl:ml-2 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            )}
            {children}
          </button>
        )}
      </Menu.Item>
    )
  },
)

export default MenuItem
