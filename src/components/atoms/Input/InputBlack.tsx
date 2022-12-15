import { Props } from './Input'

const InputBack = ({
  type = 'text',
  className,
  onChange = () => {},
  id,
  value,
  name,
  ...props
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={`block w-full shadow-sm sm:text-sm border-gray-300 focus:ring-black focus:border-black  rounded-md ${className}`}
      onChange={event => onChange(event.target.value)}
      value={value}
      {...props}
    />
  )
}

export default InputBack
