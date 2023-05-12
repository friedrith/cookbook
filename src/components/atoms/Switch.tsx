import { Switch as HeadlessSwitch } from '@headlessui/react'
import classNames from 'classnames'

interface Props {
  checked?: boolean
  onChange?: (v: boolean) => void
  disabled?: boolean
}

const Switch: React.FC<Props> = ({
  checked = false,
  onChange = () => {},
  disabled,
}) => {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      className={classNames(
        checked ? 'bg-black' : 'bg-gray-200',
        { 'cursor-pointer': !disabled },
        'me-1 ms-4 relative  inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          checked ? 'translate-x-5' : 'translate-x-0',
          'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      />
    </HeadlessSwitch>
  )
}

export default Switch
