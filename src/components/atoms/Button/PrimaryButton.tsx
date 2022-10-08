import GenericButton from './GenericButton'
import classNames from 'utils/classNames'

type Props = {
  className?: string
  children?: React.ReactNode
  title?: string
  to?: string
  onClick?: () => void
  disabled?: boolean
}

const PrimaryButton = ({
  className = '',
  children = null,
  title = '',
  to,
  onClick,
  disabled = false,
}: Props) => {
  const allClassName = classNames(
    'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    className,
    disabled ? 'opacity-70' : ''
  )

  if (to) {
    return (
      <GenericButton to={to} className={allClassName} disabled={disabled}>
        {children}
      </GenericButton>
    )
  }
  return (
    <GenericButton
      className={allClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </GenericButton>
  )
}

export default PrimaryButton
