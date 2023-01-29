import classNames from 'classnames'

interface CircleButtonProps {
  className?: string
  children: React.ReactNode
  'aria-label': string
  onClick?: () => void
}

const CircleButton = ({
  children,
  className,
  'aria-label': ariaLabel,
  onClick = () => {},
}: CircleButtonProps) => {
  return (
    <button
      className={classNames(
        'rounded-full w-7 h-7 flex items-center justify-center shadow bg-white border border-gray-400 hover:bg-gray-100 focus:ring-gray-300 text-gray-700',
        className,
      )}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CircleButton
