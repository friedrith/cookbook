import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CenterPage from 'components/templates/CenterPage'

const NotFound404 = () => {
  const { t } = useTranslation()

  return (
    <CenterPage>
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('_Page not found.')}
        </h1>
        <p className="mt-2 text-base text-gray-500">
          {t('_Sorry, we couldn’t find the page you’re looking for.')}
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

export default NotFound404
