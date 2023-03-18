import { useState, useRef, useContext } from 'react'

import VerificationCodeContext from './context'

export interface VerificationCodeInputProps {
  className?: string
  fields?: number
  onChange?: (value: string[]) => void
  onComplete?: (value: string) => void
  'aria-label'?: string
  'data-testid'?: string
}

// https://beta.reactjs.org/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
// https://codepen.io/tatthien/pen/LYZxEmv
const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  className,
  onChange = () => {},
  onComplete = () => {},
  fields = 4,
  'aria-label': ariaLabel,
}) => {
  const [values, setValues] = useState(new Array(fields).fill(''))

  const inputRefs = useRef(new Map())

  const changeValues = (newValues: string[]) => {
    setValues(newValues)
    onChange(newValues)

    if (newValues.join('').length === fields) {
      onComplete(newValues.join(''))
    }
  }

  const context = useContext(VerificationCodeContext)

  return (
    <div className={context ?? 'flex justify-center gap-x-2'}>
      <input type="text" className="sr-only" aria-label={ariaLabel} />
      {values
        .map((_, index) => index)
        .map((f, index) => (
          <input
            type="tel"
            key={f}
            autoComplete="none"
            className={className}
            name=""
            id=""
            maxLength={1}
            aria-hidden
            value={values[index]}
            ref={node => {
              if (node) {
                inputRefs.current.set(index, node)
              } else {
                inputRefs.current.delete(index)
              }
            }}
            onPaste={event => {
              const paste = event.clipboardData.getData('text')

              changeValues([
                ...(index > 0 ? values.slice(0, index) : []),
                ...paste.substring(0, fields - index).split(''),
                ...values.slice(index + paste.split('').length),
              ])
            }}
            onChange={event => {
              const newValues = [...values]
              const oldValue = newValues[index]
              const newValue = event.target.value
              newValues[index] = newValue
              changeValues(newValues)
              if (!oldValue && newValue) {
                inputRefs.current.get(index + 1)?.select()
              }
            }}
            onKeyDown={event => {
              if (event.key === 'ArrowLeft') {
                inputRefs.current.get(index - 1)?.select()
              } else if (event.key === 'ArrowRight') {
                inputRefs.current.get(index + 1)?.select()
              } else if (event.key === 'Backspace' && !values[index]) {
                inputRefs.current.get(index - 1)?.select()
              }
            }}
            onFocus={event => {
              setTimeout(() => {
                event.target.select()
              }, 0)
            }}
          />
        ))}
    </div>
  )
}

export default VerificationCodeInput
