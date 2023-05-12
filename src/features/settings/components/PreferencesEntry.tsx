/* eslint-disable i18next/no-literal-string */
type Props = {
  title?: string
  description?: string
  children?: React.ReactNode
  onClick?: () => void
}

const PreferencesEntry = ({
  title,
  description,
  children = [],
  onClick,
}: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="py-4 sm:py-5 flex items-center"
      role="button"
      tabIndex={-1}
      onClick={onClick}
    >
      <div className="flex-1">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>
        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{description}</span>
          <span className="ml-4 flex-shrink-0">
            {/* <button
            type="button"
            className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Update
          </button> */}
          </span>
        </dd>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default PreferencesEntry
