import GenericButton, { Props } from './GenericButton'
import classNames from 'classnames'
import { forwardRef } from 'react'

const PrimaryButton = forwardRef(
  (
    {
      className = '',
      children = null,
      title = '',
      to,
      disabled,
      ...props
    }: Props,
    ref,
  ) => {
    const allClassName = classNames(
      'transition-colors	bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 hover:from-primary-500 hover:via-primary-500 hover:to-primary-500 focus:ring-primary-500',
      className,
      disabled ? 'opacity-70' : '',
    )

    if (to) {
      return (
        <GenericButton
          to={to}
          className={allClassName}
          disabled={disabled}
          {...props}
        >
          {children}
        </GenericButton>
      )
    }
    return (
      <GenericButton
        className={allClassName}
        disabled={disabled}
        {...props}
        ref={ref}
      >
        {children}
      </GenericButton>
    )
  },
)

export default PrimaryButton
