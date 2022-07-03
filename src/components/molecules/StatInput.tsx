import classNames from 'utils/classNames'

type Props = {
  className?: string
  value: number | string
  onChange: (value: string) => void
  id: string
  icon:
    | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode
      }>
  unit?: string
  type?: string
  placeholder?: string
  min?: number
}

const StatInput = ({
  className,
  value,
  onChange,
  id,
  icon: Icon,
  unit,
  type = 'text',
  ...props
}: Props) => {
  return (
    <div className={`relative rounded-md shadow-sm ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <input
        type={type}
        name={id}
        id={id}
        className={classNames(
          'focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9  sm:text-sm border-gray-300 rounded-md',
          unit ? `pr-12` : 'pr-3'
        )}
        value={value}
        onChange={event => onChange(event?.target.value)}
        {...props}
      />
      {unit && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <span className="focus:ring-indigo-500 focus:border-indigo-500 py-0 pl-2 pr-3 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
            {unit}
          </span>
          {/* <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                      <option>USD</option>
                      <option>CAD</option>
                      <option>EUR</option>
                    </select> */}
        </div>
      )}
    </div>
  )
}

export default StatInput
