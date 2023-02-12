import classNames from 'classnames'
import Link from 'next/link'
import { useContext } from 'react'

import { TopBarContext } from '@/components/atoms/FixedHeader'

type Props = {
  url?: string
  className?: string
  icon?:
    | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode
      }>
  onClick?: () => void
  children?: React.ReactNode
  disabled?: boolean
  blur?: boolean
  label?: string
  basic?: boolean
  title?: string
  rightIcon?: boolean
}

const IconButton = ({
  url,
  className,
  icon: Icon,
  onClick = () => {},
  children = [],
  disabled = false,
  blur = false,
  label = '',
  basic = false,
  title = '',
  rightIcon = false,
}: Props) => {
  const { isMaximized } = useContext(TopBarContext)

  const classes = classNames(
    'p-2 text-base font-medium text-gray-900 hover:text-primary-400 flex h-15 w-15 items-center bg-white pointer-events-auto',
    disabled ? 'cursor-no-drop opacity-50' : 'cursor-pointer',
    isMaximized || basic ? '' : 'shadow rounded-md',
    blur ? 'bg-opacity-50 backdrop-filter backdrop-blur' : '',
    className,
  )

  return (
    <>
      {url ? (
        <Link
          className={classes}
          href={url}
          onClick={onClick}
          aria-label={title}
        >
          {label && rightIcon && (
            <span className="mr-0.5 hidden sm:inline text-normal">{label}</span>
          )}
          {Icon && <Icon className="h-7 w-7" aria-hidden="true" />}
          {label && !rightIcon && (
            <span className="ml-0.5 hidden sm:inline text-normal">{label}</span>
          )}
          {children}
        </Link>
      ) : (
        <button
          className={classes}
          onClick={onClick}
          disabled={disabled}
          aria-label={title}
        >
          {label && rightIcon && (
            <span className="mr-0.5 hidden sm:inline text-normal">{label}</span>
          )}
          {Icon && <Icon className="h-7 w-7" aria-hidden="true" />}
          {label && !rightIcon && (
            <span className="ml-0.5 hidden sm:inline text-normal">{label}</span>
          )}
          {children}
        </button>
      )}
    </>
  )
}

export default IconButton
