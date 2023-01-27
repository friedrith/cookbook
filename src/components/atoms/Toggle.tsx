import { Switch } from '@headlessui/react'
import { BoltIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

type Props = {
  enabled: boolean
  onChange: (value: boolean) => void
  'aria-label': string
}

const Toggle = ({ enabled, onChange, 'aria-label': ariaLabel }: Props) => {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      as="div"
      className={classNames(
        enabled ? 'bg-primary-400' : 'bg-gray-300',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      )}
    >
      <span className="sr-only">{ariaLabel}</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <BoltIcon className="h-3 w-3 text-primary-500" />
        </span>
      </span>
    </Switch>
  )
}

export default Toggle
