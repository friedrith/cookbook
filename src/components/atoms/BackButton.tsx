import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/outline'

type Props = {
  to: string
}

const BackButton = ({ to }: Props) => {
  return (
    <Link
      className="text-base font-medium text-gray-900 hover:text-gray-900 flex items-center cursor-pointer fixed top-5 left-5 lg:top-10 lg:left-10"
      to={to}
    >
      <ArrowLeftIcon className="h-7 w-7" aria-hidden="true" />
    </Link>
  )
}

export default BackButton
