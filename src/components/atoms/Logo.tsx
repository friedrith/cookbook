import { CakeIcon } from '@heroicons/react/solid'

const Logo = () => {
  return (
    <div className="flex items-center">
      <CakeIcon
        className="h-8 w-8 stroke-1 text-gray-900 mr-1"
        aria-hidden="true"
      />
      <h2 className="text-2xl sm:text-2xl font-bold leading-7 text-gray-900  sm:truncate">
        CookBook
      </h2>
    </div>
  )
}

export default Logo
