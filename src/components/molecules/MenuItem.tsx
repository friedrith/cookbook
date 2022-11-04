import classNames from 'classnames'
import { forwardRef } from 'react'

type Props = {
  active: boolean
  icon?:
    | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode
      }>
  onClick?: (event: React.SyntheticEvent) => void
  children?: React.ReactNode
}

const MenuItem = forwardRef(
  (
    { active, icon: Icon, onClick, children }: Props,
    ref: React.ForwardedRef<HTMLButtonElement | null>
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          active ? 'bg-gray-100' : '',
          'group block px-4 py-2 text-sm text-gray-700 cursor-pointer w-full flex items-center hover:bg-gray-100 hover:text-gray-900'
        )}
        onClick={onClick}
      >
        {Icon && (
          <Icon
            className="inline h-6 w-6 mr-2 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    )
  }
)

export default MenuItem
