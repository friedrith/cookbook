type Props = {
  className?: string
  children?: React.ReactNode
  title?: string
  onClick?: () => void
}

const Button = ({
  className = '',
  children = null,
  title = '',
  onClick = () => {},
}: Props) => {
  return (
    <button
      type="button"
      className={`relative inline-flex items-center px-0.25 py-0.25 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${className}`}
      onClick={onClick}
    >
      <span className="sr-only">{title}</span>
      {children}
    </button>
  )
}

export default Button
