import classNames from 'classnames'

type Props = {
  id?: string
  name?: string
  className?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options: { value: string; label: string }[]
}

const Select = ({
  id,
  name,
  className,
  defaultValue,
  onChange = () => {},
  options,
}: Props) => {
  return (
    <select
      id={id}
      name={name}
      className={classNames(
        'block w-full rounded-md border-gray-300 py-2 pl-3 rtl:pl-0 pr-10 rtl:pl-10 text-base focus:border-black focus:outline-none focus:ring-black sm:text-sm cursor-pointer',
        className,
      )}
      defaultValue={defaultValue}
      onChange={event => onChange(event.target.value)}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default Select
