import { useTranslation, Trans } from 'react-i18next'

import BackButton from 'components/molecules/BackButton'
import LoginPage from 'components/templates/LoginPage'
import useIsStandalonePWA from 'hooks/useIsStandalonePWA'
import { isIpad } from 'utils/platforms/mobile'
import StandaloneLinkValidation from 'components/organisms/StandaloneLinkValidation'
import { useOnLoggedInAnotherTab } from 'features/recipes/utils/broadcast'

const LinkWaiting = () => {
  const { t } = useTranslation()

  const email = window.localStorage.getItem('emailForSignIn')

  const isStandalone = useIsStandalonePWA()

  useOnLoggedInAnotherTab(() => {
    window.location.reload()
  })

  return (
    <LoginPage title={t('_Waiting for link')}>
      <BackButton
        url="/"
        className="fixed top-5 left-5 lg:top-10 lg:left-10"
        title={t('_Back to landing page')}
      />

      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {t('login._An email on its way')}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {isStandalone && isIpad() ? (
            <>
              <Trans i18nKey="_We sent an email.pwa" values={{ email }} />
              <StandaloneLinkValidation />
            </>
          ) : (
            <Trans i18nKey="_We sent an email" values={{ email }} />
          )}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {t('_This link will expire 24 hours.')}
        </p>
      </div>
    </LoginPage>
  )
}

export default LinkWaiting
