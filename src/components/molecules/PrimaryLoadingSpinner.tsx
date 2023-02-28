import LoadingSpinner from '@/components/atoms/LoadingSpinner'

interface Props {
  className?: string
}

const PrimaryLoadingSpinner: React.FC<Props> = ({ className }) => (
  <LoadingSpinner className={`text-primary-400$ ${className}`} />
)

export default PrimaryLoadingSpinner
