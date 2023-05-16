import LoadingSpinner from '~/src/components/atoms/LoadingSpinner'

interface Props {
  className?: string
}

const PrimaryLoadingSpinner = ({ className = 'h-6 w-6' }: Props) => {
  return <LoadingSpinner className={`text-primary-400 ${className}`} />
}

export default PrimaryLoadingSpinner
