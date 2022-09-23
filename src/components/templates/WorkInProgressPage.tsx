import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CenterPage from 'components/templates/CenterPage'

type Props = {
  title: string
}

const WorkInProgress = ({ title }: Props) => {
  const { t } = useTranslation()

  return (
    <CenterPage title={title}>
      <div className="text-center">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('_Help')}
        </h1>
        <p className="mt-2 text-base text-gray-500">
          {t('_Sorry this page is a work in progress')}
        </p>
        <div className="mt-6">
          <Link
            to="/recipes"
            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
          >
            {t('_Go back home')}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </CenterPage>
  )
}

export default WorkInProgress
