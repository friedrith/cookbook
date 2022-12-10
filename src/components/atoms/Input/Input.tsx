export type Props = {
  type?: string
  className?: string
  onChange: (value: string) => void
  id?: string
  value?: string
  name?: string
  style?: object
  placeholder?: string
}

const Input = ({
  type = 'text',
  className,
  onChange,
  id,
  name,
  value,
  ...props
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={className}
      onChange={e => onChange(e.target.value)}
      value={value}
      {...props}
    />
  )
}

export default Input
