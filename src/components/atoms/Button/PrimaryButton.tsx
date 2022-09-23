import GenericButton from './GenericButton'
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
    'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    className
  )

  if (to) {
    return (
      <GenericButton to={to} className={allClassName}>
        {children}
      </GenericButton>
    )
  }
  return (
    <GenericButton className={allClassName} onClick={onClick}>
      {children}
    </GenericButton>
  )
}

export default PrimaryButton
