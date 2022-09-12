type Props = {
  type?: string
  className?: string
  onChange: (value: string) => void
  id: string
  value: string
}

const InputNormal = ({
  type = 'text',
  className,
  onChange,
  id,
  value,
  ...props
}: Props) => {
  return (
    <input
      type={type}
      name={id}
      id={id}
      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${className}`}
      onChange={event => onChange(event.target.value)}
      value={value}
      {...props}
    />
  )
}

export default InputNormal
