import { useTranslation } from 'react-i18next'

import LoginPage from 'components/templates/LoginPage'
import BackButton from 'components/atoms/BackButton'

const LinkWaiting = () => {
  const { t } = useTranslation()

  const email = window.localStorage.getItem('emailForSignIn')

  return (
    <LoginPage title={t('_Waiting for link')}>
      <BackButton to="/" />
      <div>
        {/* <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              /> */}
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('_An email on its way')}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          We sent an email to <strong>{email}</strong>. You will find a magic
          link that will log you in instantly.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          This link will expire 24 hours.
        </p>

        {/* <div className="mt-8">
          <p className="mt-2 text-sm text-gray-600">
            This link will expire 24 hours.
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <MailIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {t('_Send another link')}
          </button>
        </div> */}
      </div>
    </LoginPage>
  )
}

export default LinkWaiting
