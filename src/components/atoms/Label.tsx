type Props = {
  className?: string
  htmlFor?: string
  children: React.ReactNode
}

const Label = ({ className, htmlFor, children }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  )
}

export default Label
