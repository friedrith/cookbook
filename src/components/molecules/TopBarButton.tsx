import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { TopBarContext } from 'components/atoms/TopBar'

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
}

const TopBarButton = ({
  url,
  className,
  icon: Icon,
  onClick = () => {},
  children = [],
  disabled = false,
  blur = false,
}: Props) => {
  const { isMaximized } = useContext(TopBarContext)

  const classes = classNames(
    'p-2 text-base font-medium text-gray-900 hover:text-gray-900 flex h-15 w-15 items-center bg-white pointer-events-auto',
    disabled ? 'cursor-no-drop' : 'cursor-pointer',
    isMaximized ? '' : 'shadow rounded-md',
    blur ? 'bg-opacity-50 backdrop-filter backdrop-blur' : '',
    className
  )

  return (
    <>
      {url ? (
        <Link className={classes} to={url}>
          {Icon && <Icon className="h-7 w-7" aria-hidden="true" />}
          {children}
        </Link>
      ) : (
        <button className={classes} onClick={onClick} disabled={disabled}>
          {Icon && <Icon className="h-7 w-7" aria-hidden="true" />}
          {children}
        </button>
      )}
    </>
  )
}

export default TopBarButton
