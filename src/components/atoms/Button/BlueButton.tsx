import GenericButton, { Props } from './GenericButton'
import classNames from 'classnames'

const BlueButton = ({
  className = '',
  children = null,
  title = '',
  to,
  onClick,
  disabled = false,
  ...props
}: Props) => {
  const allClassName = classNames(
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    className,
    disabled ? 'opacity-70' : '',
  )

  return (
    <GenericButton
      to={to}
      className={allClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </GenericButton>
  )
}

export default BlueButton
