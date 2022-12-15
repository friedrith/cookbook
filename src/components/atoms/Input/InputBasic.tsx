type Props = {
  type?: string
  className?: string
  onChange?: (value: string) => void
  id: string
  value: string
  placeholder: string
  style?: object
  autocomplete?: boolean
}

const InputBasic = ({
  type = 'text',
  className,
  onChange = () => {},
  id,
  value,
  placeholder,
  style = {},
  ...props
}: Props) => {
  return (
    <input
      type={type}
      name={id}
      id={id}
      style={style}
      className={`p-0 border-0 outline-none focus:outline-none focus:ring-0 ${className}`}
      onChange={e => onChange(e.target.value)}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default InputBasic
