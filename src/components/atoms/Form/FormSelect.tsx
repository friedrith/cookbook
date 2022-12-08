import { Switch } from '@headlessui/react'
import classNames from 'classnames'

type Props = {
  description: string | React.ReactNode
  checked: boolean
  onChange: (b: boolean) => void
  disabled?: boolean
}

const FormSelect = ({ description, checked, onChange, disabled }: Props) => {
  return (
    <Switch.Group as="li" className="flex items-center justify-between">
      <div className="flex flex-col">
        <Switch.Description
          className={classNames('mt-1 text-xs text-gray-500', {
            'opacity-50': disabled,
          })}
        >
          {description}
        </Switch.Description>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={classNames(
          checked && !disabled ? 'bg-indigo-600' : 'bg-gray-200',
          { 'cursor-pointer': !disabled },
          'mt-1  relative ml-4 inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? 'translate-x-5' : 'translate-x-0',
            'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}

export default FormSelect
