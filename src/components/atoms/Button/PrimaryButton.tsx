import GenericButton, { Props } from './GenericButton'
import classNames from 'utils/classNames'

const PrimaryButton = ({
  className = '',
  children = null,
  title = '',
  to,
  disabled,
  ...props
}: Props) => {
  const allClassName = classNames(
    'transition-colors	bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 hover:from-primary-500 hover:via-primary-500 hover:to-primary-500 focus:ring-primary-500',
    className,
    disabled ? 'opacity-70' : ''
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
    <GenericButton className={allClassName} disabled={disabled} {...props}>
      {children}
    </GenericButton>
  )
}

export default PrimaryButton
