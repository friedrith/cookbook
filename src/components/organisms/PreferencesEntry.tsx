/* eslint-disable i18next/no-literal-string */
type Props = {
  title?: string
  description?: string
  children?: React.ReactNode
}

const PreferencesEntry = ({ title, description, children = [] }: Props) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
      <dt className="text-sm font-medium text-gray-500">Name</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <span className="flex-grow">Chelsea Hagon</span>
        <span className="ml-4 flex-shrink-0">
          <button
            type="button"
            className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Update
          </button>
        </span>
      </dd>
    </div>
  )
}

export default PreferencesEntry
