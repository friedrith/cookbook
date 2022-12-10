import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import classNames from 'classnames'

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
  const [isFocused, setFocus] = useState(false)

  return (
    <div
      className={classNames(
        'relative relative before:block before:absolute before:top-0 before:bottom-0 before:left-[-10px] before:w-1',
        {
          'before:bg-primary-500': isFocused,
          'before:bg-gray-200': !isFocused,
        }
      )}
    >
      <TextareaAutosize
        name={id}
        id={id}
        className={`p-0 border-0 outline-none focus:outline-none focus:ring-0 resize-none ${className}`}
        onChange={e => onChange(e.target.value)}
        value={value}
        minRows={rows}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
    </div>
  )
}

export default TextArea
