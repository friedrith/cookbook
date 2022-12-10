import TextareaAutosize from 'react-textarea-autosize'

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
    <TextareaAutosize
      name={id}
      id={id}
      className={`focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md resize-none ${className}`}
      onChange={e => onChange(e.target.value)}
      value={value}
      minRows={rows}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default TextArea
