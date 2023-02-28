import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import CenterPage from '@/components/templates/CenterPage'

const Loading = () => {
  return (
    <CenterPage>
      <LoadingSpinner className="text-primary-400" />
    </CenterPage>
  )
}

export default Loading
