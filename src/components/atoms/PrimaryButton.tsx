import { Link } from 'react-router-dom'

import classNames from 'utils/classNames'

type Props = {
  className?: string
  children?: React.ReactNode
  title?: string
  to?: string
  onClick?: () => void
}

const PrimaryButton = ({
  className = '',
  children = null,
  title = '',
  to,
  onClick,
}: Props) => {
  const allClassName = classNames(
    'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    className
  )

  if (to) {
    return (
      <Link to={to} className={allClassName}>
        <span className="sr-only">{title}</span>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={allClassName} onClick={onClick}>
      <span className="sr-only">{title}</span>
      {children}
    </button>
  )
}

export default PrimaryButton
