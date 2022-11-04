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

const BlackButton = ({
  className = '',
  children = null,
  title = '',
  to,
  onClick,
  disabled = false,
}: Props) => {
  const allClassName = classNames(
    'bg-black text-white hover:bg-gray-800 focus:ring-gray-900',
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

export default BlackButton
