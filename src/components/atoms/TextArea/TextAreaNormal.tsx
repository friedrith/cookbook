type Props = {
  className?: string
  onChange: (value: string) => void
  id: string
  value: string
  placeholder?: string
  rows?: number
}

const TextArea = ({
  className,
  onChange,
  id,
  value,
  placeholder = '',
  rows = 3,
  ...props
}: Props) => {
  return (
    <textarea
      name={id}
      id={id}
      className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${className}`}
      onChange={e => onChange(e.target.value)}
      value={value}
      rows={rows}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default TextArea
