import { forwardRef, ForwardedRef } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

export type Props = {
  className?: string
  children?: React.ReactNode
  title?: string
  to?: string
  onClick?: () => void
  disabled?: boolean
  id?: string
  name?: string
  type?: 'button' | 'submit'
}

const GenericButton = forwardRef(
  (
    {
      className = '',
      children = null,
      title = '',
      to,
      onClick,
      disabled = false,
      id,
      name,
      type = 'button',
    }: Props,
    ref: ForwardedRef<any>,
  ) => {
    const allClassName = classNames(
      'inline-flex justify-center items-center px-3 py-2 border border-transparent text-base sm:text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
      className,
    )

    if (to) {
      return (
        <Link to={to} className={allClassName} id={id} ref={ref}>
          <span className="sr-only">{title}</span>
          {children}
        </Link>
      )
    }
    return (
      <button
        ref={ref}
        type={type}
        className={allClassName}
        onClick={onClick}
        disabled={disabled}
        id={id}
        name={name}
      >
        <span className="sr-only">{title}</span>
        {children}
      </button>
    )
  },
)

export default GenericButton
